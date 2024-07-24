from django.db import models

# Create your models here.
class SaleVO(models.Model):
  salesperson = models.CharField(max_length=200)
  price = models.PositiveIntegerField()
  import_id = models.PositiveBigIntegerField(unique=True, null=True)

class AppointmentVO(models.Model):
  import_id = models.PositiveBigIntegerField(unique=True, null=True)
  status = models.CharField(max_length=20)
  service = models.CharField(max_length=20, null=True)
  vip = models.CharField(max_length=5)

class Receipt(models.Model):
  pass
