/*
    Rutas de Usuarios
    host + /api/auth/
*/

const { Router } = require('express');
const { crearUsuario, loginUsuario, revalidarToken } = require('../controllers/auth');
const router = Router();

// crear nuevo usuario
router.post('/new', crearUsuario)

// Login del usuario
router.post('/', loginUsuario)

// Generar otro token
router.get('/renew', revalidarToken)

module.exports = router;