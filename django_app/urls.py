from django.urls import path
from .views import conversions, recipes, recipe

urlpatterns = [
    path('conversions/', conversions),
    path('recipes/<recipe_name>/', recipe),
    path('recipes/', recipes),
]
