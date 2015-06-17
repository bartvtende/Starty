var Sequelize = require('sequelize');
var settings = require('../config/settings');

// Initialize database connection with MySQL
var sequelize = new Sequelize(settings.sqlDatabase, settings.sqlUsername, settings.sqlPassword, { logging: false, host: settings.sqlHost, dialect: 'mysql' });

// Load models dynamically
var models = [
    'Organizations',
    'Users',
    'Projects',
    'Backlog',
    'Issues',
    'Providers'
];

models.forEach(function(model) {
    module.exports[model] = sequelize.import(__dirname + '\\' + model);
});

// Export connection
module.exports.sequelize = sequelize;