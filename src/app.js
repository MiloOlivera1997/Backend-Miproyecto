const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const cookieParser = require('cookie-parser');
require('dotenv').config({ 
  path: process.env.NODE_ENV === 'production' ? '.env' : '.env.local' 
});
const dbUrl = process.env.DATABASE_URL;



global.Buffer = Buffer;
global.process = process;



app.use(cookieParser());
app.use(express.json());

// Configuración de CORS para permitir solicitudes desde diferentes orígenes
app.use(cors());
// Configuración de middleware para procesar datos en formato URL-encoded y JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());;

const reservasRoutes = require('./routes/reservasRoutes');
const postulacion = require('./routes/postulacion');
  // Rutas para manejar las reservas
/**
 * Usamos las rutas para las reservas definidas en el archivo `reservasRoutes.js`.
 * Estas rutas permiten crear y gestionar reservas.
 */
    
app.use('/', reservasRoutes);

// Rutas para manejar las postulaciones
/**
 * Usamos las rutas para las postulaciones definidas en el archivo `postulacion.js`.
 * Estas rutas permiten gestionar postulaciones para diferentes áreas.
 */
app.use('/', postulacion);

  
 

app.listen(process.env.PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${process.env.PORT}`);
});
