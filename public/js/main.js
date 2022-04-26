const socket = io();

//PRODUCTOS

const formAgregarProducto = document.getElementById('formAgregarProducto')
formAgregarProducto.addEventListener('submit', e => {
    e.preventDefault()

    const producto = {
        Titulo: document.getElementById('txtTitulo').value,
        Precio: document.getElementById('txtPrecio').value,
        tumbline: document.getElementById('tumbline').value
    }
    socket.emit('update', producto);
    formAgregarProducto.reset()
})

socket.on('productos', manejarEventoProductos);

async function manejarEventoProductos(productos) {
    const recursoRemoto = await fetch('plantilla/tabla-productos.hbs')
    const textoPlantilla = await recursoRemoto.text()
    const functionTemplate = Handlebars.compile(textoPlantilla)
    const html = functionTemplate({ productos })

    document.getElementById('productos').innerHTML = html
}

//MENSAJES

const AgregarMensaje = document.getElementById('AgregarMensaje')
AgregarMensaje.addEventListener('submit', e => {
    e.preventDefault()

    const mensaje = {
        autor: document.getElementById('inputMail').value,
        texto: document.getElementById('inputMensaje').value,
    }
    socket.emit('nuevoMensaje', mensaje);
})

socket.on('mensajesActualizados', mostrarMensajes)


async function mostrarMensajes(mensajes) {
    const recursoMensaje = await fetch('plantilla/mostrar-mensajes.hbs')
    const textoPlantilla = await recursoMensaje.text()
    const functionTemplate = Handlebars.compile(textoPlantilla)
    const html = functionTemplate({ mensajes })

    document.getElementById('listaMensajes').innerHTML = html
}