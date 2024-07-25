from .models import SaleVO, AppointmentVO, ServiceVO, Receipt
from common.json import ModelEncoder

class SaleVOEncoder(ModelEncoder):
  model = SaleVO
  properties = [
    "automobile",
    "salesperson",
    "price",
    "import_id"
  ]

class AppointmentVOEncoder(ModelEncoder):
  model = AppointmentVO
  properties = [
    "import_id",
    "status",
    "service",
    "vip"
  ]

class ServiceVOEncoder(ModelEncoder):
  model = ServiceVO
  properties = [
    "type",
    "parts_cost",
    "labor_cost",
  ]
