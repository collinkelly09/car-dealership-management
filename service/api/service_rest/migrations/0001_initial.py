# Generated by Django 5.0.7 on 2024-07-23 20:42

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = []

    operations = [
        migrations.CreateModel(
            name="AutomobileVO",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("vin", models.CharField(max_length=17, unique=True)),
                ("sold", models.BooleanField(default=False)),
            ],
        ),
        migrations.CreateModel(
            name="Technician",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("first_name", models.CharField(max_length=200)),
                ("last_name", models.CharField(max_length=200)),
                ("employee_id", models.CharField(max_length=50)),
            ],
        ),
        migrations.CreateModel(
            name="Appointment",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("date_time", models.DateTimeField()),
                ("reason", models.CharField(max_length=200)),
                (
                    "status",
                    models.CharField(default="CREATED", editable=False, max_length=20),
                ),
                ("vin", models.CharField(max_length=17)),
                ("service", models.CharField(max_length=20, null=True)),
                ("customer", models.CharField(max_length=50)),
                ("vip", models.CharField(default="No", editable=False, max_length=5)),
                (
                    "technician",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="appointments",
                        to="service_rest.technician",
                    ),
                ),
            ],
        ),
    ]