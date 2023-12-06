from django.db import models
from apps.product.models import Ticket
from apps.hall.models import Hall

class Seat(models.Model):
  pk_id = models.AutoField(primary_key=True)
  t_type = models.CharField(max_length=255)
  b_state = models.BooleanField(default=False)
  fk_ticket = models.ForeignKey(Ticket, null=True, on_delete=models.CASCADE)
  fk_hall = models.ForeignKey(Hall, null=True, on_delete=models.CASCADE)
