
const LabelCounter = require('../services/labelCounter.service');

let io;
let myNamespace;

module.exports = {
    /**
     * inicializa conexión de socket.io
     * @param { object } server - instancia de objeto de servidor
     * @returns object
     */
    init: (server) => {
        // configuraciones de socket.io
        io = require('socket.io')(server, {
            cors: {
            origin: "*", 
            methods: ["GET", "POST"]
            }
        });

        // se genera conexión mediante namespace
        const nameSpace = 'envia_test';
        myNamespace = io.of(`/${nameSpace}`);
        console.log(`namespace generated: ${nameSpace}`);

        // inicializa conexión y devuelve instancia
        myNamespace.on('connection', async(socket) => {
    
            // obtiene valor actual del contador
            const counter = await LabelCounter.getCounter();

            // emite valor del contador por medio del socket
            socket.emit('CURRENT_COUNTER', counter);

            console.log(`new client connected in namespace: ${nameSpace}`);
        });

        return io;
    },

    /**
     * devuelve instancia de socket.io
     * @returns object
     */
    getIO: () => {
        if (!io) {
            throw new Error("socket.io not initialized!");
        }
        return io;
    },

    /**
     * devuelve namespace de socket.io
     * @returns object
     */
    getMyNamespace: () => {
        if (!myNamespace) {
            throw new Error("namespace not initialized!");
        }
        return myNamespace;
    }
};
