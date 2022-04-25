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

function mostrarMensajes(mensajes) {
    const mensajesParaMostrar = mensajes.map(({ fecha, autor, texto }) => {
        return `<li>${fecha} - ${autor}: ${texto}</li>`
    })

    const mensajesHtml = `
<ul>
${mensajesParaMostrar.join('\n')}
</ul>`

    const listaMensajes = document.getElementById('listaMensajes')
    listaMensajes.innerHTML = mensajesHtml
}

socket.on('mensajesActualizados', mensajes => {
    mostrarMensajes(mensajes)
})

const botonEnviar = document.getElementById('botonEnviar')
botonEnviar.addEventListener('click', e => {
    const inputAutor = document.getElementById('inputMail')
    const inputMensaje = document.getElementById('inputMensaje')
    const mensaje = {
        autor: inputAutor.value,
        texto: inputMensaje.value
    }
    socket.emit('nuevoMensaje', mensaje)
})