
const { labelService } = require('../services');

/**
 * Crea un nuevo "label" mediante servicio
 * @param { object } req - objeto con datos de solicitud http
 * @param { object } res - objeto con datos de respuesta http
 * @returns object
 */
const create = async(req, res) => {
    const result = await labelService.create();
    return (result.status === 'success')
        ? res.send(result) 
        : res.status(400).json(result);
};

module.exports = {
    create,
}