
const LabelCounterService = require('../models/labelCounter.model');

class LabelCounter {

    /**
     * Obtiene contador actual desde base de datos
     * @returns integer
     */
    static async getCounter() {
        // obtiene registros de base de datos mediante modelo
        const getGlobalCounter = await LabelCounterService.findAll();

        // valida si existe registro creado de contador
        if(getGlobalCounter.length === 0) await this.#initCounter();

        // valida si fue encontrado algún registro o devuelve default
        const globalCounter = (getGlobalCounter.length > 0)
            ? getGlobalCounter[0].dataValues.global_counter
            : 0;

        return globalCounter;
    }

    /**
     * Incrementa valor de contador
     */
    static async incrementCounter() {

        // obtiene último contador lo incrementa
        const currentCounter = await this.getCounter();
        const newCounter = currentCounter + 1;

        // actualiza contador en base de datos
        const result = await LabelCounterService.update(
            { global_counter: newCounter},
            { where: { id: 1 } }
            );
            
        return newCounter;        
    }

    /**
     * Inicializa contador con valor por default
     */
    static async #initCounter() {
        await LabelCounterService.create({global_counter:0});
    }
}

module.exports = LabelCounter;