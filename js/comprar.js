new Cleave('#tarjeta', {
    creditCard: true,
    onCreditCardTypeChanged: function (type) {
        console.log('Credit card type changed: ', type);
    }
})

new Cleave('#vencimiento', {
    date: true,
    datePattern: ['m', 'y'],
    delimiter: '/'
});

new Cleave('#codigo', {
    numericOnly: true,
    blocks: [3]
});


// Para el mail uso un servicio que se llama email.js (https://www.emailjs.com/)
// Necesitan registrarse para usarlo, es gratis

function enviarMail() {
    emailjs.init("ACA VA SU CLIENT ID")
    emailjs.sendForm(
        'ID DE SERVICIO',
        'ID DEL TEMPLATE',
        'SELECTOR DEL FORM A ENVIAR (por ejemplo .formulario o #formulario'
    )
}

document.querySelector('#confirmarCompra').addEventListener('click', (e) => {
    e.preventDefault()
    Swal.fire(
        'Listo!',
        'Gracias por tu compra! Te enviamos un mail con el resumen de la misma',
        'success'
    )
    enviarMail() // Envio el mail
    localStorage.removeItem('carrito')

    setTimeout(() => {
        window.location.href = "/"
    }, 3000)
})

