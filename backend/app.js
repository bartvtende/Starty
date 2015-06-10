var bcrypt = require('bcryptjs');
var bodyParser = require('body-parser');
var cors = require('cors');
var express = require('express');
var moment = require('moment');
var mongoose = require('mongoose');
var path = require('path');
var request = require('request');
var fs = require('fs');

// Config files
var settings = require('./config/setting');

// MongoDB connection with Mongoose
mongoose.connect('mongodb://' + settings.mongoHost + '/' + settings.mongoDatabase);

var app = express();

app.set('port', settings.appPort || 3000);

// Enable CORS
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname)));

// Include controllers
var messages = require('./controllers/messages');
var users = require('./controllers/users');
var organizations = require('./controllers/organizations');
var projects = require('./controllers/projects');

// Routes
app.use('/api/messages', messages);
app.use('/api/users', users);
app.use('/api/organizations', organizations);
app.use('/api/projects', projects);

// Run the express server
app.listen(app.get('port'), function() {
    console.log('Express server listening on port ' + app.get('port'));
});

module.exports = app;