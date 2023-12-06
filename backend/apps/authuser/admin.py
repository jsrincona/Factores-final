from django.contrib import admin
from .models import User, Customer, Employee

class UserAdmin(admin.ModelAdmin):
    list_display = ['email', 'name', 'n_id', 't_id', 'n_phone', 'is_active', 'is_staff', 'is_superuser']
    search_fields = ['email', 'name']
    list_filter = ['is_active', 'is_staff', 'is_superuser']
    
class CustomerAdmin(admin.ModelAdmin):
    list_display = ['email', 'name', 'n_points']
    search_fields = ['email', 'name']

class EmployeeAdmin(admin.ModelAdmin):
    list_display = ['email', 'name', 'n_salary', 'd_start_contract', 'd_end_contract', 't_rol']
    search_fields = ['email', 'name']
    list_filter = ['t_rol']

admin.site.register(User, UserAdmin)
admin.site.register(Customer, CustomerAdmin)
admin.site.register(Employee, EmployeeAdmin)
