document.addEventListener('DOMContentLoaded', () => {
    actualizarCarritoUI();
});

function agregarAlCarrito(nombre, precio) {
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
    localStorage.removeItem('carrito');

    window.location.href = '/catalogo.html';
}

function actualizarCarritoUI() {
    const carrito = carritoLS();

    const carritoUI = document.getElementById('carrito');

    carritoUI.innerHTML = '';

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
    });
}

function carritoLS() {
    return JSON.parse(localStorage.getItem('carrito')) || [];
}
