# Monorepo — Deploy Guide

Este projeto está dividido em três pacotes:

| Pacote | Deploy | Domínio sugerido |
|--------|--------|------------------|
| `apps/web` | **Cloudflare Pages** | `www.thebookishroom.com` |
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

## Deploy — Web (Cloudflare Pages)

1. No [Cloudflare Dashboard](https://dash.cloudflare.com) → Workers & Pages → Create
2. Conecte o mesmo repositório GitHub
3. **Root directory:** `apps/web`
4. **Build command:** `cd ../.. && npm run build:web`
5. **Build output directory:** `.next` (ou configure OpenNext para Cloudflare)
6. Variáveis de ambiente:
   - `NEXT_PUBLIC_SITE_URL=https://www.thebookishroom.com`
   - `API_URL=https://api.thebookishroom.com`
   - `NEXT_PUBLIC_API_URL=https://api.thebookishroom.com`

> **Importante:** O build do frontend precisa conseguir acessar a API (para gerar páginas estáticas). Configure `API_URL` apontando para a API em produção antes do primeiro deploy.

7. Domínio customizado: `www.thebookishroom.com`

> **Nota:** Para Next.js completo no Cloudflare (SSR/ISR), use [@opennextjs/cloudflare](https://opennext.js.org/cloudflare). O build padrão `next build` funciona no Vercel; no Cloudflare pode precisar de configuração adicional.

## DNS

| Registro | Destino |
|----------|---------|
| `www` | Cloudflare Pages |
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
