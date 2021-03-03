from django.urls import path
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
from base.views import order_views as views 

urlpatterns = [
   path('add/',views.addOrderItems, name='orders-add'),
   path('myorders/',views.getMyOrders,name='getmy-orders'),
   path('',views.getOrders,name='get-orders'),
   path('<str:pk>/deliver/',views.updateOrderToDelivered, name='order-delivered'),
   path('<str:pk>/',views.getOrderById, name='user-order'),
   path('<str:pk>/pay/',views.updateOrderToPaid, name='pay'),
]