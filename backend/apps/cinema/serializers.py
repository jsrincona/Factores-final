from rest_framework import serializers
from rest_framework import mixins
from .models import Cinema

class CinemaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cinema
        fields = ('pk_id','t_direction','t_name',)
        read_only_fields = ('pk_id',)