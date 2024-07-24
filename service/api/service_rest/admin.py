from django.contrib import admin
from .models import Technician, AutomobileVO, Appointment

# Register your models here.
@admin.register(Technician)
class TechnicianAdmin(admin.ModelAdmin):
    pass


@admin.register(AutomobileVO)
class AutomobileVO(admin.ModelAdmin):
    pass

@admin.register(Appointment)
class Appointment(admin.ModelAdmin):
    pass
