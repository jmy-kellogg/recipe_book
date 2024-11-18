from django.contrib import admin
from .models import Unit

@admin.register(Unit)
class UnitAdmin(admin.ModelAdmin):
    list_display = ('name', 'abbreviation', 'display_name', 'system')
    ordering = ['name', 'abbreviation', 'display_name', 'system']
    search_fields = ['name', 'abbreviation', 'display_name', 'system']
     

