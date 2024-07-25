import django
import os
import sys
import time
import json
import requests

sys.path.append("")
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "billing_project.settings")
django.setup()


from billing_rest.models import SaleVO, AppointmentVO


def poll():
    while True:
        print('Billing poller polling for data')
        try:
            sales_response = requests.get("http://sales-api:8000/api/sales/")
            appointment_response = requests.get("http://service-api:8000/api/appointments/")
            service_response = requests.get("http://service-api:8000/api/services/")
            sales_content = json.loads(sales_response.content)
            appointment_content = json.loads(appointment_response.content)
            service_content = json.loads(service_response.content)
            for sale in sales_content['sales']:
                print(sale["automobile"])
                SaleVO.objects.update_or_create(
                    import_id = sale["id"],
                    defaults= {
                        "price": sale["price"],
                        "salesperson": sale["salesperson"],
                        "automobile": sale["automobile"]
                    }
                )
            for appt in appointment_content['appointments']:
                AppointmentVO.objects.update_or_create(
                    import_id = appt["id"],
                    defaults = {
                        "status": appt["status"],
                        "service": appt["service"],
                        "vip": appt["vip"]
                    }
                )
        except Exception as e:
            print(e, file=sys.stderr)

        time.sleep(60)


if __name__ == "__main__":
    poll()
