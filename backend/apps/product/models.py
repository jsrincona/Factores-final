from django.db import models

class Product (models.Model):
  pk_id = models.AutoField(primary_key=True)
  t_name = models.CharField(max_length=100, default="Juferoga :v")
  t_description = models.CharField(max_length=255, blank=True, null=True)
  n_price = models.DecimalField(max_digits=50,decimal_places=2, default=20000)

class Snack (Product):
  n_stock = models.PositiveIntegerField(default=0)
  t_type = models.CharField(max_length=255)

class Ticket (Product):
  d_creation = models.DateTimeField(auto_now_add=True)
  b_state = models.BooleanField(default=False)