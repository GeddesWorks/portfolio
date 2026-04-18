# Appwrite MCP Setup

This portfolio only needs Appwrite's database tools plus Storage for images and video. Keep the MCP surface small so Codex does not burn context on APIs the site will not use.

## Required inputs

- Appwrite project ID
- Appwrite endpoint in the form `https://<REGION>.cloud.appwrite.io/v1`
- Appwrite API key with database and storage scopes

## Local prerequisites

- `uv` must be installed so Codex can launch `uvx mcp-server-appwrite`
- `node` and `npx` are only needed if you also want the optional Appwrite docs server

## Codex config

Add this to `~/.codex/config.toml`:

```toml
[features]
rmcp_client = true

[mcp_servers.appwrite]
command = "uvx"
args = ["mcp-server-appwrite", "--storage"]
env = { APPWRITE_PROJECT_ID = "your-project-id", APPWRITE_API_KEY = "your-api-key", APPWRITE_ENDPOINT = "https://<REGION>.cloud.appwrite.io/v1" }
startup_timeout_sec = 20
tool_timeout_sec = 120

[mcp_servers.appwrite_docs]
command = "npx"
args = ["mcp-remote", "https://mcp-for-docs.appwrite.io"]
startup_timeout_sec = 20
tool_timeout_sec = 120
```

The `config.toml` shape above is based on Codex's current local MCP config format. The Appwrite command and environment variables come from Appwrite's official MCP docs.

## Why `--storage`

Appwrite enables database tools by default. This portfolio also needs image and video migration from Firebase, so Storage should be enabled from the start.

Skip `--all` unless it becomes necessary. More enabled tools means more prompt overhead.

## Verification

1. Restart Codex after updating `config.toml`.
2. Confirm `uvx mcp-server-appwrite --storage --help` runs locally.
3. Ask Codex to list Appwrite tools.
4. Create one test collection and one test storage bucket before moving Firebase assets.
