var express = require('express');
var router = express.Router();

var auth = require('./auth');
var settings = require('../config/settings');

var requestify = require('requestify');

router.get('/:sprintId', auth.isAuthenticated, function(req, res) {
    var sprintId = req.params.sprintId;

    requestify.get(settings.graphUrl + '/' + sprintId)
        .then(function(resp) {
        	console.log(resp);
            return res.json({
                error: '',
                result: resp.getBody()
            });
        });
});

module.exports = router;