from django.shortcuts import render, get_object_or_404
from django.core.paginator import Paginator

from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from .models import Country

from django.contrib.auth.models import User
from .serializers import (
    CountrySerializer,
    RegisterSerializer
)

from rest_framework import generics
from rest_framework.permissions import AllowAny

class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = RegisterSerializer

    permission_classes = [AllowAny]
    authentication_classes = []
# HTML Dashboard
def country_list(request):

    search = request.GET.get('search', '')

    countries = Country.objects.all()

    if search:
        countries = countries.filter(
            country_name__istartswith=search
        )

    countries = countries.order_by(
        'name_length',
        'country_name'
    )

    paginator = Paginator(countries, 10)

    page_number = request.GET.get('page')

    countries = paginator.get_page(page_number)

    return render(
        request,
        'countries.html',
        {
            'countries': countries,
            'search': search,
        }
    )


# HTML Detail Page
def country_detail(request, name):

    country = get_object_or_404(
        Country,
        country_name__iexact=name.replace("-", " ")
    )

    return render(
        request,
        'country_detail.html',
        {
            'country': country
        }
    )


# API - All Countries
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def country_api(request):

    search = request.GET.get('search', '')

    countries = Country.objects.all()

    if search:
        countries = countries.filter(
            country_name__icontains=search
        )

    countries = countries.order_by(
        'name_length',
        'country_name'
    )

    paginator = Paginator(
        countries,
        10
    )

    page_number = request.GET.get(
        'page',
        1
    )

    page_obj = paginator.get_page(
        page_number
    )

    serializer = CountrySerializer(
        page_obj,
        many=True
    )

    return Response({
        "results": serializer.data,
        "total_pages": paginator.num_pages,
        "current_page": page_obj.number
    })


# API - Single Country
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def country_detail_api(request, name):

    try:

        country = Country.objects.get(
            country_name__iexact=name
        )

        serializer = CountrySerializer(
            country
        )

        return Response(
            serializer.data
        )

    except Country.DoesNotExist:

        return Response(
            {
                "error":
                "Country not found"
            },
            status=404
        )