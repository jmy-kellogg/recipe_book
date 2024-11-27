from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response

from django_app.models import Conversion


@api_view(['GET'])
def conversions(request):
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
