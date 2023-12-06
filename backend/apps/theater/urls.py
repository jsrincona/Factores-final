from django.urls import include, path
from rest_framework import routers
from .views import TheaterViewSet

router = routers.DefaultRouter()

router.register("", TheaterViewSet)

urlpatterns = [
    path('',include(router.urls))
]