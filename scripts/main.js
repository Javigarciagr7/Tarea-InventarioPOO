import ManagerInventario from './ManagerInventario.js';
import LocalStorageManager from './localStorage.js';

const managerInventario = new ManagerInventario();

managerInventario.inventario = LocalStorageManager.obtenerInventario();

document.getElementById("agregarBtn").addEventListener("click", () => managerInventario.agregarProducto());
document.getElementById("buscarBtn").addEventListener("click", () => managerInventario.buscarProducto());
document.getElementById("actualizarBtn").addEventListener("click", () => managerInventario.actualizarInventario());
document.getElementById("eliminarBtn").addEventListener("click", () => managerInventario.eliminarProductos());
document.getElementById("mostrarBtn").addEventListener("click", () => managerInventario.mostrarInventario());