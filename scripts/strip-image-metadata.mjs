#!/usr/bin/env node
/**
 * Removes identifying metadata from the images in this repo.
 *
 * Phone and editor metadata is the accidental way a personal site leaks private
 * information: GPS coordinates from a camera roll, a device serial, an editing
 * timestamp with a timezone offset that narrows down where you live. None of it
 * is visible in the picture, so it survives every review that only looks at the
 * page.
 *
 * JPEG: drops APP1 (EXIF/XMP), APP12, APP13 (IPTC), APP14 and COM segments.
 * PNG:  drops eXIf, tEXt, zTXt, iTXt and tIME chunks.
 *
 * Kept on purpose: APP0/JFIF and APP2/ICC on JPEG, and the colour chunks on PNG.
 * Those describe how to *display* the pixels, not who took them — and dropping a
 * colour profile silently shifts the image.
 *
 * No dependencies, and no re-encode: segments are cut out of the byte stream, so
 * the image data is bit-for-bit identical and nothing is recompressed.
 *
 *   node scripts/strip-image-metadata.mjs --check     # report only, exit 1 if dirty
 *   node scripts/strip-image-metadata.mjs             # rewrite in place
 */

import fs from 'node:fs';
import path from 'node:path';

const ROOTS = ['public', 'portfolio/images'];
const CHECK_ONLY = process.argv.includes('--check');

const JPEG_DROP = new Set([0xe1, 0xec, 0xed, 0xee, 0xfe]);
const JPEG_LABELS = {
  0xe1: 'APP1 (EXIF/XMP)',
  0xec: 'APP12',
  0xed: 'APP13 (IPTC)',
  0xee: 'APP14',
  0xfe: 'COM',
};
const PNG_DROP = new Set(['eXIf', 'tEXt', 'zTXt', 'iTXt', 'tIME']);

/** Rebuilds a JPEG without the metadata segments. Image data is untouched. */
function stripJpeg(buf) {
  if (buf.readUInt16BE(0) !== 0xffd8) {
    return null;
  }

  const keep = [buf.subarray(0, 2)];
  const removed = [];
  let i = 2;

  while (i < buf.length - 1) {
    if (buf[i] !== 0xff) {
      break;
    }

    const marker = buf[i + 1];

    // Start of scan — everything from here on is compressed image data.
    if (marker === 0xda) {
      keep.push(buf.subarray(i));
      i = buf.length;
      break;
    }

    if (marker === 0xd9 || (marker >= 0xd0 && marker <= 0xd7) || marker === 0x01) {
      keep.push(buf.subarray(i, i + 2));
      i += 2;
      continue;
    }

    const length = buf.readUInt16BE(i + 2);
    const end = i + 2 + length;

    if (JPEG_DROP.has(marker)) {
      removed.push(`${JPEG_LABELS[marker] ?? `0x${marker.toString(16)}`} (${length} B)`);
    } else {
      keep.push(buf.subarray(i, end));
    }

    i = end;
  }

  if (i < buf.length) {
    keep.push(buf.subarray(i));
  }

  return { out: Buffer.concat(keep), removed };
}

/** Rebuilds a PNG without the ancillary metadata chunks. */
function stripPng(buf) {
  const signature = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);
  if (!buf.subarray(0, 8).equals(signature)) {
    return null;
  }

  const keep = [buf.subarray(0, 8)];
  const removed = [];
  let i = 8;

  while (i < buf.length) {
    const length = buf.readUInt32BE(i);
    const type = buf.toString('ascii', i + 4, i + 8);
    const end = i + 12 + length;

    if (PNG_DROP.has(type)) {
      removed.push(`${type} (${length} B)`);
    } else {
      keep.push(buf.subarray(i, end));
    }

    i = end;
    if (type === 'IEND') {
      break;
    }
  }

  return { out: Buffer.concat(keep), removed };
}

function* walk(dir) {
  if (!fs.existsSync(dir)) {
    return;
  }

  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      yield* walk(full);
    } else {
      yield full;
    }
  }
}

let dirty = 0;
let clean = 0;

for (const root of ROOTS) {
  for (const file of walk(root)) {
    const ext = path.extname(file).toLowerCase();
    const buf = fs.readFileSync(file);

    const result =
      ext === '.jpg' || ext === '.jpeg'
        ? stripJpeg(buf)
        : ext === '.png'
          ? stripPng(buf)
          : null;

    if (!result) {
      continue;
    }

    if (result.removed.length === 0) {
      clean += 1;
      continue;
    }

    dirty += 1;
    const saved = buf.length - result.out.length;
    console.log(`${CHECK_ONLY ? 'FOUND ' : 'STRIP '} ${file}`);
    console.log(`         ${result.removed.join(', ')}  −${saved} B`);

    if (!CHECK_ONLY) {
      fs.writeFileSync(file, result.out);
    }
  }
}

console.log(`\n${clean} already clean, ${dirty} with metadata.`);

if (CHECK_ONLY && dirty > 0) {
  console.error('Run `npm run media:strip` before committing.');
  process.exit(1);
}
