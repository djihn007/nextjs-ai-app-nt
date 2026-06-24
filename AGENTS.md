<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

## Stack

- **Next.js 16.2** + **React 19.2** (App Router only — no Pages Router files)
- **Tailwind CSS v4** — `@import "tailwindcss"` in CSS, PostCSS plugin is `@tailwindcss/postcss`. No `tailwind.config.ts`.
- **shadcn/ui v4** — `radix-luma` style, `remixicon` icon library, `baseColor: mist`. Config: `components.json`.
- **Prisma v7** — driver-adapter pattern with MariaDB adapter. Client output: `../generated/prisma/client` (custom, gitignored).
- **better-auth v1.6** — email/password auth. API route at `src/app/api/auth/[...all]/route.ts`.
- **Zustand v5** — client-side cart store persisted to `localStorage`.

## Commands

```bash
npm run dev      # Start dev server (http://localhost:3000)
npm run build    # Production build (run `npx prisma generate` first)
npm run lint     # ESLint (flat config: eslint.config.mjs)
```

There is no `typecheck` script. Add `tsc --noEmit` to verify types manually.

## Prisma v7 (critical)

Prisma v7 uses the **driver adapter** — no `datasource.db.url` in app code:

```ts
// src/lib/prisma.ts — the actual pattern:
const adapter = new PrismaMariaDb(process.env.DATABASE_URL!)
new PrismaClient({ adapter })
```

- `npx prisma generate` outputs to `generated/prisma/client/` (from schema `output = "../generated/prisma"`)
- The generated client is **gitignored** — must run `npx prisma generate` after `npm install` and before `npm run build`
- Docker build does `npx prisma generate` as a build step (Dockerfile line 25)

## better-auth patterns

```ts
// Server-side session check (src/components/navbar.tsx:14-15):
const session = await auth.api.getSession({ headers: await headers() })

// Client-side auth client:
import { createAuthClient } from 'better-auth/react'
export const authClient = createAuthClient({})
```

API route uses `toNextJsHandler` from `better-auth/next-js` — exports `POST` and `GET`.

## Route structure

- `src/app/(front)/` — public pages (home, product, course, cart, about)
- `src/app/(auth)/` — login, signup (separate layout with Prompt/Thai font)
- `src/app/api/auth/[...all]/route.ts` — better-auth handler
- `@/` alias → `./src/*` (tsconfig paths)
- Font loaded in `(auth)/layout.tsx` only; `(front)/layout.tsx` depends on `globals.css` font variables

## Tailwind CSS v4 notes

- CSS-first config: `@theme inline { … }` in `globals.css`, not `tailwind.config.ts`
- Dark mode variant: `@custom-variant dark (&:is(.dark *))`
- PostCSS uses `@tailwindcss/postcss` (not the old `tailwindcss` plugin)
- Include `src/app/globals.css` which pulls in `tailwindcss`, `tw-animate-css`, and `shadcn/tailwind.css`

## Database

MariaDB 11.8. Docker setup command in `docs/install_mariadb_with_docker.txt`. Connection string uses `mysql://` protocol with the MariaDB adapter. `.env` is gitignored but expected locally with `DATABASE_URL`, `BETTER_AUTH_SECRET`, and `BETTER_AUTH_URL`.

## Docker

Multi-stage build. Runner stage copies `generated/` (Prisma client) and `prisma/` (schema) — both needed at runtime. Entry: `node server.js` on port 3000.
