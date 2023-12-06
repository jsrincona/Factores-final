from django.urls import path
from .views import EmployeeCreateView, EmployeeDetailView, EmployeeListView, CustomerCreateView, CustomerDetailView, CustomerListView, CustomAuthToken, UserProfileView

urlpatterns = [
    path('employee/create/', EmployeeCreateView.as_view(), name='employee_create'),
    path('employee/<int:pk>/', EmployeeDetailView.as_view(), name='employee_detail'),
    path('employee/list/', EmployeeListView.as_view(), name='employee_list'),
    path('customer/create/', CustomerCreateView.as_view(), name='customer_create'),
    path('customer/<int:pk>/', CustomerDetailView.as_view(), name='customer_detail'),
    path('customer/list/', CustomerListView.as_view(), name='customer_list'),
    path('api-token-auth/', CustomAuthToken.as_view(), name='api_token_auth'),
    path('me/', UserProfileView.as_view(), name='user-profile'),
]