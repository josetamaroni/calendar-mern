const express = require('express');
require('dotenv').config();

console.log( process.env )
// Crear el servidor
const app = express();

// Directorio Público
app.use( express.static('public') )

// Rutas
app.get('/', (req, res) => {
    res.send({
        ok: true
    });
})

// Escuchar peticiones
app.listen( process.env.PORT,()=>{
    console.log(`Servidor corriendo en el puerto 4000`)
})