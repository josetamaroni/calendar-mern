const { response } = require('express');

const crearUsuario = (req, res = response) => {

    const { name, email, password } = req.body;

    res.status(201).send({
        ok: true,
        msg: 'registro'
    });
}

const loginUsuario = (req, res = response) => {

    const { email, password } = req.body;

    res.status(200).send({
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