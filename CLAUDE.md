# Claude Project Guide

Use this file as the working context for Claude when modifying this repository.

## Project Summary

Car Report is a vehicle evaluation platform for dealers. It has:

- `frontend-dealers`: Next.js 16, React 19, Tailwind CSS 4, Capacitor Android/iOS.
- `backend`: NestJS 11 API, Prisma, PostgreSQL, shared domain modules, seeders.
- Docker compose stacks for PostgreSQL and the API.

The main product flow is dynamic vehicle evaluation: collect basic vehicle data, progress through configured form sections, save drafts, upload media, submit completed evaluations, and generate reports.

## Repository Boundaries

- Frontend app code: `frontend-dealers/src`.
- Frontend network clients: `frontend-dealers/src/networks`.
- Frontend shared components: `frontend-dealers/src/components`.
- Backend API modules: `backend/apps/api/src`.
- Backend shared services/repositories: `backend/libs/shared`.
- Database schema and migrations: `backend/prisma`.
- Seeder source: `backend/libs/shared/database/seeder`.

Do not edit Android/iOS native projects unless the requested change requires native behavior.

## Package Managers

Use the package manager already used by each workspace:

- Frontend: `npm`.
- Backend: `pnpm`.

Do not mix lockfiles.

## Commands

Frontend:

```bash
cd frontend-dealers
npm run lint
npx tsc --noEmit
npm run build
npm run dev
```

Backend:

```bash
cd backend
pnpm build
pnpm test
pnpm lint
pnpm migrate:pg
pnpm seed:dev
pnpm start:dev
```

Docker:

```bash
docker compose -f docker-compose.dev.yml up --build
docker compose -f docker-compose.dev.yml logs -f api
docker compose -f docker-compose.dev.yml down
```

## Implementation Rules

- Read the nearby code before editing; follow existing naming, file structure, and component patterns.
- Keep changes scoped to the user request.
- Do not rewrite unrelated components or formatting.
- Do not expose secrets from `.env` files.
- Preserve mobile behavior when changing layout, fixed elements, safe-area spacing, routing, or environment URLs.
- Run focused validation after edits and report any checks that cannot be run.

## Frontend Guidance

- Components are Tailwind-first. Prefer existing classes, spacing, and slate/primary design tokens.
- Use components in `frontend-dealers/src/components` before adding new UI primitives.
- Keep interactive UI accessible: buttons need `type`, disabled states, and clear text or icons.
- For app notifications, use `appToast` from `frontend-dealers/src/utils/toast`.
- For API calls, extend the appropriate client in `frontend-dealers/src/networks` instead of calling `fetch` inside pages.
- Remember this app is exported statically for Capacitor: avoid server-only features in routes intended for mobile.

## Backend Guidance

- Keep controllers thin. Put business rules in services.
- Reuse shared services and repositories under `backend/libs/shared`.
- Use DTO validation and the global `ValidationPipe` conventions.
- When changing persistent data, update Prisma schema, migrations, seeders, and affected DTOs together.
- Swagger docs are generated from decorators; keep new endpoints documented.
- PDF/report code depends on Chromium in Docker through `CHROMIUM_EXECUTABLE_PATH`.

## Data Model Notes

Important entities:

- `Vehicle`: top-level evaluated car record; status is usually draft or completed.
- `DocumentGroup`: evaluation section/group metadata.
- `FormField`: dynamic field definitions.
- `VehicleDocument`: saved section data and submission state.
- `User`, `Role`, `UserRole`, `Branch`: user and access-related records.
- `IndianState`, `Rto`: RTO catalogue data.

Dynamic forms are driven by document groups and form fields, not hardcoded page-only state.

## Mobile and Safe Areas

The frontend also runs inside Capacitor. Be careful with:

- Fixed or sticky headers.
- Toasts and overlays.
- `env(safe-area-inset-*)`.
- Android emulator host URLs (`10.0.2.2`).
- iOS Dynamic Island and home indicator overlap.

Web-only layout fixes can regress native shells.

## Verification Expectations

For frontend changes, prefer:

```bash
cd frontend-dealers
npm run lint
npx tsc --noEmit
```

For backend changes, prefer:

```bash
cd backend
pnpm build
pnpm test
```

If `frontend-dealers/npm run build` fails because Google Fonts cannot be fetched, state that clearly; it is a network/build-time font issue, not necessarily a TypeScript issue.

## Common Pitfalls

- `frontend-dealers` uses React 19 rules; avoid unnecessary `setState` inside effects.
- `backend` uses pnpm and Prisma 7; regenerate Prisma client after schema changes.
- Docker exposes the API at host port `3001`, while the container listens on `3000`.
- Android emulator cannot use host `localhost`; use `10.0.2.2`.
- Do not replace dynamic form persistence with local-only state.
