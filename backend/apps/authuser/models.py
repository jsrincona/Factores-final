from typing import Any, Optional
from django.contrib.auth.models import UserManager, AbstractBaseUser, PermissionsMixin
from django.db import models
from django.utils import timezone
from .choices import RoleChoices, TypeIdentificationChoices
from apps.cinema.models import Cinema

class CustomUserManager(UserManager):

  @staticmethod
  def create_user_by_type(user_type, email=None, password=None, **extra_fields):
    if user_type == RoleChoices.ADMINISTRATOR:
      extra_fields.setdefault("is_staff", True)
      extra_fields.setdefault("is_superuser", True)
      extra_fields.setdefault("rol", RoleChoices.ADMINISTRATOR)
      user = Employee.objects.create_superuser(email=email, **extra_fields)
    elif user_type == RoleChoices.EMPLOYEE:
      extra_fields.setdefault("is_staff", True)
      extra_fields.setdefault("is_superuser", False)
      extra_fields.setdefault("rol", RoleChoices.EMPLOYEE)
      user = Employee.objects.create_empleado(email=email, **extra_fields)
    elif user_type == RoleChoices.CLIENT:
      extra_fields.setdefault("is_staff", False)
      extra_fields.setdefault("is_superuser", False)
      user = Customer.objects.create_cliente(email=email, **extra_fields)
    else:
      raise ValueError("Tipo de usuario invalido")
    return user


  def _create_user(self, email, password, **extra_fields):
    # Verificación validez del correo electrónico 
    if not email:
      raise ValueError("No se ha proporcionado un correo valido")
    # Se normaliza el correo
    email = self.normalize_email(email)
    # Se crea el usuario completo
    user = self.model(email = email, **extra_fields)
    # Se agrega una contraseña al usuario
    user.set_password(password)
    # Se guarda el usuario en la base de datos
    user.save(using=self._db)
    
    return user

  def create_user(self, email=None, password=None, **extra_fields):
    extra_fields.setdefault("is_staff", False)
    extra_fields.setdefault("is_superuser", False)
    return self._create_user(email, password, **extra_fields)
  
  def create_superuser(self, email=None, password=None, **extra_fields):
    extra_fields.setdefault("is_staff", True)
    extra_fields.setdefault("is_superuser", True)
    extra_fields.setdefault("t_rol", 0)
    return self._create_user(email, password, **extra_fields)
  
  def create_cliente(self, email=None, password=None, **extra_fields):
    extra_fields.setdefault("is_staff", False)
    extra_fields.setdefault("is_superuser", False)
    extra_fields.setdefault("t_rol", 3)
    return self._create_user(email, password, **extra_fields)
    
  def create_empleado(self, email=None, password=None, **extra_fields):
    extra_fields.setdefault("is_staff", True)
    extra_fields.setdefault("is_superuser", False)
    extra_fields.setdefault("t_rol", 2)
    return self._create_user(email, password, **extra_fields)
  
class User(AbstractBaseUser, PermissionsMixin):

  n_id = models.IntegerField(default=0)
  t_id = models.IntegerField(choices=TypeIdentificationChoices.choices, default=TypeIdentificationChoices.CEDULA)
  n_phone = models.IntegerField(null=True)
  t_rol = models.IntegerField(default=RoleChoices.CLIENT, choices=RoleChoices.choices)

  email = models.EmailField(blank=True, help_text='Correo electrónico', unique=True)
  name = models.CharField(max_length=255, blank=True, help_text='Nombre del usuario', default='')
  
  is_active = models.BooleanField(default=True)
  is_superuser = models.BooleanField(default=False)
  is_staff = models.BooleanField(default=False)

  date_joined = models.DateTimeField(default=timezone.now)
  last_login = models.DateTimeField(blank=True, null=True)

  objects = CustomUserManager()

  USERNAME_FIELD = "email"
  EMAIL_FIELD = "email"
  REQUIRED_FIELDS = []

  class Meta:
    verbose_name_plural = "Usuario"
    verbose_name = "Usuarios"

  def get_full_name(self) -> str:
    return self.name
  
  def get_short_name(self) -> str:
    return self.name or self.email.split("@")[0]
  

class Customer(User):
  n_points = models.IntegerField(blank=True,default=0)
  
  objects = CustomUserManager()
  
  class Meta:
    verbose_name_plural = "Cliente"
    verbose_name = "Clientes"

class Employee(User):
  n_salary = models.DecimalField(max_digits=10, decimal_places=2, default=1000000)
  d_start_contract = models.DateTimeField(blank=True,default=timezone.now)
  d_end_contract = models.DateTimeField(blank=True,null=True)
  fk_cinema = models.ForeignKey(Cinema, on_delete=models.CASCADE, null=True)

  objects = CustomUserManager()

  class Meta:
    verbose_name_plural = "Empleado"
    verbose_name = "Empleados"