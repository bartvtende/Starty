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
var settings = require('./config/settings');

// MongoDB connection with Mongoose
mongoose.connect('mongodb://' + settings.mongoHost + '/' + settings.mongoDatabase);

var app = express();

//var http = require('http').Server(app);
var io = require('socket.io')(1338);

app.set('port', settings.appPort || 3000);

// Enable CORS
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname)));

var Messages = require('./models/messages');
var auth = require('./controllers/auth');

// Socket.io: chat message
io.on('connect', function(socket){
    socket.on('chat message', function(msg){
        try {
            var json = JSON.parse(msg);
        } catch (e) {
            return false;
        }
        console.log(msg);

        // TODO: Send to DB
        if (json.projectId == null) {
            return false;
        }

        var messageInput = {
            projectId: json.projectId,
            senderId: json.userId,
            message: json.message
        };

        if (json.receiverId != null) {
            messageInput.receiverId = json.receiverId;
        }

        var message = new Messages(messageInput);

        message.save(function(err) {
            if (err) {
                return false;
            }

            io.emit('receive', json.message);
        });

        //io.broadcast.to(2).emit('receive', msg.message);
    });
});

// Include controllers
var messages = require('./controllers/messages');
var users = require('./controllers/users');
var organizations = require('./controllers/organizations');
var projects = require('./controllers/projects');
var items = require('./controllers/items');

// Routes
app.use('/api/messages', messages);
app.use('/api/users', users);
app.use('/api/organizations', organizations);
app.use('/api/projects', projects);
app.use('/api/items', items);

// Run the express server
app.listen(app.get('port'), function() {
    console.log('Express server listening on port ' + app.get('port'));
});

module.exports = app;