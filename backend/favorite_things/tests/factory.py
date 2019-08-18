from favorite_things.models import User

def _create_user(self, email='johndoe@gmail.com', password='tester123'):
    user = User.objects.create_user(
        email=email, password=password,
        is_active=True)
    user.save()
    return user