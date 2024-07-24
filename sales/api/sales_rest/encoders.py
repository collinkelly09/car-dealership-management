from .models import AutomobileVO, Salesperson, Customer, Sale
from common.json import ModelEncoder


class AutomobileVODetailEncoder(ModelEncoder):
    model = AutomobileVO
    properties = ["vin", "sold"]

class SalespeopleEncoder(ModelEncoder):
    model = Salesperson
    properties = [
        'first_name',
        'last_name',
        'employee_id',
        'id',
    ]

class CustomersEncoder(ModelEncoder):
    model = Customer
    properties = [
        'first_name',
        'last_name',
        'address',
        'phone_number',
        'id',
    ]

class SalesEncoder(ModelEncoder):
    model = Sale
    properties = [
        'price',
        'automobile',
        'salesperson',
        'customer',
        'id',
    ]
    encoders = {
        'automobile': AutomobileVODetailEncoder(),
        'salesperson': SalespeopleEncoder(),
        'customer': CustomersEncoder(),
    }
    def get_extra_data(self, o):
        return {"automobile": o.automobile.vin}
