from .models import Hall
from rest_framework import viewsets, permissions
from .serializers import HallSerializer
from apps.seat.models import Seat
from apps.function.models import Function
from apps.movie.models import Movies
from django.http import JsonResponse
from django.core import serializers


class HallViewSet(viewsets.ModelViewSet):
    queryset = Hall.objects.all()
    permission_classes = (permissions.AllowAny,)
    serializer_class = HallSerializer

# 1. Vista para obtener todas las sillas en un hall específico
def get_seats_in_hall(request, hall_id):
    seats_in_hall = Seat.objects.filter(fk_hall=hall_id)
    data = serializers.serialize('json', seats_in_hall)
    return JsonResponse(data, safe=False)


# 2. Vista para obtener todas las funciones en un hall específico
def get_functions_in_hall(request, hall_id):
    functions_in_hall = Function.objects.filter(fk_hall=hall_id)
    data = serializers.serialize('json', functions_in_hall)
    return JsonResponse(data, safe=False)


# 3. Vista para obtener todas las películas en un hall específico
def get_movies_in_hall(request, hall_id):
    functions_in_hall = Function.objects.filter(fk_hall=hall_id)
    movies_in_hall = Movies.objects.filter(pk_id__in=[function.fk_movie.pk_id for function in functions_in_hall])
    data = serializers.serialize('json', movies_in_hall)
    return JsonResponse(data, safe=False)