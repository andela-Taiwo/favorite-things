from django.db.models.signals import post_save, pre_delete, pre_save
from django.dispatch import receiver
from .models import Favorite, ModelChangeLogsModel


def get_modified_fields(existing_data, new_data):
    existing_data_fields = set(existing_data.keys())
    new_data_fields = set(new_data.keys())
    intersect_keys = existing_data_fields.intersection(new_data_fields)
    # added = existing_data_fields - new_data_fields
    modified = {key : (existing_data[key], new_data[key]) for key in intersect_keys if existing_data[key] != new_data[key]}
    return modified

@receiver(pre_save, sender=Favorite)
def audit_log(sender, instance, **kwargs):
    # code to execute before every model save
    print("Inside signal code")
    try:
        # import pdb; pdb.set_trace()
        table_pk = instance._meta.pk.name
        table_pk_value = instance.__dict__[table_pk]
        query_kwargs = dict()
        query_kwargs[table_pk] = table_pk_value
        prev_instance = sender.objects.get(**query_kwargs) # for dynamic column nam
    except ObjectDoesNotExist as e:
        # this instance is being created and not updated. ignore and return
        # logging.getLogger("info_logger").info("Signals: creating new instance of "+str(sender))
        return
    modified_field = get_modified_fields(prev_instance, instance)
    ModelChangeLogsModel.objects.create(data=modified_field, action='update', user_id=instance.user.id)

