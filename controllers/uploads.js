const path = require('path');
const fs = require('fs');

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

  // Validar si ya existe una img previa y borrarla para subir la nueva
  try {
    if ( modelo.img ) {

      // Borro la imagen existente
      const pathImagen = path.join( __dirname, '../uploads', coleccion, modelo.img );
      if ( fs.existsSync( pathImagen ) ) {
        fs.unlinkSync( pathImagen );
      };
    };
    
  } catch (error) {
    console.log( error );
    res.status(500).json({ msg: error});
  };

  // Subo la nueva imagen
  const nombre = await subirArchivo( req.files, undefined, coleccion );
  modelo.img = nombre;

  await modelo.save();

  res.json( modelo );
};

const obtenerImagen = async(req = request, res = response) => {

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
      return res.status(500).json({ msg: 'Error interno en obtenerImagen' });
  };

  // Validar si ya existe una img en el modelo
  try {
    if ( modelo.img ) {

      // Si la imagen existe, la envio en el response
      const pathImagen = path.join( __dirname, '../uploads', coleccion, modelo.img );
      if ( fs.existsSync( pathImagen ) ) {
        return res.sendFile( pathImagen );
      };
    };
    
    // Si la imagen no existe, envio el assets/no-image.jpg
    const pathNoImage = path.join( __dirname, '../assets/no-image.jpg' );
    if ( fs.existsSync( pathNoImage ) ) {
      return res.sendFile( pathNoImage );
    };
  } catch (error) {
    console.log( error );
    res.status(500).json({ msg: error});
  };

  res.json( {msg: `La imagen de ${coleccion} solicitada no existe`} );
};


module.exports = {
    cargarArchivo,
    actualizarImagen,
    obtenerImagen
};
