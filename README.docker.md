# Docker Setup Guide

## Development Mode (Hot Reload)

For development, use `docker-compose.dev.yml` which:
- Mounts your source code as volumes
- Runs `pnpm start:dev` which watches for file changes
- Automatically reloads when you make changes
- Uses NODE_ENV=development

### Start Development Environment

```bash
# Build and start in development mode
docker compose -f docker-compose.dev.yml up --build

# Or run in detached mode
docker compose -f docker-compose.dev.yml up --build -d

# View logs
docker compose -f docker-compose.dev.yml logs -f api
```

### Stop Development Environment

```bash
docker compose -f docker-compose.dev.yml down
```

### Making Changes

When you edit files in:
- `backend/apps/`
- `backend/libs/`
- `backend/prisma/`

The changes will automatically trigger a reload in the Docker container!

---

## Production Mode

For production, use the default `docker-compose.yml` which:
- Builds the application
- Runs optimized production code
- Does NOT watch for changes

### Start Production Environment

```bash
docker compose up --build
```

---

## Switching Between Modes

### From Production to Development:
```bash
# Stop production containers
docker compose down

# Start development containers
docker compose -f docker-compose.dev.yml up --build
```

### From Development to Production:
```bash
# Stop development containers
docker compose -f docker-compose.dev.yml down

# Start production containers
docker compose up --build
```

---

## Troubleshooting

### Changes not reflecting?

1. Make sure you're using the dev compose file:
   ```bash
   docker compose -f docker-compose.dev.yml up
   ```

2. Check the logs to see if NestJS is detecting changes:
   ```bash
   docker compose -f docker-compose.dev.yml logs -f api
   ```

3. If still not working, rebuild the container:
   ```bash
   docker compose -f docker-compose.dev.yml down
   docker compose -f docker-compose.dev.yml up --build
   ```

### Database Issues

To reset the database:
```bash
# Stop containers and remove volumes
docker compose -f docker-compose.dev.yml down -v

# Start fresh
docker compose -f docker-compose.dev.yml up --build
```

---

## Quick Reference

| Command | Description |
|---------|-------------|
| `docker compose -f docker-compose.dev.yml up` | Start dev mode |
| `docker compose -f docker-compose.dev.yml up -d` | Start dev mode in background |
| `docker compose -f docker-compose.dev.yml down` | Stop dev mode |
| `docker compose -f docker-compose.dev.yml logs -f api` | View API logs |
| `docker compose -f docker-compose.dev.yml exec api sh` | Access API container shell |
| `docker compose -f docker-compose.dev.yml exec postgres psql -U postgres -d carsreport` | Access database |
