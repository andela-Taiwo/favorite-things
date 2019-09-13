from django.db.models.signals import post_save, pre_delete, pre_save
from django.dispatch import receiver
from django.db import models
from .models import Favorite, ModelChangeLogsModel


@receiver(pre_save, sender=Favorite)
def audit_log(sender, instance, **kwargs):
    try:
        table_pk = instance._meta.pk.name
        table_pk_value = instance.__dict__[table_pk]
        query_kwargs = dict()
        query_kwargs[table_pk] = table_pk_value
        prev_instance = sender.objects.get(**query_kwargs) # for dynamic column nam

    except models.ObjectDoesNotExist as e:
        return
    finally:
        query_sets = Favorite.objects.filter(ranking=instance.ranking, category__name=instance.category.name).order_by('-created_at')
        ranking = instance.ranking
        if query_sets.exists():
            for qs in query_sets:
                ranking += 1
                qs.ranking = ranking
                qs.save()

    fields = instance._meta.get_fields()
    fields = [field.name for field in fields]
    modified_fields = {field : getattr(instance, field) for field in fields if getattr(prev_instance, field) != getattr(instance, field)}
    category = modified_fields.pop('category') if modified_fields.get('category') is not None else None
    if category is not None:
        modified_fields['category'] = category.name
    ModelChangeLogsModel.objects.create(data=modified_fields, action='update', favorite=instance)

@receiver(post_save, sender=Favorite)
def increment_rank(sender, instance, **kwargs):
    pass
