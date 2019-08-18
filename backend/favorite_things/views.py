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
from .serializers import (CreateFavoriteSerializer, FavoriteSerializer)

class FavoriteViewSet(viewsets.ViewSet):

    permission_classes = [IsAuthenticated]

    def list(self, request, **kwargs):
        user_fvorites = favorite_services.list_favorites(requestor=request.user)
        return FavoriteAPIResponse(CreateFavoriteSerializer(user_fvorites, many=True).data)

    def retrieve(self, request, **kwargs):
        favorite_id = kwargs.get('pk')
        user_favorite = favorite_services.retrieve_favorite(requestor=request.user, favorite_id=favorite_id)
        return FavoriteAPIResponse(CreateFavoriteSerializer(user_favorite).data)

    def update(self, request, **kwargs):
        favorite_id = kwargs.get('pk')
        user_favorite = favorite_services.update_favorite(requestor=request.user, data=request.data, favorite_id=favorite_id)
        # import pdb; pdb.set_trace()
        return FavoriteAPIResponse(user_favorite)

    def create(self, request, **kwargs):
        # import pdb; pdb.set_trace()
        user_favorite = favorite_services.add_favorite(requestor=request.user, data=request.data)
        return FavoriteAPIResponse(CreateFavoriteSerializer(user_favorite, many=True).data)
        

