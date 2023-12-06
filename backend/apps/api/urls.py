from django.urls import path, include
from apps.authuser import views

urlpatterns = [
  path('user/', include('apps.authuser.urls')),
  path('product/', include('apps.product.urls')),
  path('purchase/', include('apps.purchase.urls')),
  path('movie/', include('apps.movie.urls')),
  path('function/', include('apps.function.urls')),
  path('theater/', include('apps.theater.urls')),
  path('cinema/', include('apps.cinema.urls')),
  path('seat/', include('apps.seat.urls')),
  path('stats/', include('apps.stats.urls')),
  path('hall/', include('apps.hall.urls')),
  path('auth/generate_token/',views.CustomAuthToken.as_view())
]