"strict mode";

// obtención de configuraciones iniciales
const dotenv = require('dotenv');
dotenv.config();

// creación e inicialización de instancia de servidor
const Server = require('./server');
const server = new Server();
server.listen();