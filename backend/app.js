var bodyParser = require('body-parser');
var cors = require('cors');
var express = require('express');
var moment = require('moment');
var mongoose = require('mongoose');
var path = require('path');
var request = require('request');
var fs = require('fs');
var Sequelize = require('sequelize');

// Config files
var settings = require('./config/settings');

// MongoDB connection with Mongoose
mongoose.connect('mongodb://' + settings.mongoHost + '/' + settings.mongoDatabase);

// MySQL connection with Sequelize
var sequelize = new Sequelize(settings.sqlDatabase, settings.sqlUsername, settings.sqlPassword, { host: settings.sqlHost, dialect: 'mysql' });

var app = express();

app.set('port', settings.appPort || 3000);

// Enable CORS
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname)));

// Include controllers
var messages = require('./controllers/messages');

// Routes
app.use('/api/messages', messages);

// Run the express server
app.listen(app.get('port'), function() {
    console.log('Express server listening on port ' + app.get('port'));
});

module.exports = app;