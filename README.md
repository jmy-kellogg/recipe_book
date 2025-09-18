This is the Recipe Book app. Find all your favorite recipes.

# Getting Started

## Prerequisites

Make sure you have Docker and Docker Compose installed on your system.

## Backend (Hasura + PostgreSQL)

Navigate to the hasura directory and start the backend services:

```bash
cd hasura
docker-compose up
```

This will start:
- PostgreSQL database on port 5433
- Hasura GraphQL engine on port 9090

Access Hasura Console at [http://localhost:9090/console](http://localhost:9090/console)

### Seed the Database

To populate the database with initial data:

```bash
# From the project root directory
docker exec -i recipe_book_postgres_1 psql -U postgres -d recipe_book < hasura/seeds/seed_all.sql
```

## Frontend

Move into `/next_app` folder

```bash
cd next_app
```

Install packages

```bash
npm install
```

Start dev server

```bash
npm run dev
```

Open [http://localhost:9000](http://localhost:9000) with your browser to see the app.

## Django Development (Legacy)

If you need to work with the Django backend directly:

Create new models

```bash
python manage.py makemigrations
```

Migrate changes database

```bash
python manage.py migrate
```

Create super user for development:

```bash
python manage.py createsuperuser
```

Add initial data:

```bash
python populate_data.py init
```

To access the django shell

```bash
python manage.py dbshell
```
