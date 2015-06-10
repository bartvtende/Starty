var express = require('express');
var router = express.Router();

var Messages = require('../models/messages');
var auth = require('./auth');

/**
 * Retrieves all messages
 */
router.get('/', auth.isAuthenticated, function(req, res) {
    // Find all the messages
    Messages.find({}, function(err, messages) {
        if (err) {
            return res.json({
                error: err,
                result: ''
            });
        }
        return res.json({
            error: '',
            result: messages
        });
    });
});

/**
 * Creates a message (dirty)
 */
router.post('/', auth.isAuthenticated, function(req, res) {
    var message = new Messages(req.body);

    message.save(function(err) {
        if (err) {
            return res.json({
                error: err,
                result: ''
            });
        }
        return res.json({
            error: '',
            result: 'The message has been created!'
        });
    })
});

module.exports = router;