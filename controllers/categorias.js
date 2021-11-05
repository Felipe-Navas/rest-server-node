const { response, request } = require('express');
const { Categoria } = require('../models');

const obtenerCategoria = async(req = request, res = response) => {

    // Obtengo el Id pasado por URI
    const { id } = req.params;

    // Busco la categoria en BD
    const categoria = await Categoria.findById( id );

    res.json({
        categoria
    });
};

const obtenerCategorias = async(req = request, res = response) => {

    // Obtengo los query params, los parametros que mando despues del ? en la URI
    const { limite = 5, desde = 0 } = req.query;
    const query = { estado: true };

    // Lanzo los dos await en simultaneo, esperando a que
    // los dos finalicen y los devuelvo en el response
    const [ totalRegistros, categorias] = await Promise.all([
        Categoria.countDocuments( query ),
        Categoria.find( query )
        .populate('usuario')
        .skip( Number( desde ))
        .limit( Number( limite )),
    ]);

    res.json({
        totalRegistros,
        categorias,
    });
};


const crearCategoria = async(req = request, res = response) => {

    const nombre = req.body.nombre.toUpperCase();

    try {        
        // Busco si la categoria ingresada existe en BD
        const categoriaBD = await Categoria.findOne({ nombre });
    
        // Verifico que la categoria no exista
        if ( categoriaBD ) {
            return res.status(400).json({
                msg: `La categoria ${ categoriaBD.nombre } ya existe!`
            });
        };
    
        // Generar la data a guardar
        const data = {
            nombre,
            usuario: req.usuarioAutenticado._id
        };
    
        // Guardo en BD
        const categoria = new Categoria( data );
        await categoria.save();
    
        res.status(201).json( categoria );

    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Error interno'
        });
    };
};

const actualizarCategoria = async(req = request, res = response) => {
    
    const { id } = req.params;
    const { nombre } = req.body;

    const categoria = await Categoria.findByIdAndUpdate( id, nombre );
    
    res.json({
        categoria
    });
};

const borrarCategoria = async(req, res = response) => {

    const { id } = req.params;

    // Borrado fisico
    // const categoria = await Categoria.findByIdAndDelete( id );

    // Borrado logico
    const categoria = await Categoria.findByIdAndUpdate( id, { estado: false } );

    res.json({
        categoria
    });
};


module.exports = {
    crearCategoria,
    obtenerCategoria,
    obtenerCategorias,
    actualizarCategoria,
    borrarCategoria
};
