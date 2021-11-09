const { response, request } = require('express');
const { subirArchivo } = require('../helpers');

const cargarArchivo = async(req = request, res = response) => {
    
    if (!req.files || Object.keys(req.files).length === 0 || !req.files.archivo) {
      res.status(400).json({msg :'No hay archivos para subir'});
      return;
    };

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


module.exports = {
    cargarArchivo
};
