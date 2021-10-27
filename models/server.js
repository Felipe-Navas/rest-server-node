const express = require('express');

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;

        // Middlewares
        this.middlewares();

        // Rutas de mi aplicacion
        this.routes();
    };

    routes() {
        this.app.get('/api', (req, res) => {
            res.json({
                "ok": true,
                "msg": "get API",
            })
          });
    };

    middlewares() {
        // Directorio publico
        this.app.use( express.static('public') );
    };

    listen() {
        this.app.listen(this.port, () => {
            console.log('Servidor corriendo en el pueto', this.port);
        });        
    };
};



module.exports = Server;