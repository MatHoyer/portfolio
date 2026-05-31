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

Images are published to `ghcr.io/<owner>/portfolio` on push to `main` and on `v*` tags. Set the package visibility to **public** in GitHub → Packages after the first publish.

### CI secrets

| Secret | Used for |
|--------|----------|
| `GITHUB_TOKEN` (auto) | Push weekly semver tags; log in to GHCR |
| `GH_PAT` | GitHub GraphQL fetch during `pnpm build` in Docker (`public_repo`, `read:user`, `user:email`) |

For local/Docker builds, set `GITHUB_TOKEN` in `.env` or `.env.local` (same PAT scopes as `GH_PAT`).

### Weekly refresh

Every **Monday 06:00 UTC**, [`.github/workflows/release-tag.yml`](.github/workflows/release-tag.yml):

1. Bumps the patch semver tag on `main` (e.g. `v1.0.0` → `v1.0.1`) using Actions `GITHUB_TOKEN`
2. Calls [`.github/workflows/docker-publish.yml`](.github/workflows/docker-publish.yml) to rebuild and push the image with fresh GitHub data

Manual tag pushes (`git push origin v1.0.x`) still trigger the Docker workflow via `on: push: tags`. Your host must pull the new image to deploy (Watchtower, `docker compose pull`, etc.).
