var express = require('express');
var router = express.Router();

var Messages = require('../models/messages');
var auth = require('./auth');

/**
 * Retrieves all global messages for a project
 */
router.get('/:projectId', auth.isAuthenticated, function(req, res) {
    var projectId = req.params.projectId;
    var limit = 25;

    // Find all the messages
    Messages
        .find({ projectId: projectId })
        .where('receiverId').equals(null)
        .limit(limit)
        .sort('+createdAt')
        .exec(function(err, messages) {
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
 *
 */
router.get('/:projectId/:userId', auth.isAuthenticated, function(req, res) {
    var projectId = req.params.projectId;
    var userId = req.params.userId;
    var limit = 25;

    // Find all the messages
    Messages
        .find({ projectId: projectId })
        .where('receiverId').in([userId, req.user.id])
        .where('senderId').in([userId, req.user.id])
        .limit(limit).sort('+createdAt')
        .exec(function(err, messages) {
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
    if (req.body.projectId == null) {
        return res.json({
            error: 'Project has not been found!',
            result: ''
        });
    }

    var messageInput = {
        projectId: req.body.projectId,
        senderId: req.user.id,
        message: req.body.message
    };

    if (req.body.receiverId != null) {
        messageInput.receiverId = req.body.receiverId;
    }

    var message = new Messages(messageInput);

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