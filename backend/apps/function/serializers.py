from rest_framework import serializers
from .models import Function

class FunctionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Function

        fields = ('d_date','d_start_time','d_end_time','fk_movie','fk_hall', 'pk_id')
        read_only_fields = ('pk_id',)