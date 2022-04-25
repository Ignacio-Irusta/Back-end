const express = require('express')
const { Server: HttpServer } = require('http')
const { Server: IOServer } = require('socket.io')

const app = express();
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))
const httpServer = new HttpServer(app)
const io = new IOServer(httpServer)

const productos = []
const mensajes = []

io.on('connection', socket => {
    socket.emit('productos', productos);
    socket.emit('mensajesActualizados', mensajes)

    socket.on('update', producto => {
        productos.push(producto)
        io.sockets.emit('productos', productos);
    })
    socket.on('nuevoMensaje', mensaje => {
        mensaje.fecha = new Date().toLocaleString()
        mensajes.push(mensaje)
        io.sockets.emit('mensajesActualizados', mensajes)
    })
});

const PORT = 8080
const connectedServer = httpServer.listen(PORT, () => {
    console.log(`Servidor http escuchando en el puerto ${connectedServer.address().port}`)
})
connectedServer.on('error', error => console.log(`Error en servidor ${error}`))

/*
class Archivo {
    constructor() {
        this.productos = [];
    }

    async guardar(producto) {
        producto.id = this.productos.length + 1;
        const data = this.productos
        data.push(producto);         
            try {
                await fs.promises.writeFile('productos.js', JSON.stringify(data, null, '\t'))
                console.log('guardado')
            } catch (err) {
                console.log('error al guardar')
            }
    }
}

const articulo = new Archivo;
producto = [
];
for (i in producto) {
    articulo.guardar(producto[i]);
}
app.get('/api/productos/:id', (req, res) => {
    const result = JSON.stringify(articulo)
    const codResult = JSON.parse(result)
    const ekis = codResult.productos
    const id = req.params.id
    const filter = ekis.filter(function(array){
        return array.id == id;
    })
    if(filter.length==0){
        res.json({ error : 'producto no encontrado' })
    }
    res.json(filter)
    console.log(filter);
})




app.post('/api/productos/cargados', ({ body }, res) => {
    const result = JSON.stringify(articulo)
    const codResult = JSON.parse(result)
    const ekis = codResult.productos
    const htmlBody = body;
    ekis.push(htmlBody)
    htmlBody.id = ekis.length -1+1;
    try {
        fs.promises.writeFile('productos.js', JSON.stringify(ekis, null, '\t'))
        console.log('guardado')
    } catch (err) {
        console.log('error al guardar')
    }  
    console.log(ekis);
    res.redirect('/api/productos')
})

app.put('/api/productos/:id', ({ body, params, req }, res) => {
    const result = JSON.stringify(articulo)
    const codResult = JSON.parse(result)
    const ekis = codResult.productos
    const id = req.params.id
    const filter = ekis.filter(function(array){
        return array.id == id;
    })
    if(filter.length==0){
        res.json({ error : 'producto no encontrado' })
    }
    const idNew = filter.id
    filter = {...body, idNew}
    ekis.push(filter)
    try {
        fs.promises.writeFile('productos.js', JSON.stringify(ekis, null, '\t'))
        console.log('guardado')
    } catch (err) {
        console.log('error al guardar')
    } 
    res.json(ekis)
})

app.delete('/api/productos/:id', ({ params }, res) => {
    const result = JSON.stringify(articulo)
    const codResult = JSON.parse(result)
    const ekis = codResult.productos
    const id = req.params.id
    const filter = ekis.filter(function(array){
        return array.id == id;
    })
    if(filter.length==0){
        res.json({ error : 'producto no encontrado' })
    }
    ekis.splice(id, 1);
    try {
        fs.promises.writeFile('productos.js', JSON.stringify(ekis, null, '\t'))
        console.log('guardado')
    } catch (err) {
        console.log('error al guardar')
    } 
    res.json(ekis)
})*/
