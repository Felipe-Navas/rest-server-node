const { response, request } = require('express');
const { subirArchivo } = require('../helpers');

const cargarArchivo = async(req = request, res = response) => {
    
    if (!req.files || Object.keys(req.files).length === 0 || !req.files.archivo) {
      res.status(400).json({msg :'No hay archivos para subir'});
      return;
    };

    const nombre = await subirArchivo( req.files );

    res.json({ nombre });
};


module.exports = {
    cargarArchivo
};
