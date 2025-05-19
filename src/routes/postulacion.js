const express = require('express');
const nodemailer = require('nodemailer');
const multer = require('multer');
const bodyParser = require('body-parser');

const router = express.Router();


router.use(bodyParser.urlencoded({ extended: true }));


const upload = multer({ storage: multer.memoryStorage() });


const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'mailengolivera@gmail.com', 
    pass: 'osep wwbx qgil eqmi'        
  }
});

/**
 * Función para enviar un correo de postulación.
 * 
 * @param {string} destino - La dirección de correo electrónico del destinatario.
 * @param {string} asunto - El asunto del correo.
 * @param {Object} datos - Los datos de la postulación (nombre, contacto, comentario, etc.).
 * @param {Object} archivo - El archivo adjunto (curriculum) que se enviará en el correo.
 * @returns {Promise} Promesa que se resuelve cuando el correo es enviado.
 */

async function enviarPostulacion(destino, asunto, datos, archivo) {
  const mailOptions = {
    from: 'mailengolivera@gmail.com',
    to: destino,
    subject: asunto,
    html: `
      <p><strong>Nombre:</strong> ${datos.nombre}</p>
      <p><strong>Contacto:</strong> ${datos.contacto}</p>
      <p><strong>Comentario:</strong> ${datos.comentario}</p>
      ${datos.red_social ? `<p><strong>Red social:</strong> ${datos.red_social}</p>` : ''}
    `,
    attachments: archivo ? [{
      filename: archivo.originalname,
      content: archivo.buffer
    }] : []
  };

  await transporter.sendMail(mailOptions);
}
/**
 * Ruta para enviar una postulación para el puesto de salón.
 * 
 * @route POST /postulacion/salon
 * @param {object} req - La solicitud HTTP, que incluye los datos del formulario y el archivo.
 * @param {object} res - La respuesta HTTP que se enviará al cliente.
 * @returns {object} Mensaje indicando si la postulación fue enviada con éxito o error.
 */

router.post('/postulacion/salon', upload.single('curriculum'), async (req, res) => {
  try {
    await enviarPostulacion(
      'mailengolivera@gmail.com', 
      'Nueva Postulación - Salón',
      req.body,
      req.file
    );
    res.send('Postulación de Salón enviada correctamente.');
  } catch (err) {
    console.error(err);
    res.status(500).send('Error al enviar postulación de salón.');
  }
});

/**
 * Ruta para enviar una postulación para el puesto de gerencia.
 * 
 * @route POST /postulacion/gerencia
 * @param {object} req - La solicitud HTTP, que incluye los datos del formulario y el archivo.
 * @param {object} res - La respuesta HTTP que se enviará al cliente.
 * @returns {object} Mensaje indicando si la postulación fue enviada con éxito o error.
 */
router.post('/postulacion/gerencia', upload.single('curriculum'), async (req, res) => {
  try {
    await enviarPostulacion(
      'mailengolivera@gmail.com',
      'Nueva Postulación - Gerencia',
      req.body,
      req.file
    );
    res.send('Postulación de Gerencia enviada correctamente.');
  } catch (err) {
    console.error(err);
    res.status(500).send('Error al enviar postulación de gerencia.');
  }
});

/**
 * Ruta para enviar una postulación para el puesto de cocina.
 * 
 * @route POST /postulacion/cocina
 * @param {object} req - La solicitud HTTP, que incluye los datos del formulario y el archivo.
 * @param {object} res - La respuesta HTTP que se enviará al cliente.
 * @returns {object} Mensaje indicando si la postulación fue enviada con éxito o error.
 */
router.post('/postulacion/cocina', upload.single('curriculum'), async (req, res) => {
  try {
    await enviarPostulacion(
      'mailengolivera@gmail.com',
      'Nueva Postulación - Cocina',
      req.body,
      req.file
    );
    res.send('Postulación de Cocina enviada correctamente.');
  } catch (err) {
    console.error(err);
    res.status(500).send('Error al enviar postulación de cocina.');
  }
});

/**
 * Ruta para enviar una postulación para el puesto de marketing (con campos distintos).
 * 
 * @route POST /postulacion/marketing
 * @param {object} req - La solicitud HTTP, que incluye los datos del formulario y el archivo.
 * @param {object} res - La respuesta HTTP que se enviará al cliente.
 * @returns {object} Mensaje indicando si la postulación fue enviada con éxito o error.
 */
router.post('/postulacion/marketing', upload.single('archivo'), async (req, res) => {
  try {
    await enviarPostulacion(
      'mailengolivera@gmail.com',
      'Nueva Postulación - Marketing',
      req.body,
      req.file
    );
    res.send('Postulación de Marketing enviada correctamente.');
  } catch (err) {
    console.error(err);
    res.status(500).send('Error al enviar postulación de marketing.');
  }
});

module.exports = router;
