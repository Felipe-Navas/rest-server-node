const { Router } = require('express');
const { check } = require ('express-validator');

const { cargarArchivo,
        // actualizarImagen,
        // obtenerImagen,
        actualizarImagenCloudinary,
        obtenerImagenCloudinary } = require('../controllers/uploads');
const { coleccionesPermitidas } = require('../helpers');
const { validarCampos,
        validarArchivoASubir } = require('../middlewares');


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
], actualizarImagenCloudinary );
//], actualizarImagen );

router.get('/:coleccion/:id',[
    check('id', 'No es un ID válido').isMongoId(),
    check('coleccion').custom( coleccion => coleccionesPermitidas( coleccion, ['usuarios', 'productos'] ) ),
    validarCampos
], obtenerImagenCloudinary );
//], obtenerImagen );


module.exports = router;
