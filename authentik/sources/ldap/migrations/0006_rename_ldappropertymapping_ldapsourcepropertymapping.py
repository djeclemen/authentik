# Generated by Django 5.0.7 on 2024-07-24 12:15

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ("authentik_core", "0038_source_group_matching_mode_alter_group_name_and_more"),
        ("authentik_sources_ldap", "0005_remove_ldappropertymapping_object_field_and_more"),
    ]

    operations = [
        migrations.RenameModel(
            old_name="LDAPPropertyMapping",
            new_name="LDAPSourcePropertyMapping",
        ),
    ]
