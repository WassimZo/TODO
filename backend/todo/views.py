from django.contrib.auth import login, logout
from django.contrib.auth.models import User
from rest_framework.authentication import SessionAuthentication
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import viewsets, permissions, status
from .serializers import TaskSerializer, UserRegisterSerializer, UserLoginSerializer, UserSerializer
from .validations import custom_validation, validate_password, validate_username
from .models import Tasks
from django.views.decorators.csrf import ensure_csrf_cookie, csrf_protect
from django.utils.decorators import method_decorator


@method_decorator(csrf_protect, name='dispatch')
class CheckAuthenticated(APIView):
    def get(self, request, format=None):
        isAuthenticated = User.is_authenticated

        if isAuthenticated: 
            return Response({ 'isAuthenticated': 'success'})
        else: 
            return Response({ 'isAuthenticated': 'error'})


@method_decorator(csrf_protect, name='dispatch')
class UserRegister(APIView):
    permission_classes = (permissions.AllowAny,)
    def post(self, request):
        clean_data = custom_validation(request.data)
        serializer = UserRegisterSerializer(data=clean_data)
        if serializer.is_valid(raise_exception=True):
            user = serializer.create(clean_data)
            if user:
                return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(status=status.HTTP_400_BAD_REQUEST)


@method_decorator(csrf_protect, name='dispatch')
class UserLogin(APIView):
    permission_classes = (permissions.AllowAny,)
    authentication_classes = (SessionAuthentication,)

    def post(self, request):
        data = request.data
        assert validate_username(data)
        assert validate_password(data)
        serializer = UserLoginSerializer(data=data)
        if serializer.is_valid(raise_exception=True):
            user = serializer.check_user(data)
            login(request, user)
            return Response(serializer.data, status=status.HTTP_200_OK)


class UserLogout(APIView):
    def post(self, request):
        logout(request)
        return Response(status=status.HTTP_200_OK)
    

@method_decorator(ensure_csrf_cookie, name='dispatch')
class getCSRFToken(APIView):
    permission_classes = (permissions.AllowAny,)

    def get(self, request, format=None):
        return Response({ 'success': 'CSRF cookie set'})

class UserView(APIView):
    permission_classes = (permissions.IsAuthenticated,)
    authentication_classes = (SessionAuthentication,)

    def get(self, request):
        serializer = UserSerializer(request.user)
        return Response({'user': serializer.data}, status=status.HTTP_200_OK)

class TaskView(APIView):
    permission_classes = (permissions.IsAuthenticated,)
    authentication_classes = (SessionAuthentication,)
    
    def get(self, request):
        serializer = UserSerializer(request.user)
        user_id = User.objects.get(username=serializer.data['username'])
        queryset = Tasks.objects.filter(username=user_id)
        print(queryset)
        result = {}
        if queryset:
           counter = 1
           for task in queryset:
              task_serializers = TaskSerializer(task)
              result[f'task{counter}'] = task_serializers.data
              counter += 1
           return Response(result, status=status.HTTP_200_OK)
        else :
            return Response({'no tasks found'}, status=status.HTTP_200_OK)

