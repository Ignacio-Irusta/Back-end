const express = require('express')
const multer = require('multer')
const array = require('./Array.js')
const arrays = require('./Array.js')

const app = express()

app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))

/*const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
      cb(null, `${Date.now()}-${file.originalname}`)
    }
  })

  const upload = multer({ storage: storage })
  
  app.post('/api/productos', upload.single('miArchivo'), (req, res, next) => {
    const file = req.file
    if (!file) {
      const error = new Error('Error subiendo archivo')
      error.httpStatusCode = 400
      return next(error)
    }
    res.send(`Archivo <b>${file.originalname}</b> subido exitosamente`)
  })*/

//------------------------------------------------------------------------



//------------------------------------------------------------------------

app.get('/api/productos', ({ query }, res) => {
    console.log(arrays);
    res.json(arrays)
})

app.get('/api/productos/:id', (req, res) => {
    const arrayobject = arrays;
    const id = req.params.id
    const filter = arrayobject.filter(function(array){
        return array.id == id;
    })
    if(filter.length==0){
        res.json({ error : 'producto no encontrado' })
    }
    res.json(filter)
    console.log(filter);
})


app.post('/api/productos', ({ body }, res) => {
    const htmlBody = body;
    arrays.push(htmlBody)
    arrays.forEach((item,index) => item.id = index)
    const lastobject = arrays.pop()
    console.log(lastobject);
    res.json(lastobject)
})

app.put('/api/productos/:id', ({ body, params }, res) => {
    console.log(params, body)
    res.json({ mensaje: 'recibí una petición con método "put"' })
})

app.delete('/api/productos/:id', ({ params }, res) => {
    console.log("Recibio una peticion de borrado");
    res.json({ 
        result: 'ok',
        id: req.params.id })
})

const PORT = 8080
const server = app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${server.address().port}`)
})
server.on('error', error => console.log(`Error en servidor ${error}`))