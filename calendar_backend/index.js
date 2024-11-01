const express = require('express');
require('dotenv').config();

// Crear el servidor
const app = express();

// Directorio Público
app.use( express.static('public') )

// Rutas
app.use( '/api/auth/', require('./routes/auth') )


// Escuchar peticiones
app.listen( process.env.PORT,()=>{
    console.log(`Servidor corriendo en el puerto 4000`)
})