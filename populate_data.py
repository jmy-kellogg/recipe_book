import os
import django
import json

# Setup Django environment
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'recipe_book.settings')
django.setup()

from django_app.models import Conversion, Ingredient, Unit



def units():
    units_json = open('./data/units.json', 'r')
    units_list = json.load(units_json)["data"]

    for unit in units_list:
        try:
            Unit.objects.create(
                name=unit['name'],
                display_name=unit['display_name'],
                abbreviation=unit['abbreviation'],
                system=unit['system']
            )
        except Exception as e:
            print(f"Error inserting unit: {e}")
            continue

    print("Unit inserted complete!")

def ingredients():
    ingredients_list = [
        {"name": "flour", "display_name": "Flour"},
        {"name": "sugar", "display_name": "Sugar"},
        {"name": "butter", "display_name": "Butter"},
        {"name": "milk", "display_name": "Milk"},
        {"name": "egg", "display_name": "Egg"},
        {"name": "salt", "display_name": "Salt"},
        {"name": "pepper", "display_name": "Pepper"},
        {"name": "water", "display_name": "Water"},
        {"name": "oil", "display_name": "Oil"},
        {"name": "vinegar", "display_name": "Vinegar"},
        {"name": "lemon_juice", "display_name": "Lemon Juice"},
        {"name": "baking_powder", "display_name": "Baking Powder"},
        {"name": "baking_soda", "display_name": "Baking Soda"},
        {"name": "yeast", "display_name": "Yeast"},
        {"name": "cinnamon", "display_name": "Cinnamon"},
        {"name": "vanilla_extract", "display_name": "Vanilla Extract"},
    ]

    for ingredient in ingredients_list:
        try:
            Ingredient.objects.create(
                name=ingredient['name'],
                display_name=ingredient['display_name']
            )
        except Exception as e:
            print(f"Error inserting ingredient: {e}")
            continue

    print("Ingredient inserted complete!")

def conversions():
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

# Unit.objects.all().delete()
# Ingredient.objects.all().delete()
# Conversion.objects.all().delete()

# units()
# ingredients()
# conversions()