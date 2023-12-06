from rest_framework import serializers
from .models import Theater

class TheaterSerializer(serializers.ModelSerializer):
    class Meta:
        model = Theater

        fields = ('b_state',)
        read_only_fields = ('pk_id',)