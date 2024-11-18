from django.db import models

class Unit(models.Model):
    SYSTEM_CHOICES = [
      ('imperial', 'Imperial'),
      ('metric', 'Metric'),
    ]

    name = models.CharField(max_length=50, unique=True, blank=False, null=False)
    display_name = models.CharField(max_length=50)
    abbreviation = models.CharField(max_length=25)
    system = models.CharField(max_length=25, choices=SYSTEM_CHOICES, null=False, blank=False)

    def __str__(self):
      return self.name
