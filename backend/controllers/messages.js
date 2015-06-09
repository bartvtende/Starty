var express = require('express');
var router = express.Router();

var Messages = require('../models/messages');

/**
 * Retrieves all messages
 */
router.get('/', function(req, res) {
    // Find all the messages
    Messages.find({}, function(err, messages) {
        if (err) {
            return res.json([{
                error: err,
                result: ''
            }]);
        }
        return res.json([{
            error: '',
            result: messages
        }]);
    });
});

/**
 * Creates a message (dirty)
 */
router.post('/', function(req, res) {
    var message = new Messages(req.body);

    message.save(function(err) {
        if (err) {
            return res.json([{
                error: err,
                result: ''
            }]);
        }
        return res.json([{
            error: '',
            result: 'The message has been created!'
        }]);
    })
});

module.exports = router;