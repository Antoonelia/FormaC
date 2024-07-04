from django.shortcuts import render, redirect
from .models import Producto
from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json

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

@csrf_exempt
def procesar_compra(request):
    if request.method == 'POST':
        try:
            carrito = json.loads(request.body)
            for item in carrito:
                producto_nombre = item['nombre']
                producto = Producto.objects.get(nombre=producto_nombre)
                if producto.stock < 1:
                    return HttpResponse(json.dumps({'error': f'No hay suficiente stock para {producto.nombre}.'}), status=400)

                producto.stock -= 1
                producto.save()

            return HttpResponse(json.dumps({'success': 'Compra procesada exitosamente.'}), status=200)
        except Producto.DoesNotExist:
            return HttpResponse(json.dumps({'error': 'Uno o más productos no fueron encontrados.'}), status=404)
        except Exception as e:
            return HttpResponse(json.dumps({'error': str(e)}), status=400)
    else:
        return HttpResponse(json.dumps({'error': 'Método no permitido'}), status=405)
