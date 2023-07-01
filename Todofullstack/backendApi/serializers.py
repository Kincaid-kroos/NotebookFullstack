from rest_framework import serializers
from .models import Tododb

class Tododbserializer(serializers.ModelSerializer):
    class Meta:
        model = Tododb
        fields = ['id','task','completed']