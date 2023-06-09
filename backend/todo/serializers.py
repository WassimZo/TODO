from django.forms import ValidationError
from rest_framework import serializers
from .models import Tasks
from django.contrib.auth import get_user_model, authenticate

UserModel = get_user_model()

class TaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tasks
        fields = ('description', 'done', 'id')

    def create(self, clean_data):
        task_obj = Tasks.objects.create(description=clean_data['description'], username=clean_data['user'])
        task_obj.save()
        return task_obj


class UserRegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserModel
        fields  = '__all__'
    def create(self, clean_data):
        user_obj = UserModel.objects.create_user(username=clean_data['username'], password=clean_data['password'])
        user_obj.save()
        return user_obj

class UserLoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()
    ##
    def check_user(self, clean_data):
        user = authenticate(username=clean_data['username'], password=clean_data['password'])
        if not user:
            raise ValidationError('user not found')
        return user

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserModel
        fields = ('username', 'password')
        