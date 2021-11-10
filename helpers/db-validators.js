const { Categoria, Usuario, Producto } = require('../models');
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

// Verificar si la categoria existe por nombre
const categoriaExistePorNombre = async( nombre ) => {

    // Primero hago el upperCase porque asi esta en BD
    nombre = nombre.toUpperCase();

    // Busco la categoria en BD por nombre
    const categoria = await Categoria.findOne({ nombre });
    
    if ( !categoria ) {
        throw new Error(`La categoria con nombre ${ nombre } no existe`);
    };
};

// Verificar si el producto existe
const productoExiste = async( id ) => {
    // Busco el producto en BD
    const producto = await Producto.findById( id );
    
    if ( !producto ) {
        throw new Error(`El producto con id ${ id } no existe`);
    };
};

const coleccionesPermitidas = ( coleccion = '', colecciones = [] ) => {

    const incluida = colecciones.includes( coleccion );
    if ( !incluida ) {
        throw new Error(`La coleccion ${coleccion} no esta permitida - ${colecciones}`)
    };

    return true;
};


module.exports = {
    esRolValido,
    emailExiste,
    usuarioExiste,
    categoriaExiste,
    categoriaExistePorNombre,
    productoExiste,
    coleccionesPermitidas
};
