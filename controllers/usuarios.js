const { response, request } = require('express');


const usuariosGet = (req = request, res = response) => {

    const { q, nombre = "No name", edad} = req.query;

    res.json({
        "msg": "Get API - controlador",
        q,
        nombre,
        edad
    });
};

const usuariosPost = (req, res = response) => {

    const { nombre, edad} = req.body;
    res.json({
        "msg": "Post API - controlador",
        nombre,
        edad
    });
};

const usuariosPut = (req, res = response) => {
    
    const { id } = req.params
    
    res.json({
        "msg": "Put API - controlador",
        id
    });
};

const usuariosDelete = (req, res = response) => {
    res.json({
        "msg": "Delete API - controlador"
    });
};

module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosDelete,
};
