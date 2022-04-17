const express = require('express')

const app = express();

app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))
app.set('views', './views')
app.set('view engine', 'pug');
app.set('view engine', 'ejs');

const producto = []


app.get('/api', (req, res) => {
    res.render('index.pug', {titulo: "Bienvenidos al Inicio", info: "Proceda a la seccion del formulario"});
})

app.post('/apis', (req, res) => {
    res.redirect('/api/productos')
})

app.get('/api/productos', (req, res) => {
    res.render('intro', { producto });
})

app.post('/api/productos/apis', (req, res) => {
    res.redirect('/api')
})

app.post('/api/productos/cargados', (req, res) => {    
    producto.push(req.body)
    console.log(producto);
    res.redirect('/api/productos')
})


const PORT = 8080
const server = app.listen(PORT, () => {
    console.log(`Servidor http escuchando en el puerto ${server.address().port}`)
})



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
