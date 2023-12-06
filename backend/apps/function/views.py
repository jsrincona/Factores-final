from .models import Function
from rest_framework import viewsets, permissions
from .serializers import FunctionSerializer

class FunctionViewSet(viewsets.ModelViewSet):
    queryset = Function.objects.all()
    permission_classes = (permissions.AllowAny,)
    serializer_class = FunctionSerializer