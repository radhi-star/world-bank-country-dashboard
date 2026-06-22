from django.contrib import admin
from django.urls import path

from dashboard.views import (
    RegisterView,
    country_list,
    country_detail,
    country_api,
    country_detail_api,
)

from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)


urlpatterns = [

    path(
        'admin/',
        admin.site.urls
    ),

    path(
        "api/register/",
        RegisterView.as_view(),
        name="register"
    ),

    # HTML Dashboard
    path(
        'countries/',
        country_list,
        name='countries'
    ),


    # HTML Detail
    path(
        'country/<str:name>/',
        country_detail,
        name='country_detail'
    ),


    # JWT Login
    path(
        'api/token/',
        TokenObtainPairView.as_view(),
        name='token_obtain_pair'
    ),


    # Refresh Token
    path(
        'api/token/refresh/',
        TokenRefreshView.as_view(),
        name='token_refresh'
    ),


    # Protected APIs
    path(
        'api/countries/',
        country_api,
        name='country_api'
    ),


    path(
        'api/country/<str:name>/',
        country_detail_api,
        name='country_detail_api'
    ),

]