const axios = require('axios');
const LabelCounter = require('./labelCounter.service');
const SocketManager = require('../utils/SocketManager.util');

/**
 * crea un label mediante endpoint y dispara métodos para actualización de contador
 * @returns object
 */
const create = async() => {

    try {

        // datos de prueba obtenidos de documentación
        const sampleData = JSON.stringify({
            origin: {
                name: "oscar mx",
                company: "oskys factory",
                email: "osgosf8@gmail.com",
                phone: "8116300800",
                street: "av vasconcelos",
                number: "1400",
                district: "mirasierra",
                city: "Monterrey",
                state: "NL",
                country: "MX",
                postalCode: "66236",
                reference: ""
            },
            destination: {
                name: "oscar",
                company: "empresa",
                email: "osgosf8@gmail.com",
                phone: "8116300800",
                street: "av vasconcelos",
                number: "1400",
                district: "palo blanco",
                city: "monterrey",
                state: "NL",
                country: "MX",
                postalCode: "66240",
                reference: ""
            },
            packages: [
                {
                    content: "camisetas rojas",
                    amount: 2,
                    type: "box",
                    dimensions: {
                        length: 2,
                        width: 5,
                        height: 5
                    },
                    weight: 63,
                    insurance: 0,
                    declaredValue: 400,
                    weightUnit: "KG",
                    lengthUnit: "CM"
                }
            ],
            shipment: {
                carrier: "fedex",
                service: "ground",
                type: 1
            },
            settings: {
                printFormat: "PDF",
                printSize: "STOCK_4X6",
                comments: "comentarios de el envío"
            }
        });
        
        // configuración de solicitud http
        const config = {
            url: `https://api-test.envia.com/ship/generate/`,
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${ process.env.API_TOKEN }`,
            },
            data: sampleData
        };
        
        const result = await axios(config)
            .then(async(resp) => {

                // valida estatus de solicitud y devuelve datos de error
                if(resp.data.meta === 'error') {
                    return {
                        status: 'error',
                        message: `Error: ${ resp.data.error.message }`,
                    }
                }
                
                // incrementa contador existente
                const newCounter = await LabelCounter.incrementCounter();
                
                // obtiene instancia de socket y emite contador actualizado
                const socket = SocketManager.getMyNamespace();
                socket.emit('CURRENT_COUNTER', newCounter);

                return {
                    status: 'success',
                    message: 'label successfully created',
                }
            })
            .catch((err) => {
                console.error(err.message);
                return {
                    status: 'error',
                    message: 'error trying to create label, please contact sysadmin',
                }
            });

        return result;

    } catch (error) {
        console.error(error.message);
        return {
            status: 'error',
            message: 'error trying to create label, please contact sys admin',
        }
    }
};

module.exports = {
    create,
}