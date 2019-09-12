from datetime import datetime, timedelta
from rest_framework.generics import get_object_or_404
from rest_framework.exceptions import APIException
from rest_framework import exceptions
from .models import (
    Favorite, Category
)
from django.db import (
    transaction,
    IntegrityError,
    models
)
from .serializers import (
    CreateFavoriteSerializer, FavoriteSerializer
)

def split_choices_int(choices):
    assert(isinstance(choices, list))
    include = []
    exclude = []
    for t in choices:
        try:
            t = int(t)
            if t < 0:
                exclude.append(-t)
            else:
                include.append(t)
        except:
            pass

    return include, exclude

def deserialize_favorite(*, action='create', data, serializer_class, favorite, requestor):
    ''' deserialize a favorite before creating or updating'''
    assert action == 'create' or action == 'update'
    serializer = serializer_class(
        instance=favorite,
        partial=(action == 'update'),
        data=data
    )
    serializer.is_valid(raise_exception=True)

    validated_data = serializer.validated_data
    if action == 'create':
        validated_data.pop('owner', None)
        validated_data['owner'] = requestor
    for name, value in validated_data.items():
        setattr(favorite, name, value)

    return favorite

def add_favorite(requestor, data):
    ''' Create a favorite '''
    assert(isinstance(data, list) or isinstance(data, dict))
    if isinstance(data, dict):
        data = [data]
    favorites = []
    for dt in data:
        favorite = Favorite()
        data_info = dt.copy()
        category = Category.objects.filter(name=data_info.get('category'))
        if category.exists():
            data_info['category'] = category[0].pk
        else:
            data_info['category'] = Category.objects.create(name=data_info.get('category')).pk
            
        favorite = deserialize_favorite(
            data=data_info,
            serializer_class=CreateFavoriteSerializer,
            favorite=favorite,
            requestor=requestor
        )
        with transaction.atomic():
            favorite.save()
            favorites.append(favorite)
    return favorites

def list_favorites(requestor, query_params):

    queryset = Favorite.objects.filter(owner=requestor).order_by('ranking')
    filter = {}
    if 'categories' in query_params:
        categories = query_params.getlist('categories')
        if len(categories) > 0:
            cat = categories[0]
            categories = cat.split(',')
        if isinstance(categories, list):
            filter['categories'] = categories
        elif isinstance(categories, int):
            filter['categories'] = [categories]
        else:
            raise APIException.NotAcceptable()

    if 'categories' in filter:
        favorites_categories = filter['categories']

        include, exclude = split_choices_int(favorites_categories)
        if len(include) != 0:
            queryset = queryset.filter(category__pk__in=include)

        if len(exclude) != 0:
            queryset = queryset.exclude(category__pk__in=exclude)
    return queryset

def retrieve_favorite(requestor, favorite_id):
    favorite = get_object_or_404(Favorite, id=favorite_id)

    if favorite.owner == requestor:
        return favorite
    else:
        raise APIException(detail='Dont have permission to perform this operation')

def update_favorite(requestor, data, favorite_id):
    assert(isinstance(data, dict))
    favorite = retrieve_favorite(requestor, favorite_id)
    if favorite:
 
        if data.get('category') is not None:
            category = Category.objects.filter(name=data.get('category'))
            if category.exists():
                data['category'] = category[0].pk
            else:
                data['category'] = Category.objects.create(name=data.get('category')).pk
        serializer = CreateFavoriteSerializer(instance=favorite, data=data, partial=True)
        serializer.is_valid(raise_exception=True)
        with transaction.atomic():
            serializer.save()
        return serializer.data

def list_favorites_categories():
    return Category.objects.all().order_by('-created_at')
