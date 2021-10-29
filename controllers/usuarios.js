const { response, request } = require('express');
const Usuario = require('../models/usuario');


const usuariosGet = (req = request, res = response) => {

    const { q, nombre = "No name", edad} = req.query;

    res.json({
        "msg": "Get API - controlador",
        q,
        nombre,
        edad
    });
};

const usuariosPost = async(req, res = response) => {

    const body = req.body;
    const usuario = new Usuario(body);

    await usuario.save();

    res.json({
        usuario
    });
};

const usuariosPut = (req, res = response) => {
    
    const { id } = req.params
    
    res.json({
        "msg": "Put API - controlador",
        id
    });
};

const usuariosDelete = (req, res = response) => {
    res.json({
        "msg": "Delete API - controlador"
    });
};

module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosDelete,
};
