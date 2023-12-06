from django.db import models

class Cinema(models.Model):
  pk_id = models.AutoField(primary_key=True)
  t_direction = models.CharField(max_length=30,verbose_name='Dirección del cinema', blank="")
  t_name = models.CharField(max_length=255, verbose_name="Nombre del cinema")
