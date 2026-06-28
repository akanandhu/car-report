# Cursor Project Instructions

Use this file as Cursor workspace guidance for code generation, autocomplete, and agent edits.

## High-Level Context

This repository is a full-stack car evaluation system:

- Dealer frontend: `frontend-dealers` using Next.js 16, React 19, TypeScript, Tailwind CSS 4, and Capacitor.
- API backend: `backend` using NestJS 11, Prisma, PostgreSQL, and shared service/repository modules.
- Docker is available for PostgreSQL and the API.

The application supports draft vehicle evaluations, dynamic form sections, media uploads, completed submissions, and report generation.

## Workspace Rules

- Use `npm` only inside `frontend-dealers`.
- Use `pnpm` only inside `backend`.
- Keep generated changes small and aligned with existing patterns.
- Do not create duplicate abstractions if a nearby helper already exists.
- Do not commit secrets, local database files, build output, or generated mobile build artifacts.
- Prefer TypeScript-safe code over broad `any` usage.
- Prefer explicit error handling for user-facing workflows.

## Frontend Rules

Primary folders:

- Pages and routes: `frontend-dealers/src/app`.
- UI components: `frontend-dealers/src/components`.
- API clients: `frontend-dealers/src/networks`.
- Utilities: `frontend-dealers/src/utils`.

Conventions:

- Use Tailwind classes directly, matching the existing slate/primary visual system.
- Use existing shared components before adding new ones.
- Put reusable user notifications through `frontend-dealers/src/utils/toast.tsx`.
- Extend network client files rather than embedding API calls in components.
- Keep mobile safe areas in mind for fixed, sticky, toast, modal, drawer, and bottom-navigation UI.
- Capacitor builds use static export, so avoid server-only app-router patterns for mobile-facing screens.

Recommended frontend checks:

```bash
cd frontend-dealers
npm run lint
npx tsc --noEmit
```

## Backend Rules

Primary folders:

- API modules/controllers: `backend/apps/api/src`.
- Shared services: `backend/libs/shared/src/modules`.
- Prisma service: `backend/libs/shared/database/prisma`.
- Seeders: `backend/libs/shared/database/seeder`.
- Schema and migrations: `backend/prisma`.

Conventions:

- Controllers should validate and delegate.
- Services should hold business logic.
- Repositories should hold persistence details.
- DTOs should be updated with endpoint contract changes.
- Prisma schema changes require migrations and Prisma client generation.
- Seeders should stay in sync with dynamic form/catalogue assumptions.

Recommended backend checks:

```bash
cd backend
pnpm build
pnpm test
```

## Important Commands

Start development Docker stack:

```bash
docker compose -f docker-compose.dev.yml up --build
```

Stop development Docker stack:

```bash
docker compose -f docker-compose.dev.yml down
```

View API logs:

```bash
docker compose -f docker-compose.dev.yml logs -f api
```

Seed backend development data:

```bash
cd backend
pnpm seed:dev
```

Run frontend:

```bash
cd frontend-dealers
npm run dev
```

## Ports and URLs

- Frontend dev server: `http://localhost:3000`.
- API from host: `http://localhost:3001`.
- Swagger: `http://localhost:3001/api/docs`.
- PostgreSQL host port: `5434`.
- Android emulator API URL: `http://10.0.2.2:3001`.

## Dynamic Evaluation Flow

The evaluation UI is configuration-driven:

1. `DocumentGroup` defines sections.
2. `FormField` defines fields and conditions.
3. `Vehicle` represents the evaluated car.
4. `VehicleDocument` stores section-level evaluation data.
5. Completed submissions update vehicle/document status and can generate reports.

Do not hardcode field assumptions unless the surrounding code already does so for a specific UI-only behavior.

## Review Checklist Before Finishing

- Is the change scoped to the requested behavior?
- Did it preserve web, Android, and iOS behavior?
- Are loading, disabled, success, and error states handled?
- Are DTOs/network types updated if API contracts changed?
- Are migrations/seeders updated if persisted shape changed?
- Did lint/typecheck/build/test run, or is any skipped check clearly explained?
