from django.contrib import admin
from .models import Salesperson, Customer, Sale, AutomobileVO


@admin.register(AutomobileVO)
class AutomobileVOAdmin(admin.ModelAdmin):
    list_display = [
        'vin',
        'sold',
        'id',
    ]

@admin.register(Salesperson)
class SalespersonAdmin(admin.ModelAdmin):
    list_display = [
        'first_name',
        'last_name',
        'employee_id',
        'id',
    ]

@admin.register(Customer)
class CustomerAdmin(admin.ModelAdmin):
    list_display = [
        'first_name',
        'last_name',
        'address',
        'phone_number',
        'id',
    ]

@admin.register(Sale)
class SaleAdmin(admin.ModelAdmin):
    list_display = [
        'price',
        'automobile',
        'salesperson',
        'customer',
        'id',
    ]