from .models import Theater
from rest_framework import viewsets, permissions
from .serializers import TheaterSerializer

class TheaterViewSet(viewsets.ModelViewSet):
    queryset = Theater.objects.all()
    permission_classes = (permissions.AllowAny,)
    serializer_class = TheaterSerializer