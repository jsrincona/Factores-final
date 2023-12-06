from rest_framework import serializers
from .models import Hall

class HallSerializer(serializers.ModelSerializer):
    class Meta:
        model = Hall

        fields = ('b_state','fk_theater','pk_id')
        read_only_fields = ('pk_id',)