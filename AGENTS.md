# AGENTS.md — Car Report

This file tells any AI coding agent (Codex, or anything else that reads AGENTS.md)
how to work in this repository. Read this before touching any code. If a
subfolder (`backend/`, `frontend-dealers/`) has its own `AGENTS.md`, that one
takes precedence for files inside it.

## What this project is

Car Report is a dealer-focused vehicle evaluation platform: evaluators capture
vehicle details, upload media, save drafts, submit completed evaluations, and
generate PDF vehicle reports.

- `frontend-dealers/` — Next.js 16, React 19, TypeScript, Tailwind CSS 4, wrapped
  in Capacitor 8 for Android/iOS.
- `backend/` — NestJS 11 API, Prisma ORM over PostgreSQL, Supabase for media
  storage, Puppeteer/Chromium for PDF generation.

The codebase currently has real technical debt (dead code, loose typing,
inconsistent auth, Docker-only local dev). Do not treat existing patterns as
"the right way" just because they're already there — flag debt instead of
copying it forward.

## Ground rules for the agent

1. **Never introduce `any`.** If a type is genuinely unknown, use `unknown`
   and narrow it, or ask the user rather than silently typing loosely.
2. **Don't leave dead code behind.** If you replace a function, component, or
   route, delete the old one in the same change — don't leave a
   commented-out or unused version "just in case."
3. **Small, reviewable diffs.** Prefer several focused changes over one huge
   rewrite. If a task looks like it needs 10+ files touched, stop and outline
   the plan first instead of just doing it.
4. **Ask before architecture changes.** Renaming modules, changing the auth
   flow, changing the Prisma schema, or restructuring folders needs a
   one-line confirmation from the user first.
5. **No secrets in code or commits.** Never hardcode API keys, JWT secrets,
   or Supabase service role keys. Use env vars per `backend/.env.example`.
6. **Explain non-obvious decisions in a short comment**, especially around
   auth, Puppeteer/Chromium setup, and Docker-vs-local env branching — these
   are the parts that keep breaking silently.

## Coding conventions (must follow exactly)

- **No `interface`.** Use `type` for all type definitions, with an `I` suffix
  on the name: `type PostI = { ... }`, `type VehicleI = { ... }`.
- **Component folder shape**, for any folder under `src/components/` or an
  `_components/` folder:
  - `index.tsx` — the core component (JSX only, no business logic)
  - `useHook.ts` — hooks, local state, handlers, derived logic
  - `types.ts` — all types for that component
- **Folder placement**:
  - Reusable, cross-route components → `src/components/`
  - Route-specific components → `app/[route_name]/_components/`, exported
    through that folder's `index.ts`
- **API calls** always go through `src/networks/` — never a raw `fetch`/axios
  call inside a component or hook. If the right network helper doesn't exist
  yet, add it there first.
- **File size**: aim for under 150 lines per file, hard ceiling of 250. If a
  file is approaching the ceiling, split it (usually into `useHook.ts` +
  smaller sub-components) rather than requesting an exception.
- **Backend**: keep NestJS controllers thin — request/response shape only.
  Business logic belongs in services under `libs/shared`. Update Prisma
  migrations and seeders together whenever the schema changes.

## Definition of done for any task

Before saying a task is complete, the agent must confirm:

- [ ] No `any` introduced (`grep -rn ": any" <changed files>` comes back empty)
- [ ] No leftover dead code, commented-out blocks, or unused imports/exports
- [ ] `npx tsc --noEmit` (frontend) or `pnpm build` (backend) passes on the
      touched project
- [ ] Relevant lint passes: `npm run lint` (frontend) / `pnpm lint` (backend)
- [ ] New/changed files respect the folder shape and line-length rules above
- [ ] Any new env var is added to `.env.example`, not just used silently

## Known trouble spots (don't "fix" these casually — read first)

- **Auth**: currently incomplete/inconsistent. Do not add new protected
  routes without checking whether a guard + role check already exists for
  that resource — if not, say so instead of assuming it's covered elsewhere.
- **Docker-only local dev**: `DATABASE_URL` and Puppeteer/Chromium behave
  differently in Docker vs. host. If a change works in Docker but not
  locally (or vice versa), that's a signal, not something to route around.
- **`next/font/google`**: frontend production builds need network access at
  build time. If a build fails only in a sandboxed/offline environment,
  that's expected — don't "fix" it by ripping out the font.

## Commands reference

```bash
# Frontend
cd frontend-dealers && npm run dev | npm run lint | npx tsc --noEmit | npm run build

# Backend
cd backend && pnpm start:dev | pnpm build | pnpm test | pnpm lint | pnpm migrate:pg | pnpm seed:dev

# Docker (dev stack)
docker compose -f docker-compose.dev.yml up --build
```