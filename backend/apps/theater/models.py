from django.db import models
from apps.cinema.models import Cinema

class Theater (models.Model):
  pk_id = models.AutoField(primary_key=True)
  b_state = models.BooleanField(default=True)
  fk_cinema = models.ForeignKey(Cinema, on_delete=models.CASCADE, null=True)
