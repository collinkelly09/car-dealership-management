

from django.db import models

# Create your models here.
class Technician(models.Model):
    first_name = models.CharField(max_length=200)
    last_name = models.CharField(max_length=200)
    employee_id = models.CharField(max_length=50)

class Services(models.Model):
    type = models.CharField(max_length=200, unique=True)
    parts_cost = models.PositiveIntegerField(null=True, blank=True)
    labor_cost = models.PositiveSmallIntegerField()

class Appointment(models.Model):
    date_time = models.DateTimeField()
    reason = models.CharField(max_length=200)
    status = models.CharField(
        max_length=20,
        default='CREATED',
        editable=False)
    vin = models.CharField(max_length=17)
    service = models.CharField(max_length=20, null=True)
    technician = models.ForeignKey(
        Technician,
        related_name="appointments",
        on_delete=models.CASCADE,
    )
    customer = models.CharField(max_length=50)
    vip = models.CharField(
        default="No",
        max_length=5,
        editable=False
    )

class AutomobileVO(models.Model):
    vin = models.CharField(max_length=17, unique=True)
    sold = models.BooleanField(default=False)
