# Car Report

Car Report is a dealer-focused vehicle evaluation platform. It combines a Next.js dealer app, Capacitor mobile targets, and a NestJS API backed by PostgreSQL and Prisma. The core workflow lets evaluators capture vehicle details, save drafts, upload media, submit completed evaluations, and generate vehicle report PDFs.

## What This Repository Contains

```text
car-report/
|-- frontend-dealers/        # Next.js 16 dealer app and Capacitor iOS/Android projects
|-- backend/                 # NestJS API, Prisma schema, shared modules, seeders
|-- docker-compose.dev.yml   # Development API + PostgreSQL stack
|-- docker-compose.yml       # Production-style API + PostgreSQL stack
|-- Makefile                 # Shortcuts for Docker development
`-- README.docker.md         # Docker-specific command reference
```

## Stack

| Area | Technology |
| --- | --- |
| Dealer app | Next.js 16, React 19, TypeScript, Tailwind CSS 4 |
| Mobile shell | Capacitor 8 for Android and iOS |
| API | NestJS 11, TypeScript |
| Database | PostgreSQL in Docker, Prisma ORM |
| Media/reporting | Supabase storage integration, Chromium/Puppeteer-based PDF generation |
| Package managers | `npm` for `frontend-dealers`, `pnpm` for `backend` |

## Product Areas

- Authentication screens for dealer users.
- Dashboard, all-cars directory, drafts, and report viewing.
- Dynamic car-evaluation form driven by document groups and form fields.
- Draft save and final evaluation submission.
- Media upload/read/delete for evaluation evidence.
- Catalogue, RTO, role, user, branch, vehicle, report, and seeder API modules.
- Capacitor Android/iOS projects that consume the static Next.js export from `frontend-dealers/out`.

## Prerequisites

- Node.js 20 or newer.
- npm for the frontend.
- pnpm for the backend.
- Docker Desktop or compatible Docker Engine for PostgreSQL/API containers.
- Android Studio for Android builds.
- Xcode on macOS for iOS builds.

Install pnpm if needed:

```bash
npm install -g pnpm
```

## Environment

Backend variables are documented in [backend/.env.example](backend/.env.example):

```bash
DATABASE_URL=
PORT=3001
JWT_SECRET=
SUPABASE_URL=
SUPABASE_SERVICE_ROLE_KEY=
SUPABASE_STORAGE_BUCKET=
```

Frontend variables live in `frontend-dealers/.env.local`:

```bash
NEXT_PUBLIC_API_URL=http://localhost:3001
NEXT_PUBLIC_API_URL_ANDROID=http://10.0.2.2:3001
CAP_SERVER_URL_IOS=http://localhost:3000
CAP_SERVER_URL_ANDROID=http://10.0.2.2:3000
```

Do not commit real secrets. Keep local credentials in ignored env files.

## Local Development

### 1. Start the backend with Docker

The easiest backend path is the development compose stack. It starts PostgreSQL and the API with hot reload.

```bash
docker compose -f docker-compose.dev.yml up --build
```

Useful shortcuts:

```bash
make dev-up      # foreground dev stack
make dev-up-d    # detached dev stack
make dev-logs    # API logs
make dev-down    # stop dev stack
make dev-db      # open psql against the Docker database
```

The API is exposed at:

- API: `http://localhost:3001`
- Swagger: `http://localhost:3001/api/docs`
- PostgreSQL host port: `localhost:5434`

### 2. Run the dealer frontend

```bash
cd frontend-dealers
npm install
npm run dev
```

Open `http://localhost:3000`.

### 3. Optional backend local install

If you need to run backend scripts directly:

```bash
cd backend
pnpm install
pnpm generate:pg
pnpm migrate:pg
pnpm seed:dev
pnpm start:dev
```

## Mobile Development

The Capacitor projects are inside `frontend-dealers/android` and `frontend-dealers/ios`.

For live development against a running Next dev server:

```bash
cd frontend-dealers
npm run android:dev
npm run ios:dev
```

For static builds consumed by Capacitor:

```bash
cd frontend-dealers
npm run mobile:sync
npm run android
npm run ios
```

The Android emulator uses `10.0.2.2` to reach your host machine.

## Common Commands

### Frontend

```bash
cd frontend-dealers
npm run dev
npm run lint
npx tsc --noEmit
npm run build
npm run mobile:sync
```

### Backend

```bash
cd backend
pnpm start:dev
pnpm build
pnpm test
pnpm lint
pnpm migrate:pg
pnpm reset:pg
pnpm generate:pg
pnpm seed:dev
```

### Docker

```bash
docker compose -f docker-compose.dev.yml up --build
docker compose -f docker-compose.dev.yml logs -f api
docker compose -f docker-compose.dev.yml down
docker compose up --build
```

## Architecture Notes

The frontend is an App Router Next.js application with route groups for authentication and authenticated app pages. Shared UI components live under `frontend-dealers/src/components`, network clients under `frontend-dealers/src/networks`, and app flows under `frontend-dealers/src/app`.

The backend is a NestJS monorepo-style layout. API modules live under `backend/apps/api/src`, shared domain and persistence logic under `backend/libs/shared`, and database schema/migrations under `backend/prisma`.

Dynamic evaluation forms are configured through `DocumentGroup` and `FormField` records. Vehicle progress is persisted in `VehicleDocument` records, while the `Vehicle` status tracks draft versus completed evaluations.

## Database and Seed Data

Prisma uses `backend/prisma/schema.prisma` and migrations under `backend/prisma/migrations`.

Typical development flow:

```bash
cd backend
pnpm migrate:pg
pnpm seed:dev
```

If you need a clean Docker database:

```bash
docker compose -f docker-compose.dev.yml down -v
docker compose -f docker-compose.dev.yml up --build
```

## Quality Checks

Before handing off changes, run checks relevant to the touched area:

```bash
cd frontend-dealers
npm run lint
npx tsc --noEmit
```

```bash
cd backend
pnpm build
pnpm test
```

`npm run build` for the frontend may need network access because `next/font` fetches Google font CSS during production builds.

## Development Conventions

- Keep frontend changes consistent with the existing Tailwind design system.
- Prefer reusable network helpers in `frontend-dealers/src/networks` instead of ad hoc fetch calls.
- Keep backend controller logic thin; put business logic in shared services.
- Update Prisma migrations and seeders together when changing persisted configuration.
- Preserve Android/iOS behavior when touching frontend layout, fixed positioning, safe areas, or environment URLs.
- Do not commit generated build output, local databases, or real secrets.

## Troubleshooting

### API container starts but cannot connect to the database

Check the compose logs and confirm `DATABASE_URL` points at the Docker service host, not `localhost`, when running inside containers.

```bash
docker compose -f docker-compose.dev.yml logs -f api
docker compose -f docker-compose.dev.yml logs -f postgres
```

### Android cannot reach the API

Use `http://10.0.2.2:3001` from the Android emulator. The browser and iOS simulator can usually use `localhost`.

### Frontend production build fails while fetching fonts

The app uses `next/font/google`. Production builds need access to Google Fonts during compilation unless fonts are vendored locally.

### Drafts or form sections are missing

Run the backend seed command and confirm `DocumentGroup` and `FormField` records exist:

```bash
cd backend
pnpm seed:dev
```
