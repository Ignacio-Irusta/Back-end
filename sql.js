module.exports = {
  client: 'sqlite3',
  connection: {
    filename: process.cwd() + "./DB/ecommerce.sqlite",
  },
  useNullAsDefault: true
}; 