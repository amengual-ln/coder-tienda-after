
// Función para cargar el json con fetch
async function fetchProductos() {
    const response = await fetch('./data.json'); // fetch devuelve una promesa
    return await response.json();
}

const seccionProductos = document.querySelector('#productos')

// Renderiza el catalogo de productos
function mostrarCatalogo() {
    for (producto of catalogo) {
        const { id, nombre, precio, imagen } = producto // Destructuring
        const productoHTML = `
            <div class="producto">
                <img src="${imagen}"></img>
                <h3>${nombre}</h3>
                <p>$${precio}</p>
                <button class="btn" onclick="sumarAlCarrito(${id})">Sumar al carrito</button>
            </div>
        `
        seccionProductos.innerHTML += productoHTML
    }
}

// Llamo a esa función
let catalogo = []
fetchProductos().then(productos => { // Manejo de promesas
    catalogo = productos
    mostrarCatalogo()
})

// Traigo el carrito de localStorage (si no existe, lo creo vacio)
const carrito = JSON.parse(localStorage.getItem('carrito')) || [] // operador OR

function sumarAlCarrito(id) {
    const producto = catalogo.find(producto => producto.id == id)

    if (carrito.find(producto => producto.id == id)) {
        const producto = carrito.find(producto => producto.id == id)
        producto.cantidad++
    } else {
        carrito.push({
            ...producto, // Spread operator
            cantidad: 1
        })
    }
    mostrarNotificacion(`${producto.nombre} agregado al carrito`)
    guardarCarrito()
}

// Guardo el carrito en localStorage
function guardarCarrito() {
    localStorage.setItem('carrito', JSON.stringify(carrito))
}

function mostrarNotificacion(mensaje) {
    Toastify({
        text: mensaje,
        destination: '/pages/carrito.html',
        duration: 3000,
        stopOnFocus: true
    }).showToast()
}