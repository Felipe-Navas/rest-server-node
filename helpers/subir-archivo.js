const path = require('path');
const { v4: uuidv4 } = require('uuid');

const subirArchivo = ( files, extensionesValidas = ['png', 'jpg', 'jpeg', 'gif'], folder = '' ) => {

    return new Promise( (resolve, reject) => {

        const { archivo } = files;
        const nombreCortado = archivo.name.split('.');
        const extension = nombreCortado[ nombreCortado.length -1 ];

        // Validar la extension del archivo       
        if ( !extensionesValidas.includes( extension ) ) {
            return reject(`La extensión ${ extension } no es permitida - ${ extensionesValidas }`);
        };

        const nombreTmp = uuidv4() + '.' + extension;
        const uploadPath = path.join(__dirname, '../uploads/', folder, nombreTmp);

        archivo.mv(uploadPath, (err) => {
            if (err) {
                return reject( err );
            };

            resolve( nombreTmp );
        });
    });
};


module.exports = {
    subirArchivo
};
