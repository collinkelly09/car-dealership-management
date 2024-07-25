import json
from django.http import JsonResponse
from .encoders import ServicesEncoder, TechnicianEncoder, AppointmentEncoder
from .models import Services, Technician, Appointment, AutomobileVO
from django.views.decorators.http import require_http_methods

# Create your views here.
@require_http_methods(['GET', 'POST'])
def api_list_technicians(request):
    if request.method == 'GET':
        techs = Technician.objects.all()
        return JsonResponse(
            {'technicians': techs},
            encoder=TechnicianEncoder,
        )
    else:
        try:
            content = json.loads(request.body)

            tech = Technician.objects.create(**content)
            return JsonResponse(
                tech,
                encoder=TechnicianEncoder,
                safe=False,
            )
        except:
            response = JsonResponse(
                {'message': 'Could not create a technician'}
            )
            response.status_code = 400
            return response

@require_http_methods(['DELETE'])
def api_show_tech(request, pk):
    if request.method == 'DELETE':
        try:
            count, _ = Technician.objects.get(id=pk).delete()
            return JsonResponse( {'deleted': count > 0})
        except Technician.DoesNotExist:
            response = JsonResponse({"message": "Does not exist"})
            response.status_code = 404
            return response

@require_http_methods(['GET', 'POST'])
def api_list_appointments(request):
    if request.method == 'GET':
        appointments = Appointment.objects.all()
        return JsonResponse(
            {'appointments': appointments},
            encoder=AppointmentEncoder,
        )
    else: # POST
        try:
            content = json.loads(request.body)

            try:
                tech = Technician.objects.get(id=content['technician'])
                content['technician'] = tech
            except Technician.DoesNotExist:
                return JsonResponse(
                    {'message': 'Invalid Technician ID'},
                    status=404,
                )

            appointment = Appointment.objects.create(**content)
            try:
                autos = AutomobileVO.objects.all()
                for auto in autos:
                    if appointment.vin == auto.vin and auto.sold == True:
                        appointment.vip = "Yes"
                        appointment.save()
            except AutomobileVO.DoesNotExist:
                pass
            return JsonResponse(
                appointment,
                encoder=AppointmentEncoder,
                safe=False,
            )
        except:
            response = JsonResponse(
                {"message": "Could not create appointment"}
            )
            response.status_code = 400
            return response


@require_http_methods(["DELETE"])
def api_show_appointments(request, pk):
    try:
        if request.method == 'DELETE':
            count, _ = Appointment.objects.get(id=pk).delete()
            return JsonResponse(
                {'deleted': count > 0}
            )
    except:
        response = JsonResponse(
            {"message": "Does not exist"}
        )
        response.status_code = 404
        return response



@require_http_methods(["PUT"])
def api_cancel_appointment(request, pk):
    try:
        appointment = Appointment.objects.get(id=pk)
        appointment.status = 'CANCELED'
        appointment.save()

        return JsonResponse(
            appointment,
            encoder=AppointmentEncoder,
            safe=False,
        )
    except:
        response = JsonResponse(
            {"message": "Does not exist"}
        )
        response.status_code = 404
        return response

@require_http_methods(["PUT"])
def api_finish_appointment(request, pk):
    try:
        appointment = Appointment.objects.get(id=pk)
        appointment.status = 'FINISHED'
        appointment.save()

        return JsonResponse(
            appointment,
            encoder=AppointmentEncoder,
            safe=False,
        )
    except:
        response = JsonResponse(
            {"message": "Does not exist"}
        )
        response.status_code = 404
        return response

@require_http_methods(["GET", "POST"])
def api_list_services(request):
    if request.method == "GET":
        services = Services.objects.all()
        return JsonResponse(
            {"services": services},
            encoder=ServicesEncoder
        )
    else:
        try:
            content = json.loads(request.body)
            service = Services.objects.create(**content)
            return JsonResponse(
                service,
                encoder=ServicesEncoder,
                safe=False
            )
        except:
            response = JsonResponse(
                {"message": "Could not create service"}
            )
            response.status_code = 400
            return response
