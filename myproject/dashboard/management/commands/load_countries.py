from django.core.management.base import BaseCommand
from dashboard.models import Country
import requests


class Command(BaseCommand):
    help = "Load countries from World Bank API"

    def handle(self, *args, **kwargs):

        url = "https://api.worldbank.org/v2/country?format=json&per_page=500"

        response = requests.get(url)
        data = response.json()

        for country in data[1]:

            Country.objects.update_or_create(
                country_id=country["id"],
                defaults={
                    "country_name": country["name"],
                    "name_length": len(country["name"]),
                    "capital_city": country["capitalCity"],
                    "latitude": country["latitude"],
                    "longitude": country["longitude"]
                }
            )

        self.stdout.write(
            self.style.SUCCESS("Countries loaded successfully")
        )