from django.contrib.auth.models import User
from rest_framework import serializers

from .models import Country


class CountrySerializer(serializers.ModelSerializer):

    class Meta:
        model = Country
        fields = "__all__"


class RegisterSerializer(serializers.ModelSerializer):

    password = serializers.CharField(
        write_only=True
    )

    class Meta:
        model = User
        fields = (
            "username",
            "email",
            "password"
        )

    def validate_username(self, value):
        if User.objects.filter(username__iexact=value).exists():
            raise serializers.ValidationError(
                "A user with that username already exists."
            )
        return value.lower()

    def validate_email(self, value):
        if User.objects.filter(email__iexact=value).exists():
            raise serializers.ValidationError(
                "A user with that email already exists."
            )
        return value

    def validate_password(self, value):
        if len(value) < 8:
            raise serializers.ValidationError(
                "Password must be at least 8 characters."
            )
        return value

    def create(self, validated_data):

        user = User.objects.create_user(
            username=validated_data["username"],
            email=validated_data["email"],
            password=validated_data["password"]
        )

        return user

