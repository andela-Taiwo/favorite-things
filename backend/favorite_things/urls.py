from django.conf.urls import include, url
from django.urls import path, re_path
from rest_framework.routers import DefaultRouter
from .views import (
    FavoriteViewSet
    )


router = DefaultRouter()
router.register(r'favorite', FavoriteViewSet, base_name='apiv1_favorite')
urlpatterns = []
urlpatterns += router.urls
