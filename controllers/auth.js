const { response, request } = require('express');
const bcryptjs = require('bcryptjs');

const { Usuario } = require('../models');
const { generarJWT } = require('../helpers/generar-jwt');
const { googleVerify } = require('../helpers/google-verify');

const login = async(req = request, res = response) => {

    const { correo, password } = req.body;

    try {
        // Verifico si el correo existe
        const usuario = await Usuario.findOne({ correo });
        if ( !usuario ) {
            return res.status(400).json({
                msg: 'Usuario / Password no son correctos - correo'
            });
        };

        // Verifico si el usuario esta activo
        if ( !usuario.estado ) {
            return res.status(400).json({
                msg: 'Usuario / Password no son correctos - estado: fasle'
            });
        };

        // Verifico la contraseña ingresada
        const validPassword = bcryptjs.compareSync( password, usuario.password );
        if ( !validPassword ) {
            return res.status(400).json({
                msg: 'Usuario / Password no son correctos - password'
            });
        };

        // Genero el JWT
        const token = await generarJWT( usuario.id );
        
        res.json({
            usuario,
            token
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Error interno'
        });
    };
};

const googleSignIn = async(req = request, res = response) => {

    const { id_token } = req.body;

    try {

        const { nombre, img, correo } = await googleVerify( id_token );

        let usuario = await Usuario.findOne({ correo });

        // Si el usuario no existe en mi BD, lo voy a crear
        if ( !usuario ) {
            const data = {
                nombre,
                correo,
                password: 'GenericPassword',
                img,
                google: true
            };

            usuario = new Usuario( data );
            await usuario.save();
        };

        // Valido si el usuario esta habilitado en mi BD
        if ( !usuario.estado ) {
            return res.status(401).json({
                msg: 'Usuario inhabilitado, no puede continuar'
            });
        };

        // Generar el JWT
        const token = await generarJWT( usuario.id );
        
        res.json({
            usuario,
            token
        });
    } catch (error) {
        console.log(error);
        res.status(400).json({
            msg: 'Error al verificar el token'
        });
    };
};


module.exports = {
    login,
    googleSignIn,
};
