from django.apps import AppConfig


class DashboardConfig(AppConfig):

    default_auto_field = 'django.db.models.BigAutoField'

    name = 'dashboard'

    def ready(self):

        from auditlog.registry import auditlog

        from .models import Country
        from django.contrib.auth.models import User, Group

        auditlog.register(Country)
        auditlog.register(User)
        auditlog.register(Group)