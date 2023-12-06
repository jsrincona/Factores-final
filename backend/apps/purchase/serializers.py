from rest_framework import serializers
from .models import Purchase

class PurchaseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Purchase
        fields = ('n_total_value','n_score','d_creation','fk_product','fk_client',)
        read_only_fields = ('pk_id',)