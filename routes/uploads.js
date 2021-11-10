const { Router } = require('express');
const { check } = require ('express-validator');

const { cargarArchivo, actualizarImagen } = require('../controllers/uploads');
const { coleccionesPermitidas } = require('../helpers');
const { validarJWT } = require('../middlewares');

const { validarCampos, validarArchivoASubir } = require('../middlewares');


const router = Router();

router.post('/',[
    validarArchivoASubir,
    validarCampos
], cargarArchivo );

router.put('/:coleccion/:id',[
    validarArchivoASubir,
    check('id', 'No es un ID válido').isMongoId(),
    check('coleccion').custom( coleccion => coleccionesPermitidas( coleccion, ['usuarios', 'productos'] ) ),
    validarCampos
], actualizarImagen );


module.exports = router;
