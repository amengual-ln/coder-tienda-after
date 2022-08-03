// Traigo el carrito de localStorage (si no existe, lo creo vacio)
const carrito = JSON.parse(localStorage.getItem('carrito')) || []

const seccionCarrito = document.querySelector('#carrito')

// Renderiza el carrito
function mostrarCarrito() {
    seccionCarrito.innerHTML = ""
    if (carrito.length === 0) {
        seccionCarrito.innerHTML = `
            <div style="text-align: center">
                <p>Ups, no hay productos en el carrito</p>
                <a class="btn" href="/">Volver al catalogo</a>
            </div>
        `
    } else {
        for (producto of carrito) {
            const { id, nombre, precio, imagen, cantidad } = producto
            const productoHTML = `
            <div class="producto-carrito">
                <img src="../${imagen}"></img>
                <h3>${nombre}</h3>
                <p>$${precio}</p>
                <p>Cantidad: ${cantidad}</p>
                <button class="btn" onclick="quitarDelCarrito(${id})">Eliminar</button>
            </div>
        `
            seccionCarrito.innerHTML += productoHTML
        }
    }
}

mostrarCarrito()

const seccionResumen = document.querySelector('#resumen')

function mostrarResumen() {
    seccionResumen.innerHTML = ""
    const total = calcularTotal()
    const resumen = `
        <div class="resumen">
            <h3>Resumen</h3>
            <p>Total: $${total}</p>
            <a class="btn" href="./comprar.html">Comprar</a>
        </div>
    `
    seccionResumen.innerHTML += resumen
}

mostrarResumen()

function quitarDelCarrito(id) {
    const producto = carrito.find(producto => producto.id == id)
    if (producto.cantidad === 1) {
        carrito.splice(carrito.findIndex(producto => producto.id == id), 1)
    } else {
        producto.cantidad--
    }
    mostrarCarrito()
    mostrarResumen()
    guardarCarrito()
}

function calcularTotal() {
    let total = 0
    for (producto of carrito) {
        total += producto.precio * producto.cantidad
    }
    return total
}

// Guardo el carrito en localStorage
function guardarCarrito() {
    localStorage.setItem('carrito', JSON.stringify(carrito))
}