from django.db import models

class Movies(models.Model):
  pk_id      = models.AutoField(primary_key=True)
  t_genre    = models.CharField(max_length=30,verbose_name='Genero', blank="")
  n_rating   = models.IntegerField(verbose_name='Valoración')
  t_description = models.CharField(max_length=500,verbose_name="Descripción",blank='')
  t_title    = models.CharField(max_length=30,verbose_name='Titulo', blank="")
  n_duration   = models.IntegerField(verbose_name='Duración')
