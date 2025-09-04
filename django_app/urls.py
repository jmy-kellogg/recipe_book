from django.urls import path
from .views import conversions, recipes, update_recipe, recipe

urlpatterns = [
    path('conversions/', conversions),
    path('recipes/<recipe_name>/', recipe),
    path('recipes/<recipe_name>/update/', update_recipe),
    path('recipes/', recipes),

]
