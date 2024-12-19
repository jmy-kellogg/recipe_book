from django.contrib import admin
from .models import Unit, Ingredient, Conversion, Recipe, RecipeIngredient

@admin.register(Unit)
class UnitAdmin(admin.ModelAdmin):
    list_display = ('name', 'abbreviation', 'display_name', 'system')
    ordering = ['name', 'abbreviation', 'display_name', 'system']
    search_fields = ['name', 'abbreviation', 'display_name', 'system']
     
@admin.register(Ingredient)
class IngredientAdmin(admin.ModelAdmin):
    list_display = ('name', 'display_name')
    ordering = ['name', 'display_name']
    search_fields = ['name', 'display_name']

@admin.register(Conversion)
class ConversionAdmin(admin.ModelAdmin):
    list_display = ('id', 'ingredient', 'from_unit', 'to_unit', 'factor')
    ordering = ['ingredient', 'from_unit', 'to_unit']
    search_fields = ['id', 'ingredient', 'from_unit', 'to_unit', 'factor']

@admin.register(Recipe)
class RecipeAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'description', 'servings', 'prep_time', 'cook_time', 'total_time', 'created_at', 'updated_at')
    ordering = ['name', 'description', 'servings', 'prep_time', 'cook_time', 'total_time', 'created_at', 'updated_at']
    search_fields = ['id', 'name', 'description', 'servings', 'prep_time', 'cook_time', 'total_time', 'created_at', 'updated_at']

@admin.register(RecipeIngredient)
class RecipeIngredientAdmin(admin.ModelAdmin):
    list_display = ('recipe', 'ingredient', 'amount', 'unit', 'optional')
    ordering = ['recipe', 'ingredient', 'amount', 'unit', 'optional']
    search_fields = ['recipe', 'ingredient', 'amount', 'unit', 'optional']
