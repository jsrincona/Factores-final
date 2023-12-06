from django.urls import include, path
from rest_framework import routers
from .views import HallViewSet, get_functions_in_hall, get_seats_in_hall, get_movies_in_hall

router = routers.DefaultRouter()

router.register("", HallViewSet)

urlpatterns = [
    path('',include(router.urls)),
    path('<int:hall_id>/seats/', get_seats_in_hall),
    path('<int:hall_id>/functions/', get_functions_in_hall),
    path('<int:hall_id>/movies/', get_movies_in_hall),
]