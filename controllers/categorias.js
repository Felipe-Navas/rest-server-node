const { response, request } = require('express');
const { Categoria } = require('../models');

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


module.exports = { crearCategoria };
