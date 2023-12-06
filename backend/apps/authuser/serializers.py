from rest_framework import serializers
from .models import Employee, Customer

class EmployeeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Employee
        fields = ['n_id', 't_id', 'n_phone', 'email', 'name', 'password', 'n_salary', 'd_start_contract', 'd_end_contract', 't_rol', 'password','is_active']
        read_only_fields = ('is_active',)
        extra_kwargs = {'password': {'write_only': True}}
    
    def create(self, validated_data):
        password = validated_data.pop('password')
        employee = Employee.objects.create_empleado(**validated_data)
        employee.set_password(password)
        employee.save()
        return employee

class CustomerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Customer
        fields = ['n_id', 't_id', 'n_phone', 'email', 'name', 'password', 'n_points', 'password','is_active']
        read_only_fields = ('is_active',)
        extra_kwargs = {'password': {'write_only': True}}
    
    def create(self, validated_data):
        password = validated_data.pop('password')
        customer = Customer.objects.create_empleado(**validated_data)
        customer.set_password(password)
        customer.save()
        return customer