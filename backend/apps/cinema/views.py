from .models import Cinema
from rest_framework import viewsets, permissions
from .serializers import CinemaSerializer

class CinemaViewSet(viewsets.ModelViewSet):
    queryset = Cinema.objects.all()
    serializer_class = CinemaSerializer

    def get_permissions(self):
        """
        Instantiates and returns the list of permissions that this view requires.
        """
        if self.action == 'list' or self.action == 'retrieve':
            # permitimos la acción GET (list, retrieve) a cualquier usuario
            permission_classes = [permissions.AllowAny]
        else:
            # las demás acciones requieren autenticación
            permission_classes = [permissions.IsAuthenticated]
        return [permission() for permission in permission_classes]
