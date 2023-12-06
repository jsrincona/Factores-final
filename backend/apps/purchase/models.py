from django.db import models
from django.core.validators import MaxValueValidator, MinValueValidator
from django.utils import timezone
from apps.authuser.models import User
from apps.product.models import Product

class Purchase(models.Model):
  pk_id = models.AutoField(primary_key=True)
  n_total_value = models.PositiveIntegerField(default=0)
  n_score = models.PositiveSmallIntegerField(default=5, validators=[
      MinValueValidator(0),
      MaxValueValidator(100)
    ]
  )
  d_creation = models.DateTimeField(default=timezone.now)
  fk_client = models.ForeignKey(User, null=True, on_delete=models.CASCADE)
  fk_product = models.ManyToManyField(Product, related_name="producto_pedido")
