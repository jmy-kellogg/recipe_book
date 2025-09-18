-- Master seed script for Recipe Book PostgreSQL database
-- Run this script to populate the database with initial data
-- 
-- Usage: docker exec -i recipe_book_postgres_1 psql -U postgres -d recipe_book < seeds/seed_all.sql

\echo 'Starting database seeding...'

-- Create tables if they don't exist (schema)
CREATE TABLE IF NOT EXISTS units (
    name VARCHAR(50) NOT NULL PRIMARY KEY,
    display_name VARCHAR(50),
    abbreviation VARCHAR(25) NOT NULL,
    system VARCHAR(25) NOT NULL
);

CREATE TABLE IF NOT EXISTS ingredients (
    name VARCHAR(50) NOT NULL PRIMARY KEY,
    display_name VARCHAR(50) NOT NULL
);

CREATE TABLE IF NOT EXISTS conversions (
    id SERIAL PRIMARY KEY,
    ingredient_id VARCHAR(50) NOT NULL REFERENCES ingredients(name),
    from_unit_id VARCHAR(50) NOT NULL REFERENCES units(name),
    to_unit_id VARCHAR(50) NOT NULL REFERENCES units(name),
    factor DECIMAL(10,5) NOT NULL
);

CREATE TABLE IF NOT EXISTS recipes (
    id UUID PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,
    title VARCHAR(100) NOT NULL,
    description TEXT,
    image VARCHAR(100),
    instructions TEXT,
    tips TEXT,
    servings INTEGER,
    prep_time INTERVAL,
    cook_time INTERVAL,
    total_time INTERVAL,
    created_at TIMESTAMP WITH TIME ZONE,
    updated_at TIMESTAMP WITH TIME ZONE
);

CREATE TABLE IF NOT EXISTS recipe_ingredients (
    id SERIAL PRIMARY KEY,
    recipe_id UUID NOT NULL REFERENCES recipes(id),
    ingredient_id VARCHAR(50) NOT NULL REFERENCES ingredients(name),
    amount DECIMAL(10,5) NOT NULL,
    unit_id VARCHAR(50) REFERENCES units(name),
    optional BOOLEAN NOT NULL DEFAULT FALSE
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_conversion_ingredient ON conversions(ingredient_id);
CREATE INDEX IF NOT EXISTS idx_conversion_from_unit ON conversions(from_unit_id);
CREATE INDEX IF NOT EXISTS idx_conversion_to_unit ON conversions(to_unit_id);
CREATE INDEX IF NOT EXISTS idx_recipeingredient_recipe ON recipe_ingredients(recipe_id);
CREATE INDEX IF NOT EXISTS idx_recipeingredient_ingredient ON recipe_ingredients(ingredient_id);

\echo 'Schema created successfully'

-- Clear existing data (in dependency order)
DELETE FROM recipe_ingredients;
DELETE FROM conversions;
DELETE FROM recipes;
DELETE FROM ingredients;
DELETE FROM units;

\echo 'Existing data cleared'

-- Seed data in dependency order

\echo 'Seeding units...'
\i seeds/units.sql

\echo 'Seeding ingredients...'
\i seeds/ingredients.sql

\echo 'Seeding recipes...'
\i seeds/recipes.sql

\echo 'Seeding recipe ingredients...'
\i seeds/recipe_ingredients.sql

\echo 'Seeding conversions...'
\i seeds/conversions.sql

-- Show summary
\echo 'Database seeding completed!'
\echo 'Summary:'
SELECT COUNT(*) as unit_count FROM units;
SELECT COUNT(*) as ingredient_count FROM ingredients;
SELECT COUNT(*) as recipe_count FROM recipes;
SELECT COUNT(*) as recipe_ingredient_count FROM recipe_ingredients;
SELECT COUNT(*) as conversion_count FROM conversions;

\echo 'All seed data loaded successfully!'