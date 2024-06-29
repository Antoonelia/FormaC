// carrito.js

document.addEventListener('DOMContentLoaded', () => {
    actualizarCarritoUI();
});

function agregarAlCarrito(nombre, precio) {
    const producto = { nombre, precio };

    // Obtener el carrito del localStorage
    let carrito = obtenerCarritoDesdeLocalStorage();

    // Agregar el producto al carrito
    carrito.push(producto);

    // Actualizar el localStorage
    localStorage.setItem('carrito', JSON.stringify(carrito));

    // Actualizar la interfaz de usuario del carrito
    actualizarCarritoUI();
}

function eliminarDelCarrito(index) {
    // Obtener el carrito del localStorage
    let carrito = obtenerCarritoDesdeLocalStorage();

    // Eliminar el producto del carrito en la posición `index`
    carrito.splice(index, 1);

    // Actualizar el localStorage
    localStorage.setItem('carrito', JSON.stringify(carrito));

    // Actualizar la interfaz de usuario del carrito
    actualizarCarritoUI();
}

function vaciarCarrito() {
    // Limpiar el carrito (eliminar todos los productos)
    localStorage.removeItem('carrito');

    // Actualizar la interfaz de usuario del carrito
    actualizarCarritoUI();
}

function comprar() {
    // Limpiar el carrito (eliminar todos los productos)
    localStorage.removeItem('carrito');

    // Redirigir al usuario de vuelta al catálogo
    window.location.href = '/catalogo.html';
}

function actualizarCarritoUI() {
    const carrito = obtenerCarritoDesdeLocalStorage();

    const carritoUI = document.getElementById('carrito');

    // Limpiamos el contenido previo del carrito
    carritoUI.innerHTML = '';

    // Iteramos sobre los productos en el carrito y los mostramos
    carrito.forEach((producto, index) => {
        const li = document.createElement('li');
        li.classList.add('list-group-item');
        li.textContent = `${producto.nombre} - ${producto.precio} CLP`;

        // Botón para eliminar producto del carrito
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

function obtenerCarritoDesdeLocalStorage() {
    return JSON.parse(localStorage.getItem('carrito')) || [];
}
