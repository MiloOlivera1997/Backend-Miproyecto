const { guardarReserva } = require('../models/reservaModel');
const nodemailer = require('nodemailer');
/**
 * Envía correos electrónicos de confirmación tanto al restaurante como al cliente.
 * 
 * @function
 * @async
 * @param {Object} reservaData - Los datos de la reserva.
 * @param {string} reservaData.nombre - El nombre del cliente.
 * @param {string} reservaData.contacto - El número de contacto del cliente.
 * @param {string} reservaData.email - El correo electrónico del cliente.
 * @param {number} reservaData.comensales - El número de comensales.
 * @param {string} reservaData.menu_elegido - El menú elegido por el cliente.
 * @param {Array} [reservaData.entrantes] - Lista de entrantes elegidos por el cliente.
 * @param {Array} [reservaData.principales] - Lista de platos principales elegidos.
 * @param {Array} [reservaData.postres] - Lista de postres elegidos.
 * @param {Array} [reservaData.bebidas] - Lista de bebidas elegidas.
 * @param {string} reservaData.menu_tipo - Tipo de menú elegido (ej. '45').
 * @param {string} reservaData.fecha - Fecha de la reserva.
 * @param {string} reservaData.hora - Hora de la reserva.
 * @returns {Promise<void>} No retorna nada.
 */
const enviarCorreo = async (reservaData) => {
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user: 'mailengolivera@gmail.com',
        pass: 'osep wwbx qgil eqmi'
      }
    });
  
   
    const htmlRestaurante = `
      <h3>Nueva Reserva Recibida</h3>
      <p><strong>Nombre:</strong> ${reservaData.nombre}</p>
      <p><strong>Contacto:</strong> ${reservaData.contacto}</p>
      <p><strong>Email:</strong> ${reservaData.email}</p>
      <p><strong>Comensales:</strong> ${reservaData.comensales}</p>
      <p><strong>Menú:</strong> ${reservaData.menu_elegido}</p>
      <p><strong>Entrantes:</strong> ${reservaData.entrantes?.join(', ') || 'Ninguno'}</p>
      <p><strong>Principales:</strong> ${reservaData.principales?.join(', ') || 'Ninguno'}</p>
      <p><strong>Postres:</strong> ${reservaData.postres?.join(', ') || 'Ninguno'}</p>
      ${reservaData.menu_tipo === '45' ? `<p><strong>Bebidas:</strong> ${reservaData.bebidas.join(', ')}</p>` : ''}

    `;
  
   
    const htmlCliente = `
      <h3>Reserva realizada</h3>
      <p>Gracias por reservar con nosotros, ${reservaData.nombre}.</p>
      <p>Tu reserva ha sido confirmada para el día <strong>${reservaData.fecha}</strong> a las <strong>${reservaData.hora}</strong>.</p>
      <p>Menú elegido: <strong>${reservaData.menu_elegido}</strong></p>
      <p>Nos pondremos en contacto si hay algún cambio.</p>
      <p>¡Te esperamos!</p>
    `;
  
   
    await transporter.sendMail({
      from: 'mailengolivera@gmail.com',
      to: 'mailengolivera@gmail.com',
      subject: 'Nueva Reserva Recibida',
      html: htmlRestaurante
    });
  
 
    await transporter.sendMail({
      from: 'mailengolivera@gmail.com',
      to: reservaData.email,
      subject: 'Tu Reserva ha sido realizada',
      html: htmlCliente
    });
  };
  
/**
 * Controlador que maneja la creación de una reserva.
 * 
 * Guarda la reserva en la base de datos y envía correos electrónicos de confirmación.
 * 
 * @function
 * @async
 * @param {Object} req - El objeto de solicitud que contiene los datos de la reserva.
 * @param {Object} res - El objeto de respuesta utilizado para enviar la respuesta HTTP.
 * @returns {Promise<void>} Responde con un mensaje de éxito o error.
 */
const crearReserva = async (req, res) => {
    try {
        const { nombre, contacto, email, comensales, menu_elegido, fecha, hora } = req.body;
   
        
        const entrantes = req.body.entrantes || [];
        const principales = req.body.principales || [];
        const postres = req.body.postres || [];
        const bebidas = req.body.bebidas || [];
        
  
      const data = {
        nombre,
        contacto,
        email,
        comensales,
        menu_elegido,
        fecha,
        hora,
        entrantes,
        principales,
        postres,
        bebidas
      };
      console.log('Datos recibidos:', req.body);

      console.log('Intentando guardar en base de datos...');
      await guardarReserva(data);
      console.log('Reserva guardada con éxito');
  
      console.log('Intentando enviar correo...');
      await enviarCorreo(data);
      console.log('Correo enviado con éxito');
  
      res.status(200).json({ message: 'Reserva realizada correctamente' });
    } catch (err) {
      console.error('Error al crear la reserva:', err);
      res.status(500).json({ error: 'Error al guardar la reserva' });
    }
  };
  
module.exports = { crearReserva };
