class Usuario {
    constructor(name, apellido, libro, mascotas) {
        this.name = name;
        this.apellido = apellido;
        this.libro = libro;
        this.mascotas = mascotas;
    }


        getfullname(){
            return `Mi nombre completo ${this.name} ${this.apellido}`;
        }
    
        addMascota(){
            const nuevo = "Buho";            
            this.mascotas.push(nuevo)
            const array = this.mascotas;
            return array;
        }

        countMascotas(){
            const array2 = this.mascotas;
            return (array2.length);
        }

        addBook(){
            const lib = {titulo: "Harry Potter", autor: "J.K. Rowling"};            
            this.libro.push(lib)
            const lib2 = this.libro;
            return lib2;
        }

        getBookNames(){
            const namelib = this.libro
            const namelib2 = namelib.map(a => a.titulo)
            return namelib2;
        }
}

const pedido = new Usuario ("Pepe", "Larracochea",
 [{titulo: "Señor de los Anillos", autor: "J. R. R. Tolkien"}, {titulo: "Fundacion", autor: "Isaac Asimov"}],
  ["Perro", "Gato", "Semental"])


  console.log(pedido.getfullname());
  console.log(pedido.addMascota());
  console.log(pedido.countMascotas());
  console.log(pedido.addBook());
  console.log(pedido.getBookNames());