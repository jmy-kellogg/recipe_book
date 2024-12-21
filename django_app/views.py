from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response

from django_app.models import Conversion, Recipe, RecipeIngredient


@api_view(['GET'])
def conversions(request):
    try:
        conversions = {}
        conversions_list = Conversion.objects.all()
        
        for conversion in conversions_list:
            ingredient = conversion.ingredient.name
            from_unit = conversion.from_unit.name
            to_unit = conversion.to_unit.name

            conversions[ingredient] = conversions[ingredient] if ingredient in conversions else {}
            conversions[ingredient][from_unit] = conversions[ingredient][from_unit] if from_unit in conversions[ingredient] else {}
            conversions[ingredient][from_unit][to_unit] = conversion.factor
        return Response(conversions)
   
    except Exception as e:
        return Response({"error": f"Error retrieving conversions: {e}"}, status=500)

@api_view(['GET'])
def conversion(request):
    ingredient = request.query_params.get('ingredient')

    if not ingredient:
        return Response({"error": "Missing ingredient parameter"}, status=400)
    try:
        conversions = {}
        conversions_list = Conversion.objects.filter(ingredient=ingredient)
        
        for conversion in conversions_list:
            from_unit_name = conversion.from_unit.name
            to_unit_name = conversion.to_unit.name
            conversions[from_unit_name] = conversions[from_unit_name] if from_unit_name in conversions else {}
            conversions[from_unit_name][to_unit_name] = conversion.factor
        return Response({
            "ingredient": ingredient,  
            "conversions": conversions
        })
   
    except Exception as e:
        return Response({"error": f"Error retrieving conversions: {e}"}, status=500)

@api_view(['GET'])
def recipe(request, recipe_name):
    try:
        recipe_obj = Recipe.objects.get(name=recipe_name)
        ingredients_list = RecipeIngredient.objects.filter(recipe=recipe_obj)
        ingredients = [
            {
                "name": ingredient.ingredient.name,
                "amount": ingredient.amount,
                "unit": ingredient.unit.name,
                "optional": ingredient.optional
            }
            for ingredient in ingredients_list
        ]
        recipe_data = {
            "id": str(recipe_obj.id),
            "name": recipe_obj.name,
            "title": recipe_obj.title,
            "description": recipe_obj.description,
            "ingredients": ingredients,
            "instructions": recipe_obj.instructions,
            "tips": recipe_obj.tips,
        }
        return Response(recipe_data)
   
    except Exception as e:
        return Response({"error": f"Error retrieving recipe: {e}"}, status=500)
    
@api_view(['GET'])
def recipes(request):
    try:
        recipes_list = Recipe.objects.all()
        recipes_resp = {
            "recipes": [
                {
                    "id": str(recipe.id),
                    "name": recipe.name,
                    "title": recipe.title,
                    "description": recipe.description,
                    "image": recipe.image.url if recipe.image else None,
                }
                for recipe in recipes_list
            ]
        }
        return Response(recipes_resp)
   
    except Exception as e:
        return Response({"error": f"Error retrieving recipes"}, status=500)