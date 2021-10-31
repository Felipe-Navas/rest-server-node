const Role = require('../models/rol');
const Usuario = require('../models/usuario');

// De esta manera puedo controlar los valores validos consultandolos desde la DB
const esRolValido = async(rol = '' ) => {
    // Busco el rol en BD
    const existeRol = await Role.findOne({ rol });

    if ( !existeRol ) {
        throw new Error(`El rol ${ rol } no está registrado en la DB`);
    };
};

// Verificar si el correo existe
const emailExiste = async(correo = '') => {
    // Busco el correo en BD
    const existeEmail = await Usuario.findOne({ correo });
    
    if ( existeEmail ) {
        throw new Error(`El correo ${ correo } ya está registrado`);
    };
};
    

module.exports = {
    esRolValido,
    emailExiste,
};