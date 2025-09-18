-- Seed data for recipes table
INSERT INTO recipes (id, name, title, description, image, instructions, tips, servings, prep_time, cook_time, total_time, created_at, updated_at) VALUES 
('6cab8a31-da85-4b71-a420-789c4ef80076', 'chocolate_candy', 'Chocolate Candy', 'It was brought over from Poland, and as far as we know, never had a name. We just called it Chocolate Candy, or some people would know it as "no bake cookies".', '', 'In a medium saucepan, combine the milk, sugar, margarine, and cocoa.
Bring the mixture to a boil over medium heat, stirring constantly
Once it reaches a boil, allow it to boil for 1 minute without stirring.
Remove the saucepan from the heat.
Stir in the oatmeal, vanilla, and optional coconut until well combined.
Drop spoonfuls of the mixture onto the prepared wax paper.
Allow the candies to cool and set completely.', 'Ensure you do not boil the mixture for more than 1 minute to avoid making the candy too hard.
Work quickly when dropping the candy mixture onto the wax paper as it sets fast.', NULL, NULL, NULL, NULL, '2024-12-19 00:54:56.917952+00', '2025-01-03 01:06:51.306888+00'),

('86faa18c-93f6-4a14-9c08-4c316eae3643', 'gingersnap_treasures', 'Gingersnap Treasures', 'This sweet spiced cookie is perfect for the holidays.', '', '<p><strong>Cookies: </strong></p>

<p>&nbsp;- Cream butter, sugar, molasses and egg until fluffy</p>

<p>&nbsp;- Sift four, baking soda, cinnamon, cloves, ginger and salt.</p>

<p>&nbsp;- Stir into the first mixture until well blended.</p>

<p>&nbsp;- Shape dough into 1-inch balls and place on ungreased cookie sheet</p>

<p>&nbsp;- Bake at 375&deg;F for 10 to 12 minutes</p>

<p>&nbsp;- Let cookies cool completely before apply glaze (see below)</p>

<p><strong>Glaze:</strong></p>

<p>&nbsp; - Shift confectioners&#39; sugar</p>

<p>&nbsp; - Add milk and vanilla</p>

<p>&nbsp; - Mix together until well blended</p>', '', 50, NULL, NULL, NULL, '2025-01-03 21:06:49.015736+00', '2025-01-04 01:30:40.528177+00'),

('ce184f52-140c-4890-a785-9432c8c36982', 'steam_custard_eggs', 'Steam Custard Eggs', 'Chinese Steamed Egg Custard" or "Dan Ta", are a traditional Chinese dessert made by steaming eggs with water and seasonings. The result is a delicate, silky, and creamy custard-like texture, often flavored with soy sauce, sesame oil, and sugar.', '/static/steamed_eggs.jpg', '- Beat together 1:1 water and eggs
- Pass through a sieve and pour into a small heat safe bowl
- Steam for 10-12 mins, then remove from heat.', 'If you wish for smaller curds and a smoother texture add more water, up to 1:2 water and egg ratio.', NULL, NULL, NULL, NULL, '2024-12-21 02:13:24.236056+00', '2025-01-04 01:45:23.400831+00')
ON CONFLICT (id) DO NOTHING;