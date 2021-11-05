const { response, request } = require('express');
const jwt = require('jsonwebtoken');

const Usuario = require('../models/usuario');

const validarJWT = async( req = request, res = response, next ) => {

    const token = req.header('x-token');

    if ( !token ) {
        return res.status(401).json({
            msg: 'Es necesario el token para continuar'
        });
    };

    try {
        // Valido que el token sea valido, y guardo el uid que viene en el payload
        const { uid } = jwt.verify( token, process.env.SECRETOPRIVATEKEY );

        // Agrego el uid al request
        req.uid = uid;

        // Obtengo el usuario autenticado
        const usuarioAutenticado = await Usuario.findById( uid );

        // Valido que el usuarioAutenticado exista en BD
        if ( !usuarioAutenticado ) {
            return res.status(401).json({
                msg: 'Token no válido - No existe usuario en BD'
            });
        };
        
        // Validar que el usuario autenticado este activo
        if ( !usuarioAutenticado.estado ) {
            return res.status(401).json({
                msg: 'Token no válido - Usuario inhabilitado'
            });
        };
        
        req.usuarioAutenticado = usuarioAutenticado;
        next();
    } catch (error) {
        console.log(error);
        res.status(401).json({
            msg: 'Token no válido'
        });        
    };
};


module.exports = {
    validarJWT
};
