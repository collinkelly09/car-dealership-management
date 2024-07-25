from django.db import models

# Create your models here.
class SaleVO(models.Model):
  automobile = models.CharField(max_length=200)
  salesperson = models.CharField(max_length=200)
  price = models.PositiveIntegerField()
  import_id = models.PositiveBigIntegerField(unique=True)

class AppointmentVO(models.Model):
  import_id = models.PositiveBigIntegerField(unique=True)
  status = models.CharField(max_length=20)
  service = models.CharField(max_length=20, null=True, blank=True)
  vip = models.CharField(max_length=5)

class Receipt(models.Model):
  date_time = models.DateTimeField(auto_now_add=True)
  sale = models.OneToOneField(
    SaleVO,
    related_name="receipt",
    on_delete=models.CASCADE,
    blank=True,
    null=True
  )
