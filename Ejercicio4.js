const fs = require('fs');
const express = require('express')

const app = express();

app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))

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
        //const datos = await fs.promises.readFile('productos.js','utf-8')
}

const articulo = new Archivo;
producto = [
{
    title: 'escuadra',
    price: 123,
    thumbnail: 'http://www.google.com.ar'
}, {
    title: 'calculadora',
    price: 234,
    thumbnail: 'http://www.google.com.ar'
}, {
    title: 'globo',
    price: 345,
    thumbnail: 'http://www.google.com.ar'
}
];

for (i in producto) {
    articulo.guardar(producto[i]);
}
app.get('/api/productos', ({ query }, res) => {
    res.send(articulo);
})

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


app.post('/api/productos', ({ body }, res) => {
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
    /*.forEach((item,index) => item.id = index)*/
    res.json(ekis)
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
    console.log("Recibio una peticion de borrado");
    res.json({ 
        result: 'ok',
        id: req.params.id })
})

const PORT = 8080
const server = app.listen(PORT, () => {
    console.log(`Servidor http escuchando en el puerto ${server.address().port}`)
})