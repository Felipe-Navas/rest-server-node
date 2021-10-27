const { response } = require('express');


const usuariosGet = (req, res = response) => {
    res.json({
        "msg": "Get API - controlador"
    });
};

const usuariosPost = (req, res = response) => {
    res.json({
        "msg": "Post API - controlador"
    });
};

const usuariosPut = (req, res = response) => {
    res.json({
        "msg": "Put API - controlador"
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
