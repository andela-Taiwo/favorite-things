from django.apps import AppConfig


class FavoriteThingsConfig(AppConfig):
    name = 'favorite_things'

    def ready(self):
            # everytime server restarts
        import favorite_things.signals
