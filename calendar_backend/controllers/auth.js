const { response } = require('express');

const crearUsuario = (req, res = response) => {
    res.send({
        ok: true,
        msg: 'registro'
    });
}

const loginUsuario = (req, res = response) => {
    res.send({
        ok: true,
        msg: 'login'
    });
}
const revalidarToken = (req, res = response) => {
    res.send({
        ok: true,
        msg: 'renew'
    });
}

module.exports = {
    crearUsuario,
    loginUsuario,
    revalidarToken
}