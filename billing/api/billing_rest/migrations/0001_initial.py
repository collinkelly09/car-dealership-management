# Generated by Django 5.0.7 on 2024-07-23 19:17

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = []

    operations = [
        migrations.CreateModel(
            name="AppointmentVO",
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
                ("status", models.CharField(max_length=20)),
                ("service", models.CharField(max_length=20)),
                ("vip", models.CharField(default="No", editable=False, max_length=5)),
            ],
        ),
        migrations.CreateModel(
            name="Receipt",
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
            ],
        ),
        migrations.CreateModel(
            name="SaleVO",
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
                ("salesperson", models.CharField(max_length=200)),
                ("price", models.PositiveIntegerField()),
                ("import_href", models.CharField(max_length=200, unique=True)),
            ],
        ),
    ]
