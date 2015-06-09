var bcrypt = require('bcryptjs');
var bodyParser = require('body-parser');
var cors = require('cors');
var express = require('express');
var moment = require('moment');
var jwt = require('jwt-simple');
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

function isAuthenticated(req, res, next) {
    if (!(req.headers && req.headers.authorization)) {
        return res.status(400).send({message: 'You did not provide a JSON Web Token in the Authorization header.'});
    }

    var header = req.headers.authorization.split(' ');
    var token = header[1];
    var payload = jwt.decode(token, settings.tokenSecret);
    var now = moment().unix();

    if (now > payload.exp) {
        return res.status(401).send({message: 'Token has expired.'});
    }

    console.log(payload.sub);

    User.findById(payload.sub, function (err, user) {
        if (!user) {
            return res.status(400).send({message: 'User no longer exists.'});
        }

        req.user = user;
        next();
    });
}

// Include controllers
var messages = require('./controllers/messages');
var users = require('./controllers/users');

// Routes
app.use('/api/messages', messages);
app.use('/api/users', users);

// Run the express server
app.listen(app.get('port'), function() {
    console.log('Express server listening on port ' + app.get('port'));
});

module.exports = app;