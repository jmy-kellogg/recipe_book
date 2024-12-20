import uuid
from django.db import models

class Unit(models.Model):
    SYSTEM_CHOICES = [
      ('imperial', 'Imperial'),
      ('metric', 'Metric'),
    ]
    name = models.CharField(max_length=50, primary_key=True, unique=True, blank=False, null=False)
    display_name = models.CharField(max_length=50)
    abbreviation = models.CharField(max_length=25)
    system = models.CharField(max_length=25, choices=SYSTEM_CHOICES, null=False, blank=False)

    def __str__(self):
      return self.name

class Ingredient(models.Model):
    name = models.CharField(max_length=50, primary_key=True, unique=True, blank=False, null=False)
    display_name = models.CharField(max_length=50)

    def __str__(self):
      return self.name

class Conversion(models.Model):
    ingredient = models.ForeignKey(Ingredient, on_delete=models.CASCADE, related_name='ingredient')
    from_unit = models.ForeignKey(Unit, on_delete=models.CASCADE, related_name='from_unit')
    to_unit = models.ForeignKey(Unit, on_delete=models.CASCADE, related_name='to_unit')
    factor = models.DecimalField(max_digits=10, decimal_places=5)

    def __str__(self):
      return f"conversion factor: {self.factor}"
    
class Recipe(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=True)
    name = models.CharField(max_length=100, unique=True, blank=False, null=False)
    title = models.CharField(max_length=100, blank=False, null=False)
    description = models.TextField(blank=True, null=True)
    image = models.ImageField(upload_to='images/', blank=True, null=True)
    instructions = models.TextField(blank=True, null=True)
    tips = models.TextField(blank=True, null=True)
    servings = models.IntegerField(blank=True, null=True)
    prep_time = models.DurationField(blank=True, null=True)
    cook_time = models.DurationField(blank=True, null=True)
    total_time = models.DurationField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    ingredients = models.ManyToManyField(Ingredient, through='RecipeIngredient')

    def __str__(self):
      return self.name

class RecipeIngredient(models.Model):
    recipe = models.ForeignKey(Recipe, on_delete=models.CASCADE)
    ingredient = models.ForeignKey(Ingredient, on_delete=models.CASCADE)
    amount = models.DecimalField(max_digits=10, decimal_places=5)
    unit = models.ForeignKey(Unit, on_delete=models.CASCADE)
    optional = models.BooleanField(default=False)

    def __str__(self):
      return f"{self.amount} {self.unit.abbreviation} {self.ingredient.name}"

