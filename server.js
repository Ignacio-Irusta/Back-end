const express = require('express')
const { Server: HttpServer } = require('http')
const { Server: IOServer } = require('socket.io')
const options = require('./sql')
const ClienteSql = require('./sqlTabla')
const optionsMysql = require('./mysql')
const ClienteMSql = require('./mysqlTabla')

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
    socket.emit('mensajesActualizados', mensajes);

    socket.on('update', producto => {
        productos.push(producto);
        io.sockets.emit('productos', productos);
    })
    socket.on('nuevoMensaje', mensaje => {
        mensaje.fecha = new Date().toLocaleString();
        mensajes.push(mensaje);
        io.sockets.emit('mensajesActualizados', mensajes);
    })
});

//SQLite3
const sql = new ClienteSql(options);
sql.crearTablaSQL()
  .then(() => {
    console.log("Tabla de mensajes creada")
    sql.insertarMensaje(mensajes)
  }).catch((err) => { 
    console.log(err); throw err 
  }).finally(() => {
    sql.close()
  })

//mysql

const mysql = new ClienteMSql(optionsMysql)
mysql.crearTablaMYSQL()
  .then(() => {
    console.log("Tabla de productos creada")
    mysql.insertarProducto(productos)
  }).catch((err) => { 
    console.log(err); throw err 
  }).finally(() => {
    mysql.close()
  })


app.listen(8080, () => {

});