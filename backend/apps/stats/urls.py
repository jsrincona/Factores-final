from django.urls import path
from .views import StatsView, generate_pdf

urlpatterns = [
    path('', StatsView.as_view(), name='stats'),
    path('report/', generate_pdf, name='report'),
]