const knexLib = require('knex')

class ClienteSql {
    constructor(config) {
      this.knex = knexLib(config)
    }
  
    crearTablaSQL() {
      return this.knex.schema.dropTableIfExists('mensajes')
        .finally(() => {
          return this.knex.schema.createTable('mensajes', tabla => {
            tabla.increments('id'),
            tabla.string('Mail'),
            tabla.string('Mensaje')
          })
        })
    }
  
    insertarMensaje(mensajes) {
      return this.knex('mensajes').insert(mensajes)
    }
  
    close() {
      this.knex.destroy();
    }
  }
  
module.exports = ClienteSql;