const { Router } = require('express');
const { check } = require ('express-validator');

const { validarJWT,
        validarCampos, 
        esAdminRole} = require('../middlewares');

const { crearProducto,
        obtenerProducto,
        obtenerProductos, 
        actualizarProducto,
        borrarProducto } = require('../controllers/productos');

const { productoExiste,
        categoriaExistePorNombre } = require('../helpers/db-validators');

const router = Router();

// Obtener todos los productos
router.get('/',[
    // Valido los query params
    check('limite','El parametro limite no es un numero').isNumeric().optional(),
    check('desde','El parametro desde no es un numero').isNumeric().optional(),
    validarCampos
], obtenerProductos);

// Obtener un producto por id
router.get('/:id',[
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom( productoExiste ),
    validarCampos
], obtenerProducto);

// Crear un nuevo producto
router.post('/', [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('categoria', 'La categoria es obligatorio').not().isEmpty(),
    check('categoria').custom( categoriaExistePorNombre ),
    validarCampos
], crearProducto);

// Actualizar un roducto por id
router.put('/:id',[
    validarJWT,
    esAdminRole,
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom( productoExiste ),
    validarCampos
], actualizarProducto);

// Borrar un producto
router.delete('/:id',[
    validarJWT,
    esAdminRole,
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom( productoExiste ),
    validarCampos
], borrarProducto);


module.exports = router;
