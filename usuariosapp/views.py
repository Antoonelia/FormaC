from django.shortcuts import render, redirect
from .models import Producto

def index(request):
    return render(request, 'index.html')

def cuenta(request):
    return render(request, 'cuenta.html')

def catalogo(request):
    productos = Producto.objects.all()
    return render(request, 'catalogo.html', {'productos': productos})


def agregar_al_carrito(request, producto_id):
    producto = Producto.objects.get(pk=producto_id)

    return redirect('catalogo')

def ver_carrito(request):
    return render(request, 'carrito.html')
