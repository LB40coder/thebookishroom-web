# Monorepo — Deploy Guide

Este projeto está dividido em três pacotes:

| Pacote | Deploy | Domínio sugerido |
|--------|--------|------------------|
| `apps/web` | **Cloudflare Workers** (via OpenNext) | `www.thebookishroom.com` |
| `apps/api` | **Vercel** | `api.thebookishroom.com` |
| `packages/shared` | (biblioteca interna) | — |

## Desenvolvimento local

```bash
npm install

# Terminal 1 — frontend (porta 3456)
npm run dev:web

# Terminal 2 — backend (porta 3457)
npm run dev:api
```

Copie `.env.example` para `.env` na raiz e configure as variáveis.

## Deploy — API (Vercel)

1. No [Vercel Dashboard](https://vercel.com), importe o repositório `LB40coder/thebookishroom-web`
2. **Root Directory:** `apps/api`
3. **Framework:** Next.js
4. **Build Command:** `cd ../.. && npm run build:api`
5. **Install Command:** `cd ../.. && npm install`
6. Variáveis de ambiente:
   - `DATABASE_URL`
   - `SESSION_SECRET`
   - `ADMIN_PASSWORD_HASH`
   - `ADMIN_API_KEY`
   - `ADMIN_PATH`
   - `BLOB_READ_WRITE_TOKEN`
   - `NEXT_PUBLIC_SITE_URL=https://www.thebookishroom.com`
7. Domínio customizado: `api.thebookishroom.com`

## Deploy — Web (Cloudflare Workers + OpenNext)

O frontend **não é um site estático** — o OpenNext gera um Worker em `.open-next/`. Sem o **deploy command**, o build pode passar mas o site retorna 404.

1. No [Cloudflare Dashboard](https://dash.cloudflare.com) → **Workers & Pages** → Create → **Workers** (não "Pages" estático)
2. Conecte o repositório GitHub `LB40coder/thebookishroom-web`
3. Em **Settings → Builds**, configure:

| Campo | Valor |
|-------|-------|
| **Root directory** | `apps/web` |
| **Build command** | `cd ../.. && npm install && npm run deploy:web` |
| **Deploy command** | *(deixe vazio — o deploy já está no build command acima)* |
| **Build output directory** | deixe **vazio** |

4. Variáveis de ambiente (Build + Deploy):
   - `NEXT_PUBLIC_SITE_URL=https://www.thebookishroom.com`
   - `API_URL=https://api.thebookishroom.com`
   - `NEXT_PUBLIC_API_URL=https://api.thebookishroom.com`
   - `NODE_VERSION=22`

> **Importante:** O build precisa acessar a API em produção para gerar páginas estáticas. Configure `API_URL` antes do primeiro deploy.

5. Domínio customizado: `www.thebookishroom.com` (em **Workers & Pages → seu projeto → Custom domains**)

O frontend usa [@opennextjs/cloudflare](https://opennext.js.org/cloudflare). Deploy local (opcional): `npm run deploy:web` na raiz do monorepo.

## DNS

| Registro | Destino |
|----------|---------|
| `www` | Cloudflare Workers (`thebookishroom-web`) |
| `api` | Vercel (`cname.vercel-dns.com`) |

## Estrutura

```
apps/
  web/     → Site público (sem Prisma, consome API)
  api/     → Studio admin + rotas /api/*
packages/
  shared/  → Prisma, validações, lógica de dados
```

## Rotas públicas da API

O frontend consome estas rotas (com CORS habilitado):

- `GET /api/public/books`
- `GET /api/public/books/[slug]`
- `GET /api/public/books/filter`
- `GET /api/public/posts`
- `GET /api/public/posts/[slug]`
- `GET /api/public/authors`
- `GET /api/public/authors/[slug]`
- `GET /api/public/moods`
- `GET /api/public/moods/[slug]`
- `GET /api/public/search?q=`
- `GET /api/public/slugs`
