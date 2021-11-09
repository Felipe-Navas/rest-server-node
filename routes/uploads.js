const { Router } = require('express');
const { check } = require ('express-validator');

const { cargarArchivo } = require('../controllers/uploads');
const { validarJWT } = require('../middlewares');

const { validarCampos } = require('../middlewares/validar-campos');


const router = Router();

router.post('/',[
    validarJWT,
    validarCampos
], cargarArchivo );


module.exports = router;
