from celery import shared_task
from django.core.management import call_command


@shared_task
def update_countries():

    call_command('load_countries')

    return "Countries Updated"