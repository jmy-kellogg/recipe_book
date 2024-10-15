from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response

@api_view(['GET'])
def hello_world(request):
    print(Response({"message": "Hello, world!"}))
    return Response({"message": "Hello, world!"})