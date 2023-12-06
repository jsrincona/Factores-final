from rest_framework import serializers
from .models import Movies

class MovieSerializer(serializers.ModelSerializer):
    class Meta:
        model = Movies

        fields = ('t_genre','n_rating','t_description','t_title','n_duration','t_genre', 'pk_id')
        #read_only_fields = ('pk_id',)