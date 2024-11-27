from django.urls import path
from .views import conversions

urlpatterns = [
    path('conversions/', conversions)
]
