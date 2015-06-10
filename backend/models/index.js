//http://www.redotheweb.com/2013/02/20/sequelize-the-javascript-orm-in-practice.html
var Sequelize = require('sequelize');
var settings = require('../config/setting');

// Initialize database connection with MySQL
var sequelize = new Sequelize(settings.sqlDatabase, settings.sqlUsername, settings.sqlPassword, { host: settings.sqlHost, dialect: 'mysql' });

// Load models dynamically
var models = [
    'Organizations',
    'Users',
    'Projects'
];

models.forEach(function(model) {
    module.exports[model] = sequelize.import(__dirname + '\\' + model);
});

// Export connection
module.exports.sequelize = sequelize;