from rest_framework import generics
from .models import Employee, Customer
from .choices import RoleChoices, TypeIdentificationChoices 
from .serializers import EmployeeSerializer, CustomerSerializer
from rest_framework.permissions import IsAuthenticated
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.authtoken.models import Token
from rest_framework.response import Response
from rest_framework import viewsets, permissions
from django.http import HttpResponseServerError


class EmployeeCreateView(generics.CreateAPIView):
    queryset = Employee.objects.all()
    permission_classes = (permissions.AllowAny,)
    serializer_class = EmployeeSerializer

class EmployeeDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Employee.objects.all()
    permission_classes = (permissions.AllowAny,)
    serializer_class = EmployeeSerializer

class EmployeeListView(generics.ListAPIView):
    queryset = Employee.objects.all()
    permission_classes = (permissions.AllowAny,)
    serializer_class = EmployeeSerializer

class CustomerCreateView(generics.CreateAPIView):
    queryset = Customer.objects.all()
    permission_classes = (permissions.AllowAny,)
    serializer_class = CustomerSerializer

class CustomerDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Customer.objects.all()
    permission_classes = (permissions.AllowAny,)
    serializer_class = CustomerSerializer

class CustomerListView(generics.ListAPIView):
    queryset = Customer.objects.all()
    permission_classes = (permissions.AllowAny,)
    serializer_class = CustomerSerializer

class CustomAuthToken(ObtainAuthToken):

    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data, context={'request': request})
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        token, created = Token.objects.get_or_create(user=user)

        response_data = {
            'token': token.key,
            'user_id': user.pk,
            'email': user.email,
            'role' : dict(RoleChoices.choices)[user.t_rol],
            'username' : user.name
        }

        return Response(response_data)
    

class UserProfileView(generics.RetrieveAPIView):
    """
    Devuelve la información del usuario que realizó la petición.
    """
    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        user = request.user

        print(user.t_rol)
        print(dict(RoleChoices.choices)[user.t_rol])
        
        if user.t_rol == 2 or user.t_rol == 1:
            serializer = EmployeeSerializer(user)
            data = serializer.data
            data['role'] = user.t_rol
            data['username'] = user.get_full_name()
            data['id'] = user.n_id
            data['email'] = user.email
            data['n_salary'] = user.n_salary
            data['d_start_contract'] = user.d_start_contract
            data['d_end_contract'] = user.d_end_contract
            data['fk_cinema'] = user.fk_cinema
            data['n_phone'] = user.n_phone
            data['is_active'] = user.is_active
        elif user.t_rol == 3:
            serializer = CustomerSerializer(user)
            data = serializer.data
            data['role'] = 'Cliente'
            data['id'] = user.n_id
            data['username'] = user.get_full_name()
            data['n_points'] = user.n_points
            data['n_phone'] = user.n_phone
            data['email'] = user.email
            data['is_active'] = user.is_active
        elif user.t_rol == 0:
            data = {
                'user_id': user.pk,
                'email': user.email,
                'role': 'Administrador Administrador',
                'username': user.get_full_name(),
            }
        else:
            raise SomeException("Error message")
        return Response(data)
