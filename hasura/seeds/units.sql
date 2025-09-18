-- Seed data for units table
INSERT INTO units (name, display_name, abbreviation, system) VALUES 
('teaspoon', 'Teaspoon', 'tsp', 'imperial'),
('tablespoon', 'Tablespoon', 'Tbsp', 'imperial'),
('cup', 'Cup', 'c', 'imperial'),
('fluid_ounce', 'Fluid Ounce', 'fl oz', 'imperial'),
('pint', 'Pint', 'pt', 'imperial'),
('quart', 'Quart', 'qt', 'imperial'),
('gallon', 'Gallon', 'gal', 'imperial'),
('milliliter', 'Milliliter', 'mL', 'metric'),
('liter', 'Liter', 'L', 'metric'),
('gram', 'Gram', 'g', 'metric'),
('kilogram', 'Kilogram', 'kg', 'metric'),
('ounce', 'Ounce', 'oz', 'imperial'),
('pound', 'Pound', 'lb', 'imperial'),
('stick_of_butter', 'Sticks', 'st', 'imperial'),
('pinch', 'Pinch', 'p', 'imperial'),
('dash', 'Dash', 'd', 'imperial')
ON CONFLICT (name) DO NOTHING;