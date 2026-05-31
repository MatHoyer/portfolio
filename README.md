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

Secrets are loaded from **Proton Pass** ([`gizmodlabs/load-secrets-proton-pass`](https://github.com/marketplace/actions/load-secrets-from-proton-pass) pinned to [`e3cc6f29`](https://github.com/Gizmodlabs/load-secrets-proton-pass/commit/e3cc6f29771ca384c33380a0e62c5f7aca60cef1) / v1.0.0) vault **`Coding-prod`**. The only secret stored in GitHub is the Proton Pass CLI PAT.

1. Locally: `pass-cli pat create` (scoped to vault `Coding-prod`)
2. GitHub → Settings → Secrets → Actions → `PROTON_PASS_PERSONAL_ACCESS_TOKEN` = full `pst_xxxx::TOKENKEY` value

| Source | Name | Workflow env |
|--------|------|----------------|
| Proton `Github` / `GH_PUBLIC_REPO_PAT` | secret | `GH_PAT` (Docker build / GitHub API) |
| Proton `Portfolio` / `NEXT_PUBLIC_SITE_URL` | secret | Canonical URL for hreflang metadata |
| Proton `Portfolio` / `EMAIL` | secret | Contact email fallback at Docker build |
| Proton `Dokploy` / `DEPLOY_API_URL` | secret | Dokploy API URL |
| Proton `Dokploy` / `PORTFOLIO_APPLICATION_ID` | secret | Compose application ID |
| Proton `Dokploy` / `DEPLOY_TOKEN` | secret | API key (`x-api-key`) |

Proton field names are **case-sensitive** — must match the item in Pass exactly (`pass-cli item view pass://Coding-prod/Dokploy`).

`GITHUB_TOKEN` (auto) is still used for GHCR login and weekly tag pushes.

Create a GitHub **environment** named `dokploy` (Settings → Environments) if you use protection rules; deploy runs in that environment after each tag build.

For local/Docker builds, set `GITHUB_TOKEN` and `EMAIL` in `.env` (same PAT scopes as `GH_PAT` for the token).

### Weekly refresh

Every **Monday 06:00 UTC**, [`.github/workflows/release-tag.yml`](.github/workflows/release-tag.yml):

1. Bumps the patch semver tag on `main` (e.g. `v1.0.0` → `v1.0.1`) using Actions `GITHUB_TOKEN`
2. Creates a [GitHub Release](https://docs.github.com/en/repositories/releasing-projects-on-github) for that tag (auto-generated notes)
3. Calls [`.github/workflows/docker-publish.yml`](.github/workflows/docker-publish.yml) to build, push the image, and trigger Dokploy redeploy

Manual tag pushes (`git push origin v1.0.x`) run the same Docker + Dokploy pipeline. Pushes to `main` alone do **not** build or deploy.
