# Generated by Django 2.2.4 on 2019-08-20 15:28

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('favorite_things', '0002_auto_20190818_0956'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='favorite',
            name='category',
        ),
        migrations.AddField(
            model_name='favorite',
            name='category',
            field=models.ManyToManyField(related_name='category_list', to='favorite_things.Category'),
        ),
    ]
