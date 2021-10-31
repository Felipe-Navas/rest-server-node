const { response, request } = require('express');
const bcryptjs = require('bcryptjs');

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

    const { nombre, correo, password, rol } = req.body;
    const usuario = new Usuario({ nombre, correo, password, rol});

    // Encriptar la contraseña
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync( password, salt);

    // Guardar en BD
    await usuario.save();

    res.json({
        usuario
    });
};

const usuariosPut = async(req, res = response) => {
    
    const { id } = req.params
    const { _id, password, google, correo, ...resto } = req.body;

    // Validar el ID

    // Si viene el password, significa que hay que actualizarlo
    if ( password ) {
        // Encriptar la contraseña
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync( password, salt);
    };

    const usuario = await Usuario.findByIdAndUpdate( id, resto);
    
    res.json({
        usuario
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
