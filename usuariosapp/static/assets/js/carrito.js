document.addEventListener('DOMContentLoaded', () => {
    actualizarCarritoUI();
});

function agregarAlCarrito(nombre, precio) {
    precio = parseFloat(precio);
    const producto = { nombre, precio };
    let carrito = carritoLS();
    carrito.push(producto);
    localStorage.setItem('carrito', JSON.stringify(carrito));
    actualizarCarritoUI();
}

function eliminarDelCarrito(index) {
    let carrito = carritoLS();
    carrito.splice(index, 1);
    localStorage.setItem('carrito', JSON.stringify(carrito));
    actualizarCarritoUI();
}

function vaciarCarrito() {
    localStorage.removeItem('carrito');
    actualizarCarritoUI();
}

function comprar() {
    const carrito = carritoLS();

    if (carrito.length === 0) {
        alert('Tu carrito está vacío.');
        return;
    }

    const productosSinStock = carrito.filter(producto => producto.stock < 1);

    if (productosSinStock.length > 0) {
        productosSinStock.forEach(producto => {
            alert(`No hay suficiente stock para ${producto.nombre}. No se puede realizar la compra.`);
        });
        return;
    }

    const csrftoken = getCookie('csrftoken');

    fetch('/procesar_compra/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': csrftoken
        },
        body: JSON.stringify(carrito)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Error en la compra');
        }
        return response.json();
    })
    .then(data => {
        alert(data.success);
        vaciarCarrito();
        window.location.href = '/catalogo/';
    })
    .catch(error => {
        alert('Error en la compra');
    });
}

function actualizarCarritoUI() {

    const carrito = carritoLS();
    const carritoUI = document.getElementById('carrito');
    const totalUI = document.getElementById('total-carrito');
    carritoUI.innerHTML = '';

    if (carrito.length === 0) {
        totalUI.textContent = 'Total: 0.00 CLP';
    } else {
        carritoUI.innerHTML = '';
        let total = 0;

        carrito.forEach((producto, index) => {
            const li = document.createElement('li');
            li.classList.add('list-group-item');
            li.textContent = `${producto.nombre} - ${producto.precio} CLP`;

            const btnEliminar = document.createElement('button');
            btnEliminar.classList.add('btn', 'btn-danger', 'btn-sm', 'ms-2');
            btnEliminar.textContent = 'Eliminar';
            btnEliminar.addEventListener('click', () => {
                eliminarDelCarrito(index);
            });

            li.appendChild(btnEliminar);
            carritoUI.appendChild(li);

            total += parseFloat(producto.precio);
        });

        totalUI.textContent = `Total: ${total.toFixed(2)} CLP`;
    }
}

function carritoLS() {
    return JSON.parse(localStorage.getItem('carrito')) || [];
}

function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            if (cookie.startsWith(name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}
