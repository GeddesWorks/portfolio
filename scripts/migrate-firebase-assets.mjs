import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';

function printHelp() {
  console.log(`
Usage:
  npm run assets:migrate -- --manifest ./scripts/firebase-assets.example.json --execute

Flags:
  --manifest <path>   JSON manifest to read
  --bucket <id>       Appwrite bucket id (default: APPWRITE_BUCKET_ID or portfolio-assets)
  --report <path>     JSON report path (default: ./scripts/firebase-assets.report.json)
  --execute           Upload files instead of doing a dry run
  --help              Show this message

Env:
  APPWRITE_ENDPOINT
  APPWRITE_PROJECT_ID
  APPWRITE_API_KEY
  APPWRITE_BUCKET_ID
`);
}

function parseArgs(argv) {
  const args = {};

  for (let index = 0; index < argv.length; index += 1) {
    const token = argv[index];
    if (token === '--execute') {
      args.execute = true;
      continue;
    }
    if (token === '--help') {
      args.help = true;
      continue;
    }
    if (token.startsWith('--')) {
      args[token.slice(2)] = argv[index + 1];
      index += 1;
    }
  }

  return args;
}

function buildEndpoint(base, bucketId) {
  const normalized = base.endsWith('/') ? base : `${base}/`;
  return new URL(`storage/buckets/${bucketId}/files`, normalized).toString();
}

function inferFileName(source, fallback) {
  if (fallback) {
    return fallback;
  }

  if (!source) {
    return `asset-${Date.now()}`;
  }

  try {
    const url = new URL(source);
    const lastSegment = decodeURIComponent(url.pathname.split('/').pop() ?? '');
    return lastSegment || `asset-${Date.now()}`;
  } catch {
    return path.basename(source);
  }
}

async function loadSourceAsset(asset, manifestDir) {
  if (asset.sourceUrl) {
    const response = await fetch(asset.sourceUrl);
    if (!response.ok) {
      throw new Error(`download failed: ${response.status} ${response.statusText}`);
    }

    const arrayBuffer = await response.arrayBuffer();
    const contentType = asset.contentType || response.headers.get('content-type') || 'application/octet-stream';
    const fileName = inferFileName(asset.sourceUrl, asset.fileName);

    return {
      bytes: Buffer.from(arrayBuffer),
      contentType,
      fileName,
      source: asset.sourceUrl,
    };
  }

  if (asset.sourcePath) {
    const resolvedPath = path.resolve(manifestDir, asset.sourcePath);
    const bytes = await readFile(resolvedPath);

    return {
      bytes,
      contentType: asset.contentType || 'application/octet-stream',
      fileName: inferFileName(resolvedPath, asset.fileName),
      source: resolvedPath,
    };
  }

  throw new Error('manifest entry needs sourceUrl or sourcePath');
}

async function uploadAsset({ asset, endpoint, projectId, apiKey, manifestDir, bucketId }) {
  const loaded = await loadSourceAsset(asset, manifestDir);
  const file = new File([loaded.bytes], loaded.fileName, { type: loaded.contentType });
  const form = new FormData();

  form.set('fileId', asset.fileId || 'unique()');
  form.set('file', file, loaded.fileName);

  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'X-Appwrite-Project': projectId,
      'X-Appwrite-Key': apiKey,
    },
    body: form,
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`upload failed: ${response.status} ${response.statusText} ${errorText}`);
  }

  const payload = await response.json();
  return {
    label: asset.label || loaded.fileName,
    source: loaded.source,
    bucketId,
    fileId: payload.$id,
    fileName: payload.name,
    mimeType: payload.mimeType,
  };
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  if (args.help) {
    printHelp();
    return;
  }

  const manifestPath = path.resolve(process.cwd(), args.manifest || './scripts/firebase-assets.example.json');
  const reportPath = path.resolve(process.cwd(), args.report || './scripts/firebase-assets.report.json');
  const bucketId = args.bucket || process.env.APPWRITE_BUCKET_ID || 'portfolio-assets';
  const execute = Boolean(args.execute);
  const manifestDir = path.dirname(manifestPath);
  const manifestText = await readFile(manifestPath, 'utf8');
  const assets = JSON.parse(manifestText);

  if (!Array.isArray(assets)) {
    throw new Error('manifest must be a JSON array');
  }

  if (!execute) {
    console.log(`Dry run for ${assets.length} assets -> bucket ${bucketId}`);
    for (const asset of assets) {
      console.log(`- ${asset.label || asset.fileName || asset.sourceUrl || asset.sourcePath}`);
    }
    console.log('Re-run with --execute to upload.');
    return;
  }

  const endpoint = process.env.APPWRITE_ENDPOINT;
  const projectId = process.env.APPWRITE_PROJECT_ID;
  const apiKey = process.env.APPWRITE_API_KEY;

  if (!endpoint || !projectId || !apiKey) {
    throw new Error('APPWRITE_ENDPOINT, APPWRITE_PROJECT_ID, and APPWRITE_API_KEY are required for uploads');
  }

  const uploadEndpoint = buildEndpoint(endpoint, bucketId);
  const results = [];

  for (const asset of assets) {
    const result = await uploadAsset({
      asset,
      endpoint: uploadEndpoint,
      projectId,
      apiKey,
      manifestDir,
      bucketId,
    });
    results.push(result);
    console.log(`Uploaded ${result.label} -> ${result.fileId}`);
  }

  await mkdir(path.dirname(reportPath), { recursive: true });
  await writeFile(reportPath, `${JSON.stringify(results, null, 2)}\n`, 'utf8');
  console.log(`Wrote report to ${reportPath}`);
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : String(error));
  process.exitCode = 1;
});
