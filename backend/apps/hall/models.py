from django.db import models
from apps.theater.models import Theater

class Hall(models.Model):
  pk_id = models.AutoField(primary_key=True)
  b_state = models.BooleanField(default=False)
  fk_theater = models.ForeignKey(Theater, null=True, on_delete=models.CASCADE)