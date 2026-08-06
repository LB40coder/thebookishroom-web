# Deploy — VPS (app único)

O projeto voltou a ser **um único app Next.js** (site público + Studio admin + API), ideal para rodar em um VPS com Node.js.

## Desenvolvimento local

```bash
npm install
cp .env.example .env   # configure DATABASE_URL, ADMIN_*, etc.
npm run db:push
npm run dev
```

Abre em `http://localhost:3000`. O Studio admin fica em `/{ADMIN_PATH}` (definido no `.env`).

## Build e produção

```bash
npm install
npm run build
npm run start
```

Recomendado: **PM2** ou **systemd** + **nginx** (ou Caddy) como reverse proxy na porta 80/443.

### Exemplo nginx

```nginx
server {
    listen 80;
    server_name www.thebookishroom.com thebookishroom.com;

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

## Variáveis de ambiente

| Variável | Descrição |
|----------|-----------|
| `DATABASE_URL` | URL **Direct** do Supabase (PostgreSQL) — ver abaixo |
| `SESSION_SECRET` | Sessão do Studio |
| `ADMIN_PASSWORD_HASH` | Senha do admin (bcrypt) |
| `ADMIN_API_KEY` | API Bearer para `/api/v1/*` |
| `ADMIN_PATH` | Caminho secreto do Studio (ex: `studio-x7k2`) |
| `NEXT_PUBLIC_SITE_URL` | `https://www.thebookishroom.com` |
| `BLOB_READ_WRITE_TOKEN` | Upload de mídia (Vercel Blob) — opcional no VPS |

Gere secrets com: `npm run generate-secrets`

## Estrutura

```
src/
  app/
    (site)/     → Páginas públicas (home, books, authors, …)
    studio/     → Admin Studio
    api/        → Rotas API (admin, v1, search)
  components/   → UI pública + admin
  lib/          → Prisma, auth, data layer, validações
prisma/         → Schema do banco
public/         → Assets estáticos
```

## DNS (VPS)

| Registro | Destino |
|----------|---------|
| `www` | IP do VPS (ou A record) |
| `@` | Redirect → `www` (no nginx/Caddy) |

Tudo roda no mesmo processo Node — **não precisa** de `API_URL` nem CORS.

## Supabase + Hostinger

O assistente da Hostinger pode pedir `@supabase/supabase-js` e um arquivo `db.js` — **ignore isso**. Este projeto usa **Prisma**, que conecta direto ao Postgres do Supabase via `DATABASE_URL`.

### 1. Copiar a connection string no Supabase

1. [Supabase Dashboard](https://supabase.com/dashboard) → seu projeto
2. **Connect** → card **Direct** → **Connection string** → **URI**
3. Copie a URL (substitua `[YOUR-PASSWORD]` pela senha do banco)

### 2. Variáveis no painel Hostinger

Em **Websites** → seu site → **Variáveis de ambiente** (ou na etapa do deploy Node.js), adicione:

| Variável | Valor |
|----------|--------|
| `DATABASE_URL` | URI Direct do Supabase |
| `SESSION_SECRET` | `npm run generate-secrets` |
| `ADMIN_PASSWORD_HASH` | idem |
| `ADMIN_API_KEY` | idem |
| `ADMIN_PATH` | ex: `studio-x7k2` |
| `NEXT_PUBLIC_SITE_URL` | `https://www.thebookishroom.com` |

### 3. Criar tabelas (primeira vez)

Se o Supabase estiver vazio, após o deploy (ou via SSH):

```bash
npm run db:push
```

Ou importe um dump do Neon com `pg_dump` / `psql`.

### 4. Não adicione ao projeto

- `@supabase/supabase-js` — não é usado
- `db.js` com `createClient` — não é usado

O Prisma já está em `src/lib/db.ts`.
