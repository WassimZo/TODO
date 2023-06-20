from django.urls import path   
from . import views

urlpatterns = [
    path('register', views.UserRegister.as_view(), name='register'),
    path('login', views.UserLogin.as_view(), name='login'),
    path('logout', views.UserLogout.as_view(), name='logout'),
    path('user', views.UserView.as_view(), name='user'),
    path('tasks', views.TaskView.as_view(), name='tasks'),
    path('add_task', views.addTask.as_view(), name='add_task'),
    path('remove_task', views.removeTask.as_view(), name='remove_task'),
]