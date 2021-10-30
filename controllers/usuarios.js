const { response, request } = require('express');
const bcryptjs = require('bcryptjs');
const { validationResult } = require('express-validator');

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

    const errors = validationResult (req);
    if ( !errors.isEmpty() ) {
        return res.status(400).json(errors);
    };

    const { nombre, correo, password, rol } = req.body;
    const usuario = new Usuario({ nombre, correo, password, rol});

    // Verificar si el correo existe
    const existeEmail = await Usuario.findOne({ correo });
    if ( existeEmail ) {
        return res.status(400).json({
            msg: 'El correo ingrsado ya existe en la base de datos'
        });
    };

    // Encriptar la contraseña
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync( password, salt);

    // Guardar en la base de datos
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
