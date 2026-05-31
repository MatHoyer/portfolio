# syntax=docker/dockerfile:1

FROM node:22-alpine AS builder

WORKDIR /app

RUN corepack enable

COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

COPY . .

# Secrets via BuildKit mounts only — never ARG/ENV (avoids layer leaks)
RUN --mount=type=secret,id=github_token \
    --mount=type=secret,id=email \
    export GITHUB_TOKEN="$(cat /run/secrets/github_token)" && \
    export EMAIL="$(cat /run/secrets/email)" && \
    pnpm build

FROM nginx:alpine

COPY --from=builder /app/out /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
