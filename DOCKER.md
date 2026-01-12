# Docker Setup Guide

This project uses Docker to run PostgreSQL database and the NestJS API application.

## Prerequisites

- Docker Desktop installed and running
- Docker Compose installed (comes with Docker Desktop)

## Project Structure

```
car-report/
├── docker-compose.yml          # Production setup (PostgreSQL + API)
├── docker-compose.dev.yml      # Development setup (PostgreSQL only)
└── backend/
    ├── Dockerfile              # API application Docker image
    └── .dockerignore           # Files to exclude from Docker build
```

## Quick Start

### Option 1: Run Full Stack (PostgreSQL + API in Docker)

```bash
# Build and start all services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop all services
docker-compose down
```

The API will be available at: **http://localhost:3001**

### Option 2: Run PostgreSQL Only (Develop API Locally)

```bash
# Start only PostgreSQL
docker-compose -f docker-compose.dev.yml up -d

# Run migrations
cd backend
pnpm pmg

# Start the API locally
pnpm start:dev
```

The API will be available at: **http://localhost:3000**

## Services

### PostgreSQL Database
- **Container Name**: `car-report-postgres`
- **Port**: `5434` (mapped to container's 5432)
- **Database**: `carsreport`
- **Username**: `postgres`
- **Password**: `password`
- **Connection String**: `postgresql://postgres:password@localhost:5434/carsreport`

### API Application
- **Container Name**: `car-report-api`
- **Port**: `3001` (mapped to container's 3000)
- **Environment**: Production

## Useful Commands

### View Running Containers
```bash
docker ps
```

### View Logs
```bash
# All services
docker-compose logs -f

# Specific service
docker-compose logs -f api
docker-compose logs -f postgres
```

### Restart Services
```bash
# Restart all
docker-compose restart

# Restart specific service
docker-compose restart api
```

### Rebuild After Code Changes
```bash
# Rebuild and restart
docker-compose up -d --build

# Force rebuild without cache
docker-compose build --no-cache
docker-compose up -d
```

### Stop and Remove Everything
```bash
# Stop and remove containers
docker-compose down

# Stop and remove containers + volumes (deletes database data)
docker-compose down -v
```

### Access Database Directly
```bash
# Using docker exec
docker exec -it car-report-postgres psql -U postgres -d carsreport

# Or using psql from host (if installed)
psql -h localhost -p 5434 -U postgres -d carsreport
```

### Run Migrations in Docker
```bash
# Migrations are automatically run when the API container starts
# To run manually:
docker exec -it car-report-api sh -c "pnpm prisma migrate deploy"
```

## Environment Variables

The API container uses the following environment variables (configured in `docker-compose.yml`):

- `DATABASE_URL`: PostgreSQL connection string
- `NODE_ENV`: Application environment (production/development)
- `PORT`: Internal port the API listens on

## Troubleshooting

### Port Already in Use
If you get a "port already in use" error, either:
1. Stop the conflicting service
2. Change the port mapping in `docker-compose.yml`

### Database Connection Issues
1. Ensure PostgreSQL container is healthy: `docker ps`
2. Check logs: `docker-compose logs postgres`
3. Verify connection string in `.env` file

### API Not Starting
1. Check logs: `docker-compose logs api`
2. Ensure migrations ran successfully
3. Rebuild the image: `docker-compose build --no-cache api`

## Development Workflow

1. **Make code changes** in your local `backend/` directory
2. **Rebuild the Docker image**: `docker-compose build api`
3. **Restart the container**: `docker-compose up -d`

For faster development, use Option 2 (PostgreSQL in Docker, API locally) to enable hot-reload.

