from django.urls import path
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
from base.views import user_views as views 

urlpatterns = [ 
   
    path('login/', views.MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('profile/', views.getUserProfile, name="user-profile"),
    path('profile/update/', views.updateUserProfile, name="user-profile"),
    path('', views.getUsers, name="users"),
    path('register/', views.registerUser,name="user-register"),
    path('<str:pk>/',views.getUserbyId,name="user"),
    path('update/<str:pk>/',views.updateUser,name="user-update"),
    path('delete/<str:pk>/',views.deleteUser,name="user-delete"),
]