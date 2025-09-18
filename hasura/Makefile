# Recipe Book Hasura Makefile
# Common commands for managing the Hasura backend

.PHONY: help up down restart status logs clean seed reset console

# Default target
help: ## Show this help message
	@echo "Recipe Book Hasura Commands:"
	@echo ""
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## "}; {printf "  \033[36m%-15s\033[0m %s\n", $$1, $$2}'

# Service Management
up: ## Start all services (PostgreSQL, Hasura, Data Connector)
	docker-compose up -d
	@echo "Services started. Hasura Console: http://localhost:9090/console"

down: ## Stop all services
	docker-compose down

restart: ## Restart all services
	docker-compose restart

stop: ## Stop all services (alias for down)
	$(MAKE) down

# Individual Services
up-db: ## Start only PostgreSQL database
	docker-compose up -d postgres

up-hasura: ## Start only Hasura GraphQL engine
	docker-compose up -d graphql-engine

restart-hasura: ## Restart only Hasura GraphQL engine
	docker-compose restart graphql-engine

restart-db: ## Restart only PostgreSQL database
	docker-compose restart postgres

# Status and Monitoring
status: ## Show status of all containers
	docker-compose ps

logs: ## Show logs from all services
	docker-compose logs -f

logs-hasura: ## Show logs from Hasura GraphQL engine only
	docker-compose logs -f graphql-engine

logs-db: ## Show logs from PostgreSQL only
	docker-compose logs -f postgres

health: ## Check health of services
	@echo "Checking service health..."
	@curl -s http://localhost:9090/v1/version && echo " - Hasura: ✅ Running" || echo " - Hasura: ❌ Not responding"
	@docker exec hasura_postgres_1 pg_isready -U postgres && echo " - PostgreSQL: ✅ Running" || echo " - PostgreSQL: ❌ Not responding"

# Database Management
create-db: ## Create the recipe_book database
	docker exec hasura_postgres_1 createdb -U postgres recipe_book 2>/dev/null || echo "Database recipe_book already exists"

drop-db: ## Drop the recipe_book database (DESTRUCTIVE)
	@echo "⚠️  WARNING: This will delete ALL data in the recipe_book database!"
	@read -p "Are you sure? (y/N): " confirm && [ "$$confirm" = "y" ] || exit 1
	docker exec hasura_postgres_1 dropdb -U postgres recipe_book

psql: ## Connect to PostgreSQL with psql
	docker exec -it hasura_postgres_1 psql -U postgres -d recipe_book

# Data Seeding
seed: ## Populate database with seed data
	@echo "Seeding database with initial data..."
	docker exec -i hasura_postgres_1 psql -U postgres -d recipe_book < ../seeds/units.sql
	docker exec -i hasura_postgres_1 psql -U postgres -d recipe_book < ../seeds/ingredients.sql
	docker exec -i hasura_postgres_1 psql -U postgres -d recipe_book < ../seeds/recipes.sql
	docker exec -i hasura_postgres_1 psql -U postgres -d recipe_book < ../seeds/recipe_ingredients.sql
	docker exec -i hasura_postgres_1 psql -U postgres -d recipe_book < ../seeds/conversions.sql
	@echo "✅ Database seeded successfully!"

seed-units: ## Seed only units data
	docker exec -i hasura_postgres_1 psql -U postgres -d recipe_book < ../seeds/units.sql

seed-ingredients: ## Seed only ingredients data
	docker exec -i hasura_postgres_1 psql -U postgres -d recipe_book < ../seeds/ingredients.sql

seed-recipes: ## Seed only recipes data
	docker exec -i hasura_postgres_1 psql -U postgres -d recipe_book < ../seeds/recipes.sql

seed-conversions: ## Seed only conversions data
	docker exec -i hasura_postgres_1 psql -U postgres -d recipe_book < ../seeds/conversions.sql

# Data Management
backup: ## Create a database backup
	@mkdir -p backups
	docker exec hasura_postgres_1 pg_dump -U postgres -d recipe_book > backups/recipe_book_$(shell date +%Y%m%d_%H%M%S).sql
	@echo "✅ Backup created in backups/ directory"

data-counts: ## Show count of records in each table
	@echo "Data summary:"
	docker exec hasura_postgres_1 psql -U postgres -d recipe_book -c "SELECT 'units' as table_name, COUNT(*) as count FROM units UNION ALL SELECT 'ingredients', COUNT(*) FROM ingredients UNION ALL SELECT 'recipes', COUNT(*) FROM recipes UNION ALL SELECT 'recipe_ingredients', COUNT(*) FROM recipe_ingredients UNION ALL SELECT 'conversions', COUNT(*) FROM conversions ORDER BY table_name;"

# Reset and Clean
reset: ## Reset everything (stop, clean, start fresh)
	$(MAKE) down
	docker-compose down -v
	$(MAKE) up
	$(MAKE) create-db
	$(MAKE) seed

clean: ## Remove all containers, volumes, and networks
	docker-compose down -v --remove-orphans
	docker system prune -f

# Development
console: ## Open Hasura Console (browser)
	@echo "Opening Hasura Console..."
	@command -v open >/dev/null 2>&1 && open http://localhost:9090/console || echo "Please open http://localhost:9090/console in your browser"

dev: ## Start development environment
	$(MAKE) up
	@sleep 5
	$(MAKE) health
	@echo ""
	@echo "🚀 Development environment ready!"
	@echo "   Hasura Console: http://localhost:9090/console"
	@echo "   GraphQL API: http://localhost:9090/v1/graphql"
	@echo "   PostgreSQL: localhost:5433"

# Quick Setup
setup: ## Complete setup (up + create-db + seed)
	$(MAKE) up
	@sleep 10
	$(MAKE) create-db
	$(MAKE) seed
	$(MAKE) health