from django.urls import include, path
from rest_framework import routers
from .views import ProductViewSet, SnackViewSet, TicketViewSet

router = routers.DefaultRouter()

#router.register("", ProductViewSet)
router.register("snacks", SnackViewSet)
router.register("ticket", TicketViewSet)

urlpatterns = [
    path('',include(router.urls))
]