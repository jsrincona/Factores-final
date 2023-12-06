from django.urls import include, path
from rest_framework import routers
from .views import FunctionViewSet

router = routers.DefaultRouter()

router.register("", FunctionViewSet)

urlpatterns = [
    path('',include(router.urls))
]