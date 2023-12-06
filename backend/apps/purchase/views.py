from .models import Purchase
from django.http import JsonResponse
from django.views import View
from django.db import transaction
from rest_framework import viewsets, permissions
from .serializers import PurchaseSerializer
from apps.seat.models import Seat
from apps.product.models import Product
from apps.product.models import Snack
from apps.authuser.models import User
from django.http import FileResponse
from django.template.loader import render_to_string
from django.shortcuts import get_object_or_404
from weasyprint import HTML
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.template.loader import get_template
from django.http import HttpResponse
import json

class PurchaseViewSet(viewsets.ModelViewSet):
    queryset = Purchase.objects.all()
    permission_classes = (permissions.AllowAny,)
    serializer_class = PurchaseSerializer

class MakeSaleView(APIView):
     def post(self, request, *args, **kwargs):
        data = request.data

        with transaction.atomic():
            # Cambiar el estado de las sillas
            seat_ids = data.get('seat_ids', [])  # IDs de las sillas seleccionadas
            seats = Seat.objects.filter(pk_id__in=seat_ids)
            seats.update(b_state=True)

            # Reducir el stock de los snacks seleccionados
            snack_ids = data.get('snack_ids', [])  # IDs de los snacks seleccionados
            snacks = Snack.objects.filter(pk_id__in=snack_ids)
            for snack in snacks:
                if snack.n_stock > 0:
                    snack.n_stock -= 1
                    snack.save()
                else:
                    return Response({'error': f'Snack {snack.pk_id} is out of stock'}, status=status.HTTP_400_BAD_REQUEST)

            # Crear un nuevo registro de compra
            client_id = data.get('client_id')  # ID del cliente
            client = User.objects.get(pk=client_id)

            purchase = Purchase.objects.create(fk_client=client)

            # Añadir los productos seleccionados a la compra
            product_ids = seat_ids + snack_ids
            products = Product.objects.filter(pk_id__in=product_ids)
            purchase.fk_product.add(*products)

            # Calcular el valor total de la compra
            purchase.n_total_value = sum(product.n_price for product in products)
            purchase.save()

        return Response({'success': 'Sale made successfully', 'purchase_id': purchase.pk_id}, status=status.HTTP_200_OK)
        
class GenerateInvoiceView(View):
    permission_classes = (permissions.AllowAny,)
    def get(self, request, purchase_id):
        purchase = get_object_or_404(Purchase, pk=purchase_id)

        context = {
            'purchase' : purchase,
        }
        
        template = get_template('invoice.html')
        html = template.render(context)
        response = HttpResponse(content_type="application/pdf")
        HTML(string=html).write_pdf(response)

        return response