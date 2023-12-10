
class LocalStorageManager {
    static obtenerInventario() {
        const inventarioString = localStorage.getItem('inventario');
        return JSON.parse(inventarioString) || [];
    }

    static guardarInventario(inventario) {
        const inventarioString = JSON.stringify(inventario);
        localStorage.setItem('inventario', inventarioString);
    }
}

export default LocalStorageManager;