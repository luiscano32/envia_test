const { Router } = require('express');

const router = Router();
const { labelController } = require('../controllers');

/**
 * Inicialización de rutas
 */
router.post('/', labelController.create);

module.exports = router;