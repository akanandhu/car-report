# Quick Commands for Docker Development

# Development commands (hot reload enabled)
dev-up:
	docker compose -f docker-compose.dev.yml up --build

dev-up-d:
	docker compose -f docker-compose.dev.yml up --build -d

dev-down:
	docker compose -f docker-compose.dev.yml down

dev-logs:
	docker compose -f docker-compose.dev.yml logs -f api

dev-shell:
	docker compose -f docker-compose.dev.yml exec api sh

dev-db:
	docker compose -f docker-compose.dev.yml exec postgres psql -U postgres -d carsreport

dev-restart:
	docker compose -f docker-compose.dev.yml restart api

# Production commands
prod-up:
	docker compose up --build

prod-down:
	docker compose down

prod-logs:
	docker compose logs -f api

# Clean up
clean:
	docker compose -f docker-compose.dev.yml down -v
	docker compose down -v

.PHONY: dev-up dev-up-d dev-down dev-logs dev-shell dev-db dev-restart prod-up prod-down prod-logs clean
