from django.db import models

class Tododb (models.Model):
     task = models.CharField(max_length=500)
     completed = models.BooleanField(default=False)
     time_created = models.DateField(auto_now_add=True)
     time_updated = models.DateField(auto_now=True)


     def __str__(self):
          return self.task