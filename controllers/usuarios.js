const { response, request } = require('express');
const bcryptjs = require('bcryptjs');

const Usuario = require('../models/usuario');


const usuariosGet = async(req = request, res = response) => {

    // Obtengo los query params, los parametros que mando despues del ? en la URI
    const { limite = 5, desde = 0 } = req.query;
    const query = { estado: true };

    // Como aca tengo dos await, puedo lanzarlos en simultaneo para
    // optimizar el tiempo de respues y devolver los dos resultados
    // const usuarios = await Usuario.find( query )
    //    .skip( Number( desde ))
    //    .limit( Number( limite ));
    
    // const totalRegistros = await Usuario.countDocuments( query );

    // Lanzo los dos await en simultaneo, pero con este await, espero a que
    // los dos finalicen y los devuelvo en el response
    const [ totalRegistros, usuarios] = await Promise.all([
        Usuario.countDocuments( query ),
        Usuario.find( query )
        .skip( Number( desde ))
        .limit( Number( limite )),
    ])

    res.json({
        totalRegistros,
        usuarios,
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

    const usuario = await Usuario.findByIdAndUpdate( id, resto );
    
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
