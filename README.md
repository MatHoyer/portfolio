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

Images are published to `ghcr.io/<owner>/portfolio` on `v*` tags only (not on push to `main`). Set the package visibility to **public** in GitHub → Packages after the first publish.

### CI configuration

| Name | Kind | Used for |
|------|------|----------|
| `GITHUB_TOKEN` | auto | Push weekly semver tags; log in to GHCR |
| `GH_PAT` | secret | GitHub GraphQL fetch during `pnpm build` (`public_repo`, `read:user`, `user:email`) |
| `EMAIL` | variable | Fallback contact email when GitHub profile email is unavailable |
| `DEPLOY_API_URL` | secret | Dokploy deploy API endpoint |
| `DEPLOY_APPLICATION_ID` | secret | Dokploy compose application ID |
| `DEPLOY_TOKEN` | secret | Dokploy API key (`x-api-key`) |

Create a GitHub **environment** named `dokploy` (Settings → Environments) if you use protection rules; deploy runs in that environment after each tag build.

For local/Docker builds, set `GITHUB_TOKEN` and `EMAIL` in `.env` (same PAT scopes as `GH_PAT` for the token).

### Weekly refresh

Every **Monday 06:00 UTC**, [`.github/workflows/release-tag.yml`](.github/workflows/release-tag.yml):

1. Bumps the patch semver tag on `main` (e.g. `v1.0.0` → `v1.0.1`) using Actions `GITHUB_TOKEN`
2. Creates a [GitHub Release](https://docs.github.com/en/repositories/releasing-projects-on-github) for that tag (auto-generated notes)
3. Calls [`.github/workflows/docker-publish.yml`](.github/workflows/docker-publish.yml) to build, push the image, and trigger Dokploy redeploy

Manual tag pushes (`git push origin v1.0.x`) run the same Docker + Dokploy pipeline. Pushes to `main` alone do **not** build or deploy.
