var express = require('express');
var router = express.Router();

var Messages = require('../models/messages');
var auth = require('./auth');

/**
 * Retrieves all global messages for a project
 */
router.get('/:projectId', auth.isAuthenticated, function(req, res) {
    var projectId = req.params.projectId;
    var limit = 100;

    // Find all the messages
    Messages
        .find({ projectId: projectId })
        .where('receiverId').equals(null)
        .limit(limit)
        .sort({ createdAt: 'asc' })
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
 * Find the messages for a private conversation
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

module.exports = router;