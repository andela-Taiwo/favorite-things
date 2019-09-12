from django.shortcuts import render

# Create your views here.
from rest_framework import status
from rest_framework.decorators import api_view, APIView
from rest_framework.permissions import IsAdminUser, AllowAny
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import exceptions
from rest_framework import (
    viewsets,
    decorators
)
import favorite_things.services as favorite_services
from .response import FavoriteAPIResponse
from .serializers import (FavoriteSerializer, CategorySerializer)


class FavoriteViewSet(viewsets.ViewSet):

    permission_classes = [IsAuthenticated]

    def list(self, request, **kwargs):
        user_fvorites = favorite_services.list_favorites(requestor=request.user, query_params=request.query_params)
        return FavoriteAPIResponse(FavoriteSerializer(user_fvorites, many=True).data)

    def retrieve(self, request, **kwargs):
        favorite_id = kwargs.get('pk')
        user_favorite = favorite_services.retrieve_favorite(requestor=request.user, favorite_id=favorite_id)
        return FavoriteAPIResponse(FavoriteSerializer(user_favorite).data)

    def update(self, request, **kwargs):
        favorite_id = kwargs.get('pk')
        user_favorite = favorite_services.update_favorite(requestor=request.user, data=request.data, favorite_id=favorite_id)
        return FavoriteAPIResponse(user_favorite)

    def create(self, request, **kwargs):
        user_favorite = favorite_services.add_favorite(requestor=request.user, data=request.data)
        return FavoriteAPIResponse(FavoriteSerializer(user_favorite, many=True).data)

    @decorators.action(methods=['get'], detail=False, url_path='categories')
    def list_categories(self, request, **kwargs):
        categories = favorite_services.list_favorites_categories()
        return FavoriteAPIResponse(CategorySerializer(categories, many=True).data)
