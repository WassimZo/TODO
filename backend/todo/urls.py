from django.urls import path   
from . import views

urlpatterns = [
    path('register', views.UserRegister.as_view(), name='register'),
    path('login', views.UserLogin.as_view(), name='login'),
    path('logout', views.UserLogout.as_view(), name='logout'),
    path('user', views.UserView.as_view(), name='user'),
    path('tasks', views.TaskView.as_view(), name='tasks'),
    path('csrf', views.getCSRFToken.as_view(), name='csrf')
]