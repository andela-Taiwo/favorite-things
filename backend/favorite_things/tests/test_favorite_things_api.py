import os
import pytz
from datetime import datetime
from django.urls.exceptions import NoReverseMatch
from rest_framework.reverse import reverse
from rest_framework.test import APITestCase
from favorite_things.models import Favorite, Category, User
from .factory import _create_user
# from users.tests import factory as user_factory


class TestFavoriteAPI(APITestCase):
   
    def setUp(self):
        self.invalid_token = 'Eyhbfhebjwkfbhjbuw3hiuhufhnffjjfjkhjfghgbsvvsk74576b873875t378568'
        self.user = _create_user(self,email='testuser@gmail.com', password='v3yhdd')
        self.category = Category.objects.create(name='Car')
        self.favorite = Favorite.objects.create(
            owner=self.user, category=self.category, ranking=1, title='Lamborghini'
        )
        self.favorite.save()   

    def _login_user(self, email, password):
        response = self.client.post(
            reverse(
                'apiv1_login'
            ),
            data = {
                'email': email,
                'password': password
            }
        )

        return response.data

    def _create_favorite(self, data, token):
        response = self.client.post(
            reverse(
                'apiv1_favorite-list'
            ),
            data=data,
            HTTP_AUTHORIZATION='Bearer {}'.format(token),
        )

    def test_retrieve_a_favorite(self):
        token = self._login_user(email='testuser@gmail.com', password='v3yhdd')
        response = self.client.get(
            reverse(
                'apiv1_favorite-detail',args=[self.favorite.pk]
            ),
            data={
            },
            HTTP_AUTHORIZATION='Bearer {}'.format(token['access']),
        )
        response_data = response.data['payload']
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response_data['title'], self.favorite.title)
        self.assertEqual(response_data['category']['name'], self.favorite.category.name)

    def test_list_favorites(self):
        token = self._login_user(email='testuser@gmail.com', password='v3yhdd')
        data_info = {
            'title': 'Sushi',
            'category': 'food',
            'ranking': 2
        }
        self._create_favorite(data=data_info, token=token['access'])
        response = self.client.get(
            reverse(
                'apiv1_favorite-list'
            ),
            data={
            },
            HTTP_AUTHORIZATION='Bearer {}'.format(token['access']),
        )
        response_data = response.data['payload'][1]
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.data['payload']), 2)
        self.assertEqual(response_data['title'], 'Sushi')
        
    def test_add_new_favorite(self):
        token = self._login_user(email='testuser@gmail.com', password='v3yhdd')
        data_info = {
            'title': 'Iphone',
            'category': 'SmartPhone',
            'ranking': 3
        }
        response = self.client.post(
            reverse(
                'apiv1_favorite-list'
            ),
            data=data_info,
            HTTP_AUTHORIZATION='Bearer {}'.format(token['access']),
        )
        self.assertEqual(response.status_code, 200)

    def test_update_favorite(self):
        token = self._login_user(email='testuser@gmail.com', password='v3yhdd')
        response = self.client.put(
            reverse(
                'apiv1_favorite-detail',args=[self.favorite.pk]
            ),
            data={
                'title': "new favorite title"
            },
            HTTP_AUTHORIZATION='Bearer {}'.format(token['access']),
        )
        response_data = response.data['payload']
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response_data['title'], 'new favorite title')
        self.assertEqual(response_data['category']['name'], self.favorite.category.name)
    
    def test_ranking_reordered_when_new_favorite_with_same_rank_added(self):
        token = self._login_user(email='testuser@gmail.com', password='v3yhdd')
        data_info = {
            'title': 'Tesla',
            'category': 'Car',
            'ranking': 1
        }
        response = self.client.post(
            reverse(
                'apiv1_favorite-list'
            ),
            data=data_info,
            HTTP_AUTHORIZATION='Bearer {}'.format(token['access']),
        )
        updated_favorite = Favorite.objects.get(id=self.favorite.id)
        response_data = response.data['payload'][0]
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response_data['ranking'], 1)
        self.assertEqual(updated_favorite.ranking, 2)

