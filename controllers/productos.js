const { response, request } = require('express');
const { Producto, Categoria } = require('../models');

const obtenerProducto = async(req = request, res = response) => {

    // Obtengo el Id pasado por URI
    const { id } = req.params;

    // Busco el producto en BD
    const producto = await Producto.findById( id )
                            .populate('usuario', 'nombre')
                            .populate('categoria', 'nombre');

    res.json({
        producto
    });
};

const obtenerProductos = async(req = request, res = response) => {

    // Obtengo los query params, los parametros que mando despues del ? en la URI
    const { limite = 5, desde = 0 } = req.query;
    const query = { estado: true };

    // Lanzo los dos await en simultaneo, esperando a que
    // los dos finalicen y los devuelvo en el response
    const [ totalRegistros, productos] = await Promise.all([
        Producto.countDocuments( query ),
        Producto.find( query )
        .populate('usuario', 'nombre')
        .populate('categoria', 'nombre')
        .skip( Number( desde ))
        .limit( Number( limite )),
    ]);

    res.json({
        totalRegistros,
        productos,
    });
};


const crearProducto = async(req = request, res = response) => {

    const { precio, descripcion } = req.body;
    const nombre = req.body.nombre.toUpperCase();

    try {        
        // Busco si el producto ingresado existe en BD
        const productoBD = await Producto.findOne({ nombre });
    
        // Verifico que el producto no exista
        if ( productoBD ) {
            return res.status(400).json({
                msg: `El producto ${ productoBD.nombre } ya existe!`
            });
        };

        // Busco el ID de la categoria
        const categoria = req.body.categoria.toUpperCase();
        const categoriaId = await Categoria.findOne({ nombre: categoria });
    
        // Generar la data a guardar
        const data = {
            nombre,
            precio,
            descripcion,
            categoria: categoriaId._id,
            usuario: req.usuarioAutenticado._id
        };
    
        // Guardo en BD
        const producto = new Producto( data );
        await producto.save();
    
        res.status(201).json( producto );

    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Error interno'
        });
    };
};

const actualizarProducto = async(req = request, res = response) => {
    
    const { id } = req.params;
    const { estado, usuario, categoria, ...data } = req.body;

    if ( data.nombre ){
        data.nombre = data.nombre.toUpperCase();

        // Busco si el producto ingresado existe en BD
        const productoBD = await Producto.findOne({ nombre: data.nombre });
        
        // Verifico que el producto no exista
        if ( productoBD ) {
            return res.status(400).json({
                msg: `El producto ${ productoBD.nombre } ya existe!`
            });
        };
    };    

    data.usuario = req.usuarioAutenticado._id;

    // Busco el ID de la categoria si es que vino en el request
    if ( categoria ) {
        const categoriaId = await Categoria.findOne({ categoria });
        data.categoria = categoriaId._id;
    };

    const producto = await Producto.findByIdAndUpdate( id, data, { new: true } );
    
    res.json({
        producto
    });
};

const borrarProducto = async(req, res = response) => {

    const { id } = req.params;

    // Borrado fisico
    // const producto = await Producto.findByIdAndDelete( id );

    // Borrado logico
    const producto = await Producto.findByIdAndUpdate( id, { estado: false }, { new: true } );

    res.json({
        producto
    });
};


module.exports = {
    crearProducto,
    obtenerProducto,
    obtenerProductos,
    actualizarProducto,
    borrarProducto
};
