const { response, request } = require('express');
const { subirArchivo } = require('../helpers');

const { Usuario, Producto } = require('../models');

const cargarArchivo = async(req = request, res = response) => {

    try {
      // Para crear un nuevo directorio dentro de uploads:      
      // const nombre = await subirArchivo( req.files, ['txt', 'md'], 'textos' );
      
      // Subo las imagenes dentro de uploads/img, le paso el undefined ya que tengo en el helper
      // las extensionesValidas donde incluyo a las imagenes
      const nombre = await subirArchivo( req.files, undefined, 'img' );
  
      res.json({ nombre });
    } catch (error) {
      console.log( error );
      res.status(400).json({ msg: error});
    };
};

const actualizarImagen = async(req = request, res = response) => {

  const { id, coleccion } = req.params;

  let modelo;

  switch (coleccion) {
    case 'usuarios':
      modelo = await Usuario.findById(id);
      if ( !modelo ) {
        return res.status(400).json({
          msg: `No existe el usuario con el id ${id}`
        });
      };
      
      break;
  
    case 'productos':
      modelo = await Producto.findById(id);
      if ( !modelo ) {
        return res.status(400).json({
          msg: `No existe el producto con el id ${id}`
        });
      };
      
      break;

    default:
      return res.status(500).json({ msg: 'Error interno en actualizarImagen' });
  };

  const nombre = await subirArchivo( req.files, undefined, coleccion );
  modelo.img = nombre;

  await modelo.save();

  res.json( modelo );
};


module.exports = {
    cargarArchivo,
    actualizarImagen
};
