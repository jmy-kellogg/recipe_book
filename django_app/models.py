from django.db import models

class Unit(models.Model):
    SYSTEM_CHOICES = [
      ('imperial', 'Imperial'),
      ('metric', 'Metric'),
    ]
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=50, unique=True, blank=False, null=False)
    display_name = models.CharField(max_length=50)
    abbreviation = models.CharField(max_length=25)
    system = models.CharField(max_length=25, choices=SYSTEM_CHOICES, null=False, blank=False)

    def __str__(self):
      return self.name

class Ingredient(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=50, unique=True, blank=False, null=False)
    display_name = models.CharField(max_length=50)

    def __str__(self):
      return self.name

class Conversion(models.Model):
    id = models.AutoField(primary_key=True)
    ingredient = models.ForeignKey(Ingredient, on_delete=models.CASCADE)
    from_unit = models.ForeignKey(Unit, on_delete=models.CASCADE, related_name='from_unit')
    to_unit = models.ForeignKey(Unit, on_delete=models.CASCADE, related_name='to_unit')
    factor = models.DecimalField(max_digits=10, decimal_places=5)

    def __str__(self):
      return f"{self.from_unit} to {self.to_unit} conversion factor: {self.factor}"