const path = require('node:path');
const http = require('node:http');

const express = require('express');
const cors = require('cors');

const db = require('./src/db/connection');
const AppRoutes = require('./src/routes');
const SocketManager = require('./src/utils/SocketManager.util');

class Server {

    app = null;
    port = null;
    server = null;
    io = null;

    // rutas configuradas en aplicación
    apiPaths = {
        labels: '/api/labels',
    };

    /**
     * inicialización de variables y servicios
     */
    constructor() {
        // inicialización de instancia de servidor
        this.app = express();
        this.server = http.createServer(this.app);
        this.port = process.env.PORT || '3000';

        // se realiza conexión a base de datos y se inicializa conexión de socket
        this.dbConnection(async() => await this.startSocketConnection());

        // inicialización de servicios
        this.middlewares();
        this.staticContent();
        this.routes();
    }

    /**
     * Inicialización de middlewares configurados
     */
    middlewares() {
        this.app.use(cors());
    }

    /**
     * Inicialización de contenido web estático
     */
    staticContent() {
        this.app.use(express.static(path.join(__dirname, 'public')));
    }

    /**
     * Inicialización de conexión a base de datos
     */
    async dbConnection(callback) {
        try {
            
            // se realiza prueba de conexión con intento de autenticación
            await db.authenticate();
            console.log('database online');

            // sincroniza/crea tablas en base a modelos configurados
            await db.sync()
                .then(() => {
                    console.log('database tables successfully sincronized');
                })
                .catch((error) => {
                    console.error('error trying to syncronize tables: ', error);
                });
            
            if(callback) callback();

        } catch (error) {
            throw new Error(error.message);
        }
    }

    /**
     * inicializa rutas de aplicación
     */
    routes() {
        this.app.use(this.apiPaths.labels, AppRoutes.labels);
    }

    /**
     * inicializa servidor y pone en modo escucha
     */
    listen() {
        this.server.listen(this.port, () => {
            console.log(`Server listening in port ${ this.port }`);
        });
    }

    /**
     * inicializa conexión por sockets
     */
    async startSocketConnection() {
        // inicializa socket con instancia de servidor
        SocketManager.init(this.server);
    }
}

module.exports = Server;