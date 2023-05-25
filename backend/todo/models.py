from django.db import models
from django.contrib.auth.models import User

class Tasks(models.Model):
    description = models.CharField(max_length=60)
    done = models.BooleanField(default=False)
    username = models.ForeignKey(User, on_delete=models.CASCADE)
    