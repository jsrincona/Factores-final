from django.urls import include, path
from rest_framework import routers
from .views import SeatViewSet

router = routers.DefaultRouter()

router.register("", SeatViewSet)

urlpatterns = [
    path('',include(router.urls))
]