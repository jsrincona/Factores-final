from django.contrib.staticfiles.storage import staticfiles_storage
from django.views.generic.base import RedirectView
from django.contrib import admin
from django.urls import path, include
from pages import views
from apps.api import views as api_views

urlpatterns = [
    path('favicon.ico', RedirectView.as_view(url=staticfiles_storage.url('imgs/favicon.ico'))),
    path('admin/', admin.site.urls),
    path("api/", include('apps.api.urls')),
    path('', views.HomePage),
]
