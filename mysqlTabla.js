const knexLib = require('knex')

class ClienteMSql {
    constructor(config) {
      this.knex = knexLib(config)
    }
  
    crearTablaMYSQL() {
      return this.knex.schema.dropTableIfExists('productos')
        .finally(() => {
          return this.knex.schema.createTable('productos', tabla => {
            tabla.increments('id'),
            tabla.string('Titulo'),
            tabla.float('Precio'),
            tabla.string('url')
          })
        })
    }
  
    insertarProducto(productos) {
      return this.knex('productos').insert(productos)
    }
  
    close() {
      this.knex.destroy();
    }
  }

module.exports = ClienteMSql;