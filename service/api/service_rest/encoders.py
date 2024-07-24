from common.json import ModelEncoder
from .models import Technician, Appointment, AutomobileVO


class TechnicianEncoder(ModelEncoder):
    model = Technician
    properties = [
        'first_name',
        'last_name',
        'employee_id',
        'id'
    ]


class AppointmentEncoder(ModelEncoder):
    model = Appointment
    properties = [
        'date_time',
        'reason',
        'vin',
        'id',
        'technician',
        'status',
        'customer',
        'vip',
        'service'
    ]

    encoders= {'technician': TechnicianEncoder()}

class AutomobileVOEncoder(ModelEncoder):
    model = AutomobileVO
    properties = [
        'vin',
        'sold',
        'id'
    ]