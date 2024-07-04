from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('cuenta/', views.cuenta, name='cuenta'),
    path('catalogo/', views.catalogo, name='catalogo'),
    path('agregar_al_carrito/<int:producto_id>/', views.agregar_al_carrito, name='agregar_al_carrito'),
    path('ver_carrito/', views.ver_carrito, name='ver_carrito'),
    path('procesar_compra/', views.procesar_compra, name='procesar_compra'),
]
