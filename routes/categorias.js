const { Router } = require('express');
const { check } = require ('express-validator');

const { validarJWT, validarCampos } = require('../middlewares');
const { crearCategoria } = require('../controllers/categorias');

const router = Router();

// Obtener todas las categorias
router.get('/', ( req, res ) => {
    res.json('get obtener categorias');
});

// Obtener una categoria por id
router.get('/:id', ( req, res ) => {
    res.json('get categoria por id');
});

// Crear una nueva categoria
router.post('/', [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    validarCampos
], crearCategoria);

// Actualizar una categoria por id
router.put('/:id', ( req, res ) => {
    res.json('put actualizar categoria');
});

// Borrar una categoria
router.delete('/:id', ( req, res ) => {
    res.json('delete borrar categoria');
});


module.exports = router;
