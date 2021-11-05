const { Categoria, Usuario } = require('../models');
const Role = require('../models/rol');


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
    
// Verificar si el usuario existe
const usuarioExiste = async( id ) => {
    // Busco el usuario en BD
    const existeUsuario = await Usuario.findById(id);
    
    if ( !existeUsuario ) {
        throw new Error(`El usuario con id ${ id } no existe`);
    };
};

// Verificar si la categoria existe
const categoriaExiste = async( id ) => {
    // Busco la categoria en BD
    const categoria = await Categoria.findById( id );
    
    if ( !categoria ) {
        throw new Error(`La categoria con id ${ id } no existe`);
    };
};

module.exports = {
    esRolValido,
    emailExiste,
    usuarioExiste,
    categoriaExiste
};
