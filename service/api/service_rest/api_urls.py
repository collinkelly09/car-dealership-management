from django.urls import path

from service_rest.api_views import api_list_technicians, api_show_tech, api_list_appointments, api_show_appointments, api_cancel_appointment,api_finish_appointment
# from .api_views import

urlpatterns = [
    path('technicians/', api_list_technicians, name='api_list_technicians'),
    path('technicians/<int:pk>/', api_show_tech, name='api_show_tech'),
    path('appointments/', api_list_appointments, name='api_list_appointments'),
    path('appointments/<int:pk>/', api_show_appointments, name='api_show_appointments'),
    path('appointments/<int:pk>/cancel/', api_cancel_appointment, name='api_cancel_appointment'),
    path('appointments/<int:pk>/finish/', api_finish_appointment, name='api_finish_appointment')
]
