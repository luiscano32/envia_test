const { DataTypes } = require('sequelize');
const db = require('../db/connection');

/**
 * Modelo que almacena contador
 */
const LabelCounter = db.define('label_counter', {
    global_counter: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
    },
});

module.exports = LabelCounter;