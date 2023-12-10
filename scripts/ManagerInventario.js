
import LocalStorageManager from './localStorage.js';

class ManagerInventario {
    constructor() {
        this.inventario = LocalStorageManager.obtenerInventario();
        this.inventarioVisible = false;
    }

    agregarProducto() {
        const nuevoProductoNombre = document.getElementById('nombre').value;
        const nuevoProductoCantidad = parseInt(document.getElementById('cantidad').value);
        const nuevoProductoPrecio = parseFloat(document.getElementById('precio').value);

        if (nuevoProductoNombre === '' || isNaN(nuevoProductoCantidad) || isNaN(nuevoProductoPrecio) || nuevoProductoCantidad <= 0 || nuevoProductoPrecio < 0) {
            alert('Por favor, complete todos los campos con valores válidos mayores o iguales a 0.');
            return;
        }

        const nuevoProducto = { nombre: nuevoProductoNombre, cantidad: nuevoProductoCantidad, precio: nuevoProductoPrecio };
        this.inventario.push(nuevoProducto);

        this.mostrarInventario();
        this.guardarInventarioEnLocalStorage();
        this.limpiarFormulario();
    }

    actualizarInventario() {
        const nombreProducto = document.getElementById('nombreActualizar').value;
        const cantidadProducto = parseInt(document.getElementById('cantidadActualizar').value);
        const precioProducto = parseFloat(document.getElementById('precioActualizar').value);

        if (cantidadProducto < 0 || precioProducto < 0) {
            alert('Por favor, ingrese valores válidos mayores o iguales a 0.');
            return;
        }

        const productoExistente = this.inventario.find(producto => producto.nombre === nombreProducto);

        if (productoExistente) {
            productoExistente.cantidad += cantidadProducto;
            productoExistente.precio = precioProducto;
        } else {
            this.inventario.push({ nombre: nombreProducto, cantidad: cantidadProducto, precio: precioProducto });
        }

        this.mostrarInventario();
        this.guardarInventarioEnLocalStorage();
        this.limpiarFormulario();
    }

    buscarProducto() {
        const nombreProductoABuscar = document.getElementById('nombreBusqueda').value;
        const resultadoBusquedaElement = document.getElementById('resultadoBusqueda');

        const productoEncontrado = this.inventario.find(producto => producto.nombre === nombreProductoABuscar);

        if (productoEncontrado) {
            resultadoBusquedaElement.textContent = `Nombre: ${productoEncontrado.nombre}, Cantidad: ${productoEncontrado.cantidad}, Precio: $${productoEncontrado.precio}`;
        } else {
            resultadoBusquedaElement.textContent = 'Producto no encontrado';
        }

        document.getElementById('nombreBusqueda').value = '';
    }

    eliminarProductos() {
        const precioAEliminar = parseFloat(document.getElementById('eliminarPrecio').value);

        if (precioAEliminar < 0) {
            alert('Por favor, ingrese un valor válido mayor o igual a 0 en el campo de precio a eliminar.');
            return;
        }

        for (let i = this.inventario.length - 1; i >= 0; i--) {
            if (this.inventario[i].precio > precioAEliminar) {
                this.inventario.splice(i, 1);
            }
        }

        this.mostrarInventario();
        this.guardarInventarioEnLocalStorage();
        this.limpiarFormulario();
    }

    mostrarInventario() {
        const inventarioList = document.getElementById('inventarioList');
        const totalInventarioElement = document.getElementById('totalInventario');

        inventarioList.innerHTML = '';

        let totalInventario = 0;

        this.inventario.forEach(producto => {
            const { nombre, cantidad, precio } = producto;
            const productoItem = document.createElement('li');
            productoItem.textContent = `Nombre: ${nombre}, Cantidad: ${cantidad}, Precio: $${precio}`;
            inventarioList.appendChild(productoItem);

            totalInventario += cantidad * precio;
        });

        totalInventarioElement.textContent = `Total del inventario: $${totalInventario}`;

        if (!this.inventarioVisible) {
            inventarioList.style.display = 'block';
            totalInventarioElement.style.display = 'block';
        } else {
            inventarioList.style.display = 'none';
            totalInventarioElement.style.display = 'none';
        }

        this.inventarioVisible = !this.inventarioVisible;
    }
    guardarInventarioEnLocalStorage() {
        LocalStorageManager.guardarInventario(this.inventario);
    }

    limpiarFormulario() {
        document.getElementById('nombre').value = '';
        document.getElementById('cantidad').value = '';
        document.getElementById('precio').value = '';
    }
}

export default ManagerInventario;
