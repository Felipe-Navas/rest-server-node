const { Router, response } = require('express');
const { check } = require ('express-validator');

// Con esta importacion estoy tomando el archivo ../middlewares/index.js
const {
    validarCampos,
    validarJWT,
    esAdminRole,
    tieneRole } = require('../middlewares');

const { esRolValido,
        emailExiste,
        usuarioExiste } = require('../helpers/db-validators');

const { usuariosGet,
        usuariosPost,
        usuariosPut,
        usuariosDelete } = require('../controllers/usuarios');

const router = Router();

router.get('/',[
    // Valido los query params
    check('limite','El parametro limite no es un numero').isNumeric().optional(),
    check('desde','El parametro desde no es un numero').isNumeric().optional(),
    validarCampos
], usuariosGet);

router.post('/', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El password debe tener 6 caracteres de longitud').isLength({ min: 6}),
    check('correo', 'El correo no es valido').isEmail(),
    check('correo').custom( emailExiste ),
    
    // De esta manera puedo controlar los valores validos en una lista:
    // check('rol', 'El rol ingresado no es valido').isIn(['ADMIN_ROLE', 'USER_ROLE']),
    
    // Invoco al helper para validar el rol ingresado contra la DB
    check('rol').custom( esRolValido ),
    validarCampos
], usuariosPost);

router.put('/:id',[
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom( usuarioExiste ),
    // Invoco al helper para validar el rol ingresado contra la DB
    check('rol').custom( esRolValido ),
    validarCampos
], usuariosPut);

router.delete('/:id',[
    validarJWT,
    esAdminRole,
    tieneRole('ADMIN_ROLE','VENTAS_ROLE'),
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom( usuarioExiste ),
    validarCampos
], usuariosDelete);


module.exports = router;
