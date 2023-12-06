from django.urls import include, path
from rest_framework import routers
from .views import MovieViewSet

router = routers.DefaultRouter()

router.register("", MovieViewSet)

urlpatterns = [
    path('',include(router.urls))
]