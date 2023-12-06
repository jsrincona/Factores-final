from rest_framework.views import APIView
from rest_framework.response import Response
from django.db.models import Sum, Avg, Count
from ..purchase.models import Purchase
from ..product.models import Product
from ..seat.models import Seat
from ..function.models import Function
from ..movie.models import Movies
from rest_framework import permissions
from django.shortcuts import render
from django.http import HttpResponse
from django.template.loader import get_template
from weasyprint import HTML

def generate_pdf(request):
    total_purchase_value = Purchase.objects.aggregate(total_value=Sum('n_total_value'))['total_value']
    average_score = Purchase.objects.aggregate(avg_score=Avg('n_score'))['avg_score']
    purchase_product_count = Purchase.objects.annotate(product_count=Count('fk_product')).values('pk_id', 'product_count')
    average_price = Product.objects.aggregate(avg_price=Avg('n_price'))['avg_price']
    total_reserved_seats = Seat.objects.aggregate(total_seats=Sum('b_state'))['total_seats']
    function_count_per_movie = Function.objects.values('fk_movie').annotate(function_count=Count('pk_id'))
    purchase_count_per_client = Purchase.objects.values('fk_client').annotate(purchase_count=Count('pk_id'))
    average_duration = Movies.objects.aggregate(avg_duration=Avg('n_duration'))['avg_duration']
    stats = {
        'total_purchase_value': total_purchase_value,
        'average_score': average_score,
        'purchase_product_count': list(purchase_product_count),
        'average_price': average_price,
        'total_reserved_seats': total_reserved_seats,
        'function_count_per_movie': list(function_count_per_movie),
        'purchase_count_per_client': list(purchase_count_per_client),
        'average_duration': average_duration
    }

    template = get_template('report.html')
    html = template.render(stats)
    response = HttpResponse(content_type='application/pdf')
    HTML(string=html).write_pdf(response)

    return response

class StatsView(APIView):
  permission_classes = (permissions.AllowAny,)

  def get(self, request, format=None):
    # Calcular el valor total de todas las compras realizadas
    total_purchase_value = Purchase.objects.aggregate(total_value=Sum('n_total_value'))['total_value']

    # Calcular el puntaje promedio de todas las compras realizadas
    average_score = Purchase.objects.aggregate(avg_score=Avg('n_score'))['avg_score']

    # Contar la cantidad de productos asociados a cada compra
    purchase_product_count = Purchase.objects.annotate(product_count=Count('fk_product')).values('pk_id', 'product_count')

    # Calcular el precio promedio de todos los productos
    average_price = Product.objects.aggregate(avg_price=Avg('n_price'))['avg_price']

    # Obtener la cantidad total de asientos reservados en todos los teatros
    total_reserved_seats = Seat.objects.aggregate(total_seats=Sum('b_state'))['total_seats']

    # Contar la cantidad de funciones por película
    function_count_per_movie = Function.objects.values('fk_movie').annotate(function_count=Count('pk_id'))

    # Obtener la cantidad de compras realizadas por cada cliente
    purchase_count_per_client = Purchase.objects.values('fk_client').annotate(purchase_count=Count('pk_id'))

    # Calcular la duración promedio de todas las películas
    average_duration = Movies.objects.aggregate(avg_duration=Avg('n_duration'))['avg_duration']

    return Response({
        'total_purchase_value': total_purchase_value,
        'average_score': average_score,
        'purchase_product_count': list(purchase_product_count),
        'average_price': average_price,
        'total_reserved_seats': total_reserved_seats,
        'function_count_per_movie': list(function_count_per_movie),
        'purchase_count_per_client': list(purchase_count_per_client),
        'average_duration': average_duration
    })
