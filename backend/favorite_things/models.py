
# Create your models here.
from django.db import models
from django.contrib.auth.models import AbstractUser, BaseUserManager
from django.contrib.postgres.fields import JSONField
# from django.db.models import constraints


class UserManager(BaseUserManager):
    use_in_migrations = True

    def _create_user(self, **fields):
        """
        Create and save a user with the given username, email, and password.
        """
        email = fields.pop('email')
        password = fields.get('password')
        if not email:
            raise ValueError("Email address is required")
        email = self.normalize_email(email)
        user = self.model(email=email, **fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_user(self, **fields):
        fields.setdefault('is_staff', False)
        fields.setdefault('is_superuser', False)

        return self._create_user(**fields)

    def create_superuser(self, **fields):
        fields.setdefault('is_staff', True)
        fields.setdefault('is_superuser', True)

        if fields.get('is_staff') is not True:
            raise ValueError('Superuser must have is_staff=True.')
        if fields.get('is_superuser') is not True:
            raise ValueError('Superuser must have is_superuser=True.')

        return self._create_user(**fields)


class User(AbstractUser):
    username = None
    email = models.EmailField(max_length=50, unique=True)
    phone_number = models.CharField(max_length=50, blank=True, null=True)
    last_modified = models.DateTimeField(auto_now=True, editable=False)
    password = models.CharField(max_length=128, blank=True, null=True)
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['last_name', 'first_name']
    objects = UserManager()
    
    class Meta:
        verbose_name_plural = "All Users"


class Category(models.Model):
    name = models.CharField(max_length=250, unique=True)
    category_description = models.CharField(max_length=250)
    created_at = models.DateField(auto_now_add=True, editable=False)
    last_modified = models.DateField(auto_now=True, editable=False)
    class Meta:
        verbose_name_plural = 'Categories'

    def __str__(self):
        return "%s" % self.name


class Favorite(models.Model):
    title = models.CharField(max_length=250)
    description = models.TextField(blank=True, null=True)
    ranking = models.PositiveIntegerField()
    owner = models.ForeignKey(User, related_name='user_favorite', on_delete=models.PROTECT, blank=True, null=True)
    category = models.ForeignKey(related_name='favorite', to=Category, on_delete=models.PROTECT, blank=True, null=True)
    created_at = models.DateField(auto_now_add=True, editable=False)
    last_modified = models.DateField(auto_now=True, editable=False)

    class Meta:
        verbose_name_plural = 'Favorites'
        ordering = ['-created_at']
        # unique_together = ['ranking','category']
        # constraints = [
        #     models.UniqueConstraint(fields=['ranking','category'], name='unique_category_ranking')
        # ]

    def __str__(self):
        return "%s (%s)" % (
            self.title, self.category.name
        )

    def update_category_ranking(self, category, owner):
        qs = Favorite.objects.filter(category=category, owner=owner)
        for item in qs:
            item.ranking += 1
            item.save()

    # def validate_unique(self, exclude=None):
    #     qs = Favorite.objects.filter(category=self.category, ranking=self.ranking, owner=self.owner)
    #     if self.pk is None:   
    #         if qs.exists():
    #             ranking = qs.first().ranking + 1
    #             qs.update(ranking=ranking)

    # def save(self, *args, **kwargs):
    #     while True:
    #         qs = Favorite.objects.filter(category__name=self.category.name, ranking=self.ranking, owner=self.owner)
    #         if qs.exists():
    #             self.validate_unique()
    #     super(Favorite, self).save(*args, **kwargs)


class ModelChangeLogsModel(models.Model):
    favorite = models.ForeignKey(Favorite, related_name="data_log", null=True, blank=True, db_index=True, on_delete=models.PROTECT) 
    data = JSONField(null=False, blank=True)
    action = models.CharField(max_length=16, null=False, blank=True)  # saved or deleted
    timestamp = models.DateTimeField(auto_now_add=True, editable=False, null=False, blank=True)

    class Meta:
        app_label = "favorite_things"
        db_table = "model_change_logs"
        ordering = ['-timestamp']

    # def __unicode__(self):
    #     return '%d: %s' % (self.data, self.timestamp)
