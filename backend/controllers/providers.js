var express = require('express');
var router = express.Router();

var models = require('../models/index');
var auth = require('./auth');

var settings = require('../config/settings.js');

var request = require('request');

var Providers = models.Providers;

router.get('/github', function(req, res) {
    if (!req.query.code) {
        return res.json({
            error: 'Something went wrong while authenticating with GitHub',
            result: ''
        });
    }

    var requestForm = {
        client_id: settings.githubClientId,
        client_secret: settings.githubClientSecret,
        code: req.query.code
    };

    // Ping the GitHub servers for an access_token
    request.post({ url: 'https://github.com/login/oauth/access_token', headers: {'Accept' : 'application/json'}, form: requestForm }, function(err, response, body) {
        try {
            var access_token = JSON.parse(body).access_token;
        } catch (e) {
            return res.json({
                error: 'Something went wrong while authenticating with GitHub',
                result: ''
            });
        }

        // Store the access_token to the database
        var provider = {
            project_id: 1337, // TODO: make this dynamic
            name: 'github',
            access_token: access_token,
            image: 'http://google.nl'
        };

        Providers.create(provider).then(function() {
            return res.json({
                error: '',
                result: 'Your account has been authenticated with GitHub!'
            });
        });

        return res.json({
            error: 'Something went wrong while authenticating with GitHub',
            result: ''
        });
    });
});

module.exports = router;