# Recipe Book Database Seeds

This directory contains seed files for the Recipe Book PostgreSQL database.

## Files

- **`seed_all.sql`** - Master script that runs all seeds in the correct order
- **`units.sql`** - Measurement units (teaspoon, cup, gram, etc.)
- **`ingredients.sql`** - Cooking ingredients (flour, sugar, butter, etc.)
- **`recipes.sql`** - Sample recipes (3 complete recipes)
- **`recipe_ingredients.sql`** - Recipe-ingredient relationships
- **`conversions.sql`** - Unit conversion factors (sample subset)

## Usage

### Run All Seeds
```bash
# From the project root directory
docker exec -i recipe_book_postgres_1 psql -U postgres -d recipe_book < seeds/seed_all.sql
```

### Run Individual Seeds
```bash
# Units only
docker exec -i recipe_book_postgres_1 psql -U postgres -d recipe_book < seeds/units.sql

# Ingredients only
docker exec -i recipe_book_postgres_1 psql -U postgres -d recipe_book < seeds/ingredients.sql
```

### Verify Data
```bash
# Check data counts
docker exec recipe_book_postgres_1 psql -U postgres -d recipe_book -c "
SELECT 
  (SELECT COUNT(*) FROM units) as units,
  (SELECT COUNT(*) FROM ingredients) as ingredients,
  (SELECT COUNT(*) FROM recipes) as recipes,
  (SELECT COUNT(*) FROM recipe_ingredients) as recipe_ingredients,
  (SELECT COUNT(*) FROM conversions) as conversions;
"
```

## Data Overview

- **16 units** - Imperial and metric measurements
- **27 ingredients** - Common cooking ingredients
- **3 recipes** - Complete recipes with instructions
- **23 recipe ingredients** - Recipe-ingredient relationships
- **392+ conversions** - Unit conversion factors (sample in conversions.sql)

## Notes

- All seeds use `ON CONFLICT DO NOTHING` to prevent duplicate insertions
- The master script clears existing data before seeding
- Conversions.sql contains a subset of conversions for brevity
- For the complete conversion dataset, export directly from the database