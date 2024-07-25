from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
import json
from .encoders import SalespeopleEncoder, CustomersEncoder, SalesEncoder
from .models import Salesperson, Customer, Sale, AutomobileVO
import requests

@require_http_methods(["GET", "POST"])
def list_salespeople(request):
    if request.method == "GET":
        salespeople = Salesperson.objects.all()
        return JsonResponse(
            {"salespeople": salespeople},
            encoder=SalespeopleEncoder
        )
    else:
        try:
            content = json.loads(request.body)
            salesperson = Salesperson.objects.create(**content)
            return JsonResponse(
                salesperson,
                encoder=SalespeopleEncoder,
                safe=False,
            )
        except:
            response = JsonResponse(
                {"message": "Invalid Employee ID"}
            )
            response.status_code = 400
            return response
        
@require_http_methods(["DELETE", "PUT", "GET"])
def update_salespeople(request, id):
    if request.method == "GET": 
        try:
            employee = Salesperson.objects.get(id=id)
            return JsonResponse(
                employee,
                encoder=SalespeopleEncoder,
                safe=False
            )
        except Salesperson.DoesNotExist:
            response = JsonResponse({"message": "Does not exist"})
            response.status_code = 404
            return response
    elif request.method == "DELETE":
        try:
            salesperson = Salesperson.objects.get(id=id)
            salesperson.delete()
            return JsonResponse(
                salesperson,
                encoder=SalespeopleEncoder,
                safe=False,
            )
        except Salesperson.DoesNotExist:
            return JsonResponse({"message": "Does not exist"})
    else: # PUT
        content = json.loads(request.body)
        try:
            salesperson = Salesperson.objects.get(id=id)
        except Salesperson.DoesNotExist:
            return JsonResponse(
                {"message": "Invalid Salesperson ID"},
                status=400,
            )
        Salesperson.objects.filter(id=id).update(**content)
        salesperson = Salesperson.objects.get(id=id)
        return JsonResponse(
            salesperson,
            encoder=SalespeopleEncoder,
            safe=False,
        )

@require_http_methods(["GET", "POST"])
def list_customers(request):
    if request.method == "GET":
        customers = Customer.objects.all()
        return JsonResponse(
            {"customers": customers},
            encoder=CustomersEncoder
        )
    else:
        try:
            content = json.loads(request.body)
            customer = Customer.objects.create(**content)
            return JsonResponse(
                customer,
                encoder=CustomersEncoder,
                safe=False,
            )
        except:
            response = JsonResponse(
                {"message": "Invalid Customer ID"}
            )
            response.status_code = 400
            return response
        
@require_http_methods(["DELETE", "PUT", "GET"])
def update_customers(request, id):
    if request.method == "GET": 
        try:
            customer = Customer.objects.get(id=id)
            return JsonResponse(
                customer,
                encoder=CustomersEncoder,
                safe=False
            )
        except Customer.DoesNotExist:
            response = JsonResponse({"message": "Does not exist"})
            response.status_code = 404
            return response
    elif request.method == "DELETE":
        try:
            customer = Customer.objects.get(id=id)
            customer.delete()
            return JsonResponse(
                customer,
                encoder=CustomersEncoder,
                safe=False,
            )
        except Customer.DoesNotExist:
            return JsonResponse({"message": "Does not exist"})
    else: # PUT
        content = json.loads(request.body)
        try:
            customer = Customer.objects.get(id=id)
        except Customer.DoesNotExist:
            return JsonResponse(
                {"message": "Invalid Customer ID"},
                status=400,
            )
        Customer.objects.filter(id=id).update(**content)
        customer = Customer.objects.get(id=id)
        return JsonResponse(
            customer,
            encoder=CustomersEncoder,
            safe=False,
        )

@require_http_methods(["GET", "POST"])
def list_sales(request):
    if request.method == "GET":
        sales = Sale.objects.all()
        return JsonResponse(
            {"sales": sales},
            encoder=SalesEncoder
        )
    else:
        try:
            content = json.loads(request.body)
            automobile = AutomobileVO.objects.get(vin=content["automobile"])
            if automobile.sold == False:
                salesperson = Salesperson.objects.get(employee_id=content["salesperson"])
                customer = Customer.objects.get(id=content["customer"])
                sale = Sale.objects.create(
                    price=content["price"],
                    automobile=automobile,
                    salesperson=salesperson,
                    customer=customer
                )
                
                auto_url = f'http://inventory-api:8000/api/automobiles/{automobile}/'

                payload = {"sold": True}
                
                requests.put(auto_url, json=payload)

                return JsonResponse(
                    sale,
                    encoder=SalesEncoder,
                    safe=False,
                )
            else:
                response = JsonResponse(
                    {"message": "Vehicle is already sold"}
                )
                response.status_code = 400
                return response
        except AutomobileVO.DoesNotExist:
            return JsonResponse({"message": "Invalid Automobile VIN"}, status=400)
        except Salesperson.DoesNotExist:
            return JsonResponse({"message": "Invalid Employee ID"}, status=400)
        except Customer.DoesNotExist:
            return JsonResponse({"message": "Invalid Customer ID"}, status=400)
        
@require_http_methods(["DELETE", "PUT", "GET"])
def update_sales(request, id):
    if request.method == "GET": 
        try:
            sale = Sale.objects.get(id=id)
            return JsonResponse(
                sale,
                encoder=SalesEncoder,
                safe=False
            )
        except Sale.DoesNotExist:
            response = JsonResponse({"message": "Does not exist"})
            response.status_code = 404
            return response
    elif request.method == "DELETE":
        try:
            sale = Sale.objects.get(id=id)
            sale.delete()
            return JsonResponse(
                sale,
                encoder=SalesEncoder,
                safe=False,
            )
        except Sale.DoesNotExist:
            return JsonResponse({"message": "Does not exist"}, status=404)
    else: # PUT
        content = json.loads(request.body)
        try:
            sale = Sale.objects.get(id=id)
        except Sale.DoesNotExist:
            return JsonResponse(
                {"message": "Invalid Sales ID"},
                status=400,
            )
        Sale.objects.filter(id=id).update(**content)
        sale = Sale.objects.get(id=id)
        return JsonResponse(
            sale,
            encoder=SalesEncoder,
            safe=False,
        )
