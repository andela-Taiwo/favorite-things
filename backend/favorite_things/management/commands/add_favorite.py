from django.core.management.base import BaseCommand, CommandError
from  favorite_things.models import (User, Category, Favorite)



class Command(BaseCommand):


    def handle(self, *args, **options):
        
        favorite = Favorite.objects.get(id=1)
        favorite.delete()
        self.stdout.write('Successfully deleted favorite')
