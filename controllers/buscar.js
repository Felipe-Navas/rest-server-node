const { response, request } = require('express');
const { ObjectId } = require('mongoose').Types;

const { Categoria, Producto, Usuario } = require('../models');

const coleccionesPermitidas = [
    'categorias',
    'productos',
    'roles',
    'usuarios',
];

const buscarCategorias = async( termino = '', res = response) => {

    const esMongoID = ObjectId.isValid( termino );

    // Busqueda por ID
    if ( esMongoID ) {
        const categoria = await Categoria.findById( termino );
        return res.json({
            results: ( categoria ) ? [ categoria ] : []
        });
    };

    // Busqueda por nombre

    // Con esta expresion regular, hago que no sea case sensitive
    const regexp = new RegExp( termino, 'i');

    const categorias = await Categoria.find({ nombre: regexp, estado: true });

    res.json({
        results: categorias
    });
};

const buscarProductos = async( termino = '', res = response) => {

    const esMongoID = ObjectId.isValid( termino );

    // Busqueda por ID
    if ( esMongoID ) {
        const producto = await Producto.findById( termino )
                                .populate('categoria', 'nombre')
                                .populate('usuario', 'nombre');
        return res.json({
            results: ( producto ) ? [ producto ] : []
        });
    };

    // Busqueda por nombre

    // Con esta expresion regular, hago que no sea case sensitive
    const regexp = new RegExp( termino, 'i');

    const productos = await Producto.find({ nombre: regexp, estado: true })
                            .populate('categoria', 'nombre')
                            .populate('usuario', 'nombre');

    res.json({
        results: productos
    });
};

const buscarUsuarios = async( termino = '', res = response) => {

    const esMongoID = ObjectId.isValid( termino );

    // Busqueda por ID
    if ( esMongoID ) {
        const usuario = await Usuario.findById( termino );
        return res.json({
            results: ( usuario ) ? [ usuario ] : []
        });
    };

    // Busqueda por nombre

    // Con esta expresion regular, hago que no sea case sensitive
    const regexp = new RegExp( termino, 'i');

    const usuarios = await Usuario.find({
        $or: [ { nombre: regexp }, { correo: regexp } ],
        $and: [ { estado: true } ]
    });

    res.json({
        results: usuarios
    });
};

const buscar = async(req = request, res = response) => {

    const { coleccion, termino } = req.params;

    if ( !coleccionesPermitidas.includes( coleccion )) {
        return res.status(400).json({
            msg: `La coleccion ${ coleccion } no esta permitida. Las colecciones permitidas son: ${coleccionesPermitidas}`
        });
    };

    switch (coleccion) {
        case 'categorias':
            buscarCategorias( termino, res );
            
        break;
        case 'productos':
            buscarProductos( termino, res );

        break;
        case 'usuarios':
            buscarUsuarios( termino, res );

        break;

        default:
            res.status(500).json({
                msg: 'Error interno en la coleccion'
            });
    };
};


module.exports = {
    buscar
};
