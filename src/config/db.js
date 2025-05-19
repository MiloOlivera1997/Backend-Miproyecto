/**
 * Módulo que establece la conexión a la base de datos MySQL.
 * 
 * @module db
 */

const mysql = require('mysql2');
require('dotenv').config();
/**
 * Objeto de conexión a MySQL.
 * 
 * @type {mysql.Connection}
 */
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: process.env.DB_PASSWORD,
  database: 'reservas_db'
});
/**
 * Conecta con la base de datos y muestra el estado de la conexión en consola.
 * 
 * @function
 */
connection.connect((err) => {
    if (err) {
      console.error('Error al conectar a la base de datos:', err);
      return;
    }
    console.log('Conexión a MySQL exitosa!');
  });
  /**
 * Exporta la conexión para ser usada en otros módulos.
 */
  module.exports = connection;