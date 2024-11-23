import os
import django
import json

# Setup Django environment
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'recipe_book.settings')
django.setup()

from django_app.models import Conversion, Ingredient, Unit

conversions = []
conversions_folder = './data/conversions'

for filename in os.listdir(conversions_folder):
    if filename.endswith('.json'):
        with open(os.path.join(conversions_folder, filename), 'r') as file:
            conversions_dict = json.load(file)
            ingredient_name = filename.replace('.json', '')
            ingredient = Ingredient.objects.filter(name=ingredient_name).first()
            if not ingredient:
                print(f"Could not find ingredient: {ingredient_name}")
            else:
                for from_unit_name, conversion in conversions_dict.items():
                    from_unit = Unit.objects.filter(name=from_unit_name).first()
                    if not from_unit:
                        print(f"Could not find from_unit: {from_unit_name}")
                    else:
                        for to_unit_name, factor in conversion.items():
                            to_unit = Unit.objects.filter(name=to_unit_name).first()
                            if not to_unit:
                                print(f"Could not find to_unit: {to_unit_name}")
                            elif not Conversion.objects.filter(ingredient=ingredient, from_unit=from_unit, to_unit=to_unit).exists():
                                conversions.append({
                                    "ingredient": ingredient,
                                    "from_unit": from_unit,
                                    "to_unit": to_unit,
                                    "factor": factor
                                })

print(f"Adding {len(conversions)} conversions to the database...")

for conversion in conversions:
    try:
        Conversion.objects.create(
        ingredient=conversion["ingredient"],
        from_unit=conversion["from_unit"],
        to_unit=conversion["to_unit"],
        factor=conversion["factor"]
    )
    except Exception as e:
        print(f"Error inserting conversion: {e}")
        continue

print("Data inserted successfully!")
