const fs = require('fs');
const express = require('express')

const app = express();

class Archivo {
    constructor() {
        this.productos = [];
    }

    async guardar(producto) {
        producto.id = this.productos.length + 1;
        const data = this.productos
        data.push(producto);
         
            try {
                await fs.promises.writeFile('productos.txt', JSON.stringify(data, null, '\t'))
                console.log('guardado')
            } catch (err) {
                console.log('error al guardar')
            }
    }

     async getByIdAndAll(){
        const datos = await fs.promises.readFile('productos.txt','utf-8')
        const arrayJson = JSON.parse(datos);
        console.log(datos);
        console.log(arrayJson);
        let getId = arrayJson.filter(a => a.id === 2).map(a => a.id)
        if(getId == 2){
            return console.log(`Hay elemento en la posicion ${getId}`);
        }else {
            return console.log(null);
        }
    }

    async deleteById(){
        const datos = await fs.promises.readFile('productos.txt','utf-8')
        const arrayJson = JSON.parse(datos);
        arrayJson.splice(2, 1)
        const arrayJsonString = JSON.stringify(arrayJson)
        return console.log(`Eliminando el elemento 3 del array \n ${arrayJsonString}`);
    }

    async deleteAll(){
        const datos = await fs.promises.readFile('productos.txt','utf-8')
        const arrayJson = JSON.parse(datos);
        arrayJson.splice(0, arrayJson.length);    
        return console.log(arrayJson);
    }

    async request(){
        const datos = await fs.promises.readFile('productos.txt','utf-8')
        return console.log(datos);
    }
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



app.get('/productos', (req,res) => {
    res.send(articulo);
})
app.get('/productosRandom', (req,res) => {
        const u = Math.floor((Math.random() * (3-0))+0);

    if(u == 0){
        res.send(`
        "title": "escuadra",
		"price": 123,
		"thumbnail": "http://www.google.com.ar",
		"id": 1
        `)
    } else if (u == 1){
        res.send(`
        "title": "calculadora",
		"price": 234,
		"thumbnail": "http://www.google.com.ar",
		"id": 2
        `)
    } else {
        res.send(`
        "title": "globo",
		"price": 345,
		"thumbnail": "http://www.google.com.ar",
		"id": 3
        `)
    }
})


const PORT = 8080

const server = app.listen(PORT, () => {
    console.log(`Servidor http escuchando en el puerto ${server.address().port}`)
})

/*console.log(articulo.getByIdAndAll());
console.log(articulo.deleteById());
console.log(articulo.deleteAll());*/