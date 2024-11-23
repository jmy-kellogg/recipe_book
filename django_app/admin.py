from django.contrib import admin
from .models import Unit, Ingredient, Conversion

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
    ordering = ['id', 'ingredient', 'from_unit', 'to_unit', 'factor']
    search_fields = ['id', 'ingredient', 'from_unit', 'to_unit', 'factor']
