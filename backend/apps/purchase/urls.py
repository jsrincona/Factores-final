from django.urls import include, path
from rest_framework import routers
from .views import PurchaseViewSet, GenerateInvoiceView, MakeSaleView

router = routers.DefaultRouter()

router.register("", PurchaseViewSet)

urlpatterns = [
    path('unique/',include(router.urls)),
    path('invoice/<int:purchase_id>/', GenerateInvoiceView.as_view(), name='generate_invoice'),
    path("sale-data/", MakeSaleView.as_view()),
]