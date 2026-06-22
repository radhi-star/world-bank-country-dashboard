from django.db import models
from simple_history.models import HistoricalRecords


class Country(models.Model):

    country_id = models.CharField(
        max_length=10,
        primary_key=True
    )

    country_name = models.CharField(
        max_length=100
    )

    name_length = models.IntegerField()

    capital_city = models.CharField(
        max_length=100
    )

    latitude = models.CharField(
        max_length=50
    )

    longitude = models.CharField(
        max_length=50
    )

    history = HistoricalRecords()

    def __str__(self):
        return self.country_name