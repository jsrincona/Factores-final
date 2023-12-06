from rest_framework import serializers
from .models import Seat

class SeatSerializer(serializers.ModelSerializer):
    class Meta:
        model = Seat

        fields = ('t_type','b_state','fk_ticket','fk_hall','pk_id')
        read_only_fields = ('pk_id',)