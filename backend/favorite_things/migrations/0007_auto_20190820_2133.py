# Generated by Django 2.2.4 on 2019-08-20 21:33

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('favorite_things', '0006_auto_20190820_2132'),
    ]

    operations = [
        migrations.AlterField(
            model_name='modelchangelogsmodel',
            name='favorite_id',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.PROTECT, related_name='data_log', to='favorite_things.Favorite'),
        ),
    ]
