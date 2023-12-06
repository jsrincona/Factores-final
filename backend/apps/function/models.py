from django.db import models
from apps.movie.models import Movies
from apps.hall.models import Hall

class Function(models.Model):
  pk_id = models.AutoField(primary_key=True)
  d_date = models.DateField()
  d_start_time = models.TimeField()
  d_end_time = models.TimeField()
  fk_movie = models.ForeignKey(Movies, on_delete=models.CASCADE)
  fk_hall = models.ForeignKey(Hall, on_delete=models.CASCADE, null=True)

