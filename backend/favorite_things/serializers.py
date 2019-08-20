
from django.db import models
from rest_framework import serializers
from .models import User, Favorite, Category


class CategorySerializer(serializers.ModelSerializer):

    class Meta:
        model = Category
        fields = ('__all__')


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = [
            'email',
            'last_name',
            'first_name'
        ]


class FavoriteSerializer(serializers.ModelSerializer):
    owner = UserSerializer(read_only=True)
    category = CategorySerializer(read_only=True)
    class Meta:
        model = Favorite
        fields = ('__all__')


class CreateFavoriteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Favorite
        fields = ('__all__')
        extra_kwargs = {
            "id": {
                "read_only": False,
                "required": False,
            },
        }
