
from django.db import models
from rest_framework import serializers
from .models import User, Favorite, Category, ModelChangeLogsModel


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
    data_log = serializers.SerializerMethodField(read_only=True)
    class Meta:
        model = Favorite
        fields = ('__all__')

    def get_data_log(self, obj):
        qs = obj.data_log.all().values('data', 'timestamp')
        return [log for log in qs.all()]

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

