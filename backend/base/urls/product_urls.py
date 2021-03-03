from django.urls import path
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
from base.views import product_views as views

urlpatterns = [
    
    path('', views.getProducts, name="products"),
    path('<str:pk>/',views.getProduct, name="product"),
    path('upload/',views.uploadImage, name="image-upload"),
    path('delete/<str:pk>/',views.deleteProduct, name="product-delete"),
    path('<str:pk>/reviews/',views.createProductReview, name="productreview-create"),
    path('create/<str:pk>/',views.createProduct, name="product-create"),
    path('update/<str:pk>/',views.updateProduct, name="product-update"),
]