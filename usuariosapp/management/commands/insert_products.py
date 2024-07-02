import os
from django.core.management.base import BaseCommand
from usuariosapp.models import Producto

class Command(BaseCommand):
    help = 'Inserta 12 productos con imagen, nombre, precio y stock'

    def handle(self, *args, **kwargs):
        productos_data = [
            {
                'nombre': 'Wolverine',
                'precio': 12990,
                'imagen': 'assets/img/Wolverine.jpg',
                'stock': 10
            },
            {
                'nombre': 'Capitán América',
                'precio': 25990,
                'imagen': 'assets/img/capamerica.jpg',
                'stock': 15
            },
            {
                'nombre': 'Joker',
                'precio': 25990,
                'imagen': 'assets/img/joker.jpg',
                'stock': 8
            },
            {
                'nombre': 'Justice League',
                'precio': 18990,
                'imagen': 'assets/img/justiceleague.jpg',
                'stock': 20
            },
            {
                'nombre': 'Hulk',
                'precio': 31990,
                'imagen': 'assets/img/hulk.jpg',
                'stock': 5
            },
            {
                'nombre': 'Secret Avengers',
                'precio': 22990,
                'imagen': 'assets/img/secretavengers.jpg',
                'stock': 12
            },
            {
                'nombre': 'Star Wars',
                'precio': 28990,
                'imagen': 'assets/img/starwars.jpg',
                'stock': 18
            },
            {
                'nombre': 'Xmen',
                'precio': 20990,
                'imagen': 'assets/img/xmen.jpg',
                'stock': 25
            },
            {
                'nombre': 'Flash',
                'precio': 15990,
                'imagen': 'assets/img/flash.jpeg',
                'stock': 30
            },
            {
                'nombre': 'The Avengers',
                'precio': 20990,
                'imagen': 'assets/img/avengers.jpg',
                'stock': 7
            },
            {
                'nombre': 'Spiderman',
                'precio': 35990,
                'imagen': 'assets/img/spiderman.jpg',
                'stock': 14
            },
            {
                'nombre': 'Superman',
                'precio': 20990,
                'imagen': 'assets/img/superman.jpg',
                'stock': 22
            },
        ]

        # Crea los productos en la base de datos
        productos_objects = []
        for producto_data in productos_data:
            producto = Producto(
                nombre=producto_data['nombre'],
                precio=producto_data['precio'],
                stock=producto_data['stock']
            )
            producto.imagen = os.path.join('assets', 'img', os.path.basename(producto_data['imagen']))
            productos_objects.append(producto)

        Producto.objects.bulk_create(productos_objects)

        self.stdout.write(self.style.SUCCESS('Se han insertado 12 productos correctamente'))
