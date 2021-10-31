const { Router } = require('express');
const { check } = require ('express-validator');

const Role = require('../models/rol');
const { usuariosGet,
        usuariosPost,
        usuariosPut,
        usuariosDelete } = require('../controllers/usuarios');
const { validarCampos } = require('../middlewares/validar-campos');


const router = Router();

router.get('/', usuariosGet);

router.post('/', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El password debe tener 6 caracteres de longitud').isLength({ min: 6}),
    check('correo', 'El correo no es valido').isEmail(),
    
    // De esta manera puedo controlar los valores validos en una lista:
    // check('rol', 'El rol ingresado no es valido').isIn(['ADMIN_ROLE', 'USER_ROLE']),
    
    // De esta manera puedo controlar los valores validos consultandolos desde la DB
    check('rol').custom( async(rol = '' ) => {
        // Busco el rol en la DB
        const existeRol = await Role.findOne({ rol });

        if ( !existeRol ) {
            throw new Error(`El rol ${ rol } no está registrado en la DB`);
        };
    }),
    validarCampos
], usuariosPost);

router.put('/:id', usuariosPut);

router.delete('/', usuariosDelete);


module.exports = router;