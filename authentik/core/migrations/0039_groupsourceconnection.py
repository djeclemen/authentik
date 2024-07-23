# Generated by Django 5.0.7 on 2024-07-23 12:48

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("authentik_core", "0038_source_groups_list_property_mappings_and_more"),
    ]

    operations = [
        migrations.CreateModel(
            name="GroupSourceConnection",
            fields=[
                (
                    "id",
                    models.AutoField(
                        auto_created=True, primary_key=True, serialize=False, verbose_name="ID"
                    ),
                ),
                ("created", models.DateTimeField(auto_now_add=True)),
                ("last_updated", models.DateTimeField(auto_now=True)),
                (
                    "group",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE, to="authentik_core.group"
                    ),
                ),
                (
                    "source",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE, to="authentik_core.source"
                    ),
                ),
            ],
            options={
                "unique_together": {("group", "source")},
            },
        ),
    ]
