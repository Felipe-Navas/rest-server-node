const { response, request } = require('express');

const esAdminRole = ( req = request, res = response, next ) => {

    if ( !req.usuarioAutenticado ) {
        return res.status(500).json({
            msg: 'Se quiere validar el rol sin validar el token antes'
        });
    };

    const { rol, nombre } = req.usuarioAutenticado;

    if ( rol !== 'ADMIN_ROLE' ) {
        return res.status(401).json({
            msg: `${nombre} no esta habilitado para esta acción - Tiene que ser administrador`
        });
    };

    next();
};

const tieneRole = ( ...roles ) => {

    return ( req = request, res = response, next ) => {

        if ( !req.usuarioAutenticado ) {
            return res.status(500).json({
                msg: 'Se quiere validar el rol sin validar el token antes'
            });
        };

        if ( !roles.includes( req.usuarioAutenticado.rol )) {
            return res.status(401).json({
                msg: `Esta operación solo se puede hacer con alguno de estos roles: ${ roles }`
            });
        };

        next();
    };
};

module.exports = {
    esAdminRole,
    tieneRole,
};
