from .models import Seat
from rest_framework import viewsets, permissions
from .serializers import SeatSerializer

class SeatViewSet(viewsets.ModelViewSet):
    queryset = Seat.objects.all()
    permission_classes = (permissions.AllowAny,)
    serializer_class = SeatSerializer