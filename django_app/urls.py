from django.urls import path
from .views import conversions, recipes

urlpatterns = [
    path('conversions/', conversions),
    path('recipes/<recipe_name>/', recipes),
]
