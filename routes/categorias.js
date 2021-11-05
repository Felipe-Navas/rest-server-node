const { Router } = require('express');
const { check } = require ('express-validator');

const { validarJWT,
        validarCampos, 
        esAdminRole} = require('../middlewares');

const { crearCategoria,
        obtenerCategoria,
        obtenerCategorias, 
        actualizarCategoria,
        borrarCategoria } = require('../controllers/categorias');

const { categoriaExiste, esRolValido } = require('../helpers/db-validators');

const router = Router();

// Obtener todas las categorias
router.get('/',[
    // Valido los query params
    check('limite','El parametro limite no es un numero').isNumeric().optional(),
    check('desde','El parametro desde no es un numero').isNumeric().optional(),
    validarCampos
], obtenerCategorias);

// Obtener una categoria por id
router.get('/:id',[
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom( categoriaExiste ),
    validarCampos
], obtenerCategoria);

// Crear una nueva categoria
router.post('/', [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    validarCampos
], crearCategoria);

// Actualizar una categoria por id
router.put('/:id',[
    validarJWT,
    esAdminRole,
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom( categoriaExiste ),
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    validarCampos
], actualizarCategoria);

// Borrar una categoria
router.delete('/:id',[
    validarJWT,
    esAdminRole,
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom( categoriaExiste ),
    validarCampos
], borrarCategoria);


module.exports = router;
