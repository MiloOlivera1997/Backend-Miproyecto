const db = require('../config/db');
/**
 * Guarda una nueva reserva en la base de datos.
 * 
 * @function
 * @param {Object} data - Los datos de la reserva.
 * @param {string} data.nombre - El nombre del cliente.
 * @param {string} data.contacto - El número de contacto del cliente.
 * @param {string} data.email - El correo electrónico del cliente.
 * @param {number} data.comensales - El número de comensales.
 * @param {string} data.menu_tipo - El tipo de menú seleccionado por el cliente.
 * @param {string} data.fecha - La fecha de la reserva.
 * @param {string} data.hora - La hora de la reserva.
 * @param {Array} data.entrantes - Lista de entrantes seleccionados.
 * @param {Array} data.principales - Lista de platos principales seleccionados.
 * @param {Array} data.postres - Lista de postres seleccionados.
 * @returns {Promise<Object>} Promesa que retorna los resultados de la consulta.
 */
const guardarReserva = (data) => {
  return new Promise((resolve, reject) => {
    const { nombre, contacto, email, comensales, menu_tipo, fecha, hora, entrantes, principales, postres, } = data;

    const query = `
  INSERT INTO reservas 
  (nombre, contacto, email, comensales, fecha, hora, entrantes, principales, postres, bebidas)
  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

  const bebidas = menu_tipo === '45' ? (req.body.bebidas || []) : [];

db.query(query, [
  nombre,
  contacto,
  email,
  comensales,
  fecha,
  hora,
  JSON.stringify(entrantes),
  JSON.stringify(principales),
  JSON.stringify(postres),
  JSON.stringify(bebidas || [])
], (err, results) => {
  if (err) {
    reject(err);
  } else {
    resolve(results);
  }
});



    
  });
};

module.exports = { guardarReserva };
