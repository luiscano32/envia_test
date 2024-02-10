const Sequelize = require('sequelize');
const dbConfig = require('./config');

// desestructura propiedades de objeto de configuración
const {
    username,
    password,
    database,
    host,
    dialect,
} = dbConfig;

// inicialización de instancia de ORM sequelize
const sequelize = new Sequelize(database, username, password, {
    host,
    dialect,
    logging: false,
});

module.exports = sequelize;