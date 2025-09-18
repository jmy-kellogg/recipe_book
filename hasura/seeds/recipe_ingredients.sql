-- Seed data for recipe_ingredients table
-- Reset the sequence first
SELECT setval('django_app_recipeingredient_id_seq', 1, false);

INSERT INTO recipe_ingredients (id, recipe_id, ingredient_id, amount, unit_id, optional) VALUES 
-- Chocolate Candy ingredients
(1, '6cab8a31-da85-4b71-a420-789c4ef80076', 'milk', 0.25000, 'cup', false),
(2, '6cab8a31-da85-4b71-a420-789c4ef80076', 'sugar', 1.00000, 'cup', false),
(3, '6cab8a31-da85-4b71-a420-789c4ef80076', 'margarine', 0.26000, 'cup', false),
(4, '6cab8a31-da85-4b71-a420-789c4ef80076', 'cocoa_powder', 2.00000, 'teaspoon', false),
(5, '6cab8a31-da85-4b71-a420-789c4ef80076', 'oatmeal', 1.12500, 'cup', false),
(6, '6cab8a31-da85-4b71-a420-789c4ef80076', 'vanilla_extract', 0.50000, 'teaspoon', false),
(7, '6cab8a31-da85-4b71-a420-789c4ef80076', 'coconut', 0.50000, 'cup', true),

-- Steam Custard Eggs ingredients
(8, 'ce184f52-140c-4890-a785-9432c8c36982', 'flour', 0.50000, 'cup', false),
(9, 'ce184f52-140c-4890-a785-9432c8c36982', 'water', 0.50000, 'cup', false),
(10, 'ce184f52-140c-4890-a785-9432c8c36982', 'egg', 2.00000, NULL, false),

-- Gingersnap Treasures ingredients
(11, '86faa18c-93f6-4a14-9c08-4c316eae3643', 'butter', 0.75000, 'cup', false),
(12, '86faa18c-93f6-4a14-9c08-4c316eae3643', 'sugar', 1.00000, 'cup', false),
(13, '86faa18c-93f6-4a14-9c08-4c316eae3643', 'molasses', 0.25000, 'cup', false),
(14, '86faa18c-93f6-4a14-9c08-4c316eae3643', 'egg', 1.00000, NULL, false),
(15, '86faa18c-93f6-4a14-9c08-4c316eae3643', 'flour', 2.00000, 'cup', false),
(16, '86faa18c-93f6-4a14-9c08-4c316eae3643', 'baking_soda', 2.00000, 'teaspoon', false),
(17, '86faa18c-93f6-4a14-9c08-4c316eae3643', 'ground_cinnamon', 1.00000, 'teaspoon', false),
(18, '86faa18c-93f6-4a14-9c08-4c316eae3643', 'ground_cloves', 0.50000, 'teaspoon', false),
(19, '86faa18c-93f6-4a14-9c08-4c316eae3643', 'ground_ginger', 1.00000, 'teaspoon', false),
(20, '86faa18c-93f6-4a14-9c08-4c316eae3643', 'salt', 0.25000, 'teaspoon', false),
-- Optional glaze ingredients
(21, '86faa18c-93f6-4a14-9c08-4c316eae3643', 'confectioners_sugar', 1.00000, 'cup', true),
(22, '86faa18c-93f6-4a14-9c08-4c316eae3643', 'milk', 1.50000, 'tablespoon', true),
(23, '86faa18c-93f6-4a14-9c08-4c316eae3643', 'vanilla_extract', 0.25000, 'teaspoon', true)
ON CONFLICT (id) DO NOTHING;