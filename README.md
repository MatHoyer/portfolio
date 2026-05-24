# Portfolio

Mathieu HOYER — backend developer portfolio with a Swagger-inspired UI.

## Stack

- Next.js 16 (static export)
- React 19 + TypeScript
- Tailwind CSS 4 + shadcn/ui
- pnpm
- Docker + GitHub Actions → GHCR

## Setup

```bash
pnpm install
cp .env.example .env.local
# Add your GitHub token to .env.local
pnpm dev
```

## Build

```bash
GITHUB_TOKEN=ghp_xxx pnpm build
```

Static output is written to `out/`.

## Docker

```bash
GITHUB_TOKEN=ghp_xxx docker compose up --build
```

Serves on http://localhost:8080

## Security

If a GitHub token was ever committed to this repository, **revoke it immediately** in GitHub → Settings → Developer settings → Personal access tokens, then create a new token and use it only via `GITHUB_TOKEN` environment variable.

## GHCR

Images are published to `ghcr.io/<owner>/portfolio` on push to `main`. Set the package visibility to **public** in GitHub → Packages after the first publish.

CI uses the auto-injected `GITHUB_TOKEN` from Actions for the build-time GitHub API fetch. For local/Docker builds, set `GITHUB_TOKEN` in `.env.local` (a PAT with `public_repo` is enough for public profile data).
