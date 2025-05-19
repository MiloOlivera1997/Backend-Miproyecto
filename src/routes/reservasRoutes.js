const express = require('express');
const router = express.Router();
const { crearReserva } = require('../controllers/reservasController');


// Ruta POST que guarda cookie
router.post('/reservar', (req, res) => {
  const { nombre, contacto, email, comensales, menu_elegido } = req.body;

  // Guardar cookie con el nombre del usuario (válida por 7 días)
  res.cookie('nombreUsuario', nombre, {
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true,
  });

  // Aquí llamas a tu función real para crear la reserva
  crearReserva(req, res);
});


/**
 * Ruta para crear una nueva reserva.
 * 
 * @route POST /reservar
 * @param {object} req - La solicitud HTTP, que contiene los datos de la reserva.
 * @param {object} res - La respuesta HTTP que se enviará al cliente.
 * @returns {object} Mensaje indicando si la reserva fue realizada con éxito o error.
 */
router.post('/reservar', crearReserva);

module.exports = router;
