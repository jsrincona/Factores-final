from .models import Product, Snack, Ticket
from rest_framework import viewsets, permissions
from .serializers import ProductSerializer, SnackSerializer, TicketSerializer

class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    permission_classes = (permissions.AllowAny,)
    serializer_class = ProductSerializer

class SnackViewSet(viewsets.ModelViewSet):
    queryset = Snack.objects.all()
    permission_classes = (permissions.AllowAny,)
    serializer_class = SnackSerializer

class TicketViewSet(viewsets.ModelViewSet):
    queryset = Ticket.objects.all()
    permission_classes = (permissions.AllowAny,)
    serializer_class = TicketSerializer