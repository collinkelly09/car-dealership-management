from django.urls import path
from .views import list_salespeople, update_salespeople, list_customers, update_customers, list_sales, update_sales


urlpatterns = [
    path("salespeople/", list_salespeople),
    path("salespeople/<int:id>/", update_salespeople),
    path("customers/", list_customers),
    path("customers/<int:id>/", update_customers),
    path("sales/", list_sales),
    path("sales/<int:id>/", update_sales),
]
