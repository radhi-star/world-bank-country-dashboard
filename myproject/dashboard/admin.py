from django.contrib import admin
from simple_history.admin import SimpleHistoryAdmin

from .models import Country


@admin.register(Country)
class CountryAdmin(SimpleHistoryAdmin):

    list_display = (
        "country_name",
        "country_id",
        "capital_city",
        "name_length",
    )

    ordering = (
        "name_length",
        "country_name",
    )

    search_fields = (
        "^country_name",
        "^country_id",
        "^capital_city",
    )