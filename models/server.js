const express = require('express');
const cors = require('cors');

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.usuariosPath = '/api/usuarios';

        // Middlewares
        this.middlewares();

        // Rutas de mi aplicacion
        this.routes();
    };

    routes() {
        
        this.app.use(this.usuariosPath, require('../routes/usuarios'));
    };

    middlewares() {

        // CORS
        this.app.use(cors());
        
        // Lectura y parseo del body
        this.app.use( express.json() );
        
        // Directorio publico
        this.app.use( express.static('public'));
    };

    listen() {
        this.app.listen(this.port, () => {
            console.log('Servidor corriendo en el pueto', this.port);
        });        
    };
};



module.exports = Server;