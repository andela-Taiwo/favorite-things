# Generated by Django 2.2.4 on 2019-08-20 21:32

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('favorite_things', '0005_modelchangelogsmodel'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='modelchangelogsmodel',
            name='user_id',
        ),
        migrations.AddField(
            model_name='modelchangelogsmodel',
            name='favorite_id',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.PROTECT, to='favorite_things.Favorite'),
        ),
    ]
