-- Seed data for conversions table
-- Note: This file contains a large number of conversion factors
-- For brevity, showing key conversions. Full dataset has 392 records.

-- Truncate and reset sequence
TRUNCATE conversions RESTART IDENTITY;

-- Sample conversions (ingredient_id, from_unit_id, to_unit_id, factor)
INSERT INTO conversions (ingredient_id, from_unit_id, to_unit_id, factor) VALUES 
-- Water conversions
('water', 'cup', 'tablespoon', 16.00000),
('water', 'cup', 'fluid_ounce', 8.00000),
('water', 'cup', 'milliliter', 236.58800),

-- Flour conversions
('flour', 'cup', 'cup', 1.00000),
('flour', 'cup', 'tablespoon', 16.00000),
('flour', 'cup', 'teaspoon', 48.00000),
('flour', 'cup', 'ounce', 4.25000),
('flour', 'cup', 'gram', 120.00000),
('flour', 'tablespoon', 'cup', 0.06250),
('flour', 'tablespoon', 'teaspoon', 3.00000),
('flour', 'teaspoon', 'tablespoon', 0.33333),

-- Sugar conversions
('sugar', 'cup', 'tablespoon', 16.00000),
('sugar', 'cup', 'teaspoon', 48.00000),
('sugar', 'cup', 'gram', 200.00000),
('sugar', 'tablespoon', 'teaspoon', 3.00000),

-- Butter conversions
('butter', 'cup', 'tablespoon', 16.00000),
('butter', 'cup', 'stick_of_butter', 2.00000),
('butter', 'stick_of_butter', 'tablespoon', 8.00000),
('butter', 'tablespoon', 'teaspoon', 3.00000);

-- Note: This is a subset of the full conversion data
-- To get the complete dataset, run: docker exec recipe_book_postgres_1 pg_dump -U postgres -d recipe_book --data-only --inserts -t conversions