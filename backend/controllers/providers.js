var express = require('express');
var router = express.Router();

var models = require('../models/index');
var auth = require('./auth');

var settings = require('../config/settings.js');

var requestify = require('requestify');

var Providers = models.providers;

router.post('/github', auth.isAuthenticated, function(req, res) {
    if (!req.body.code) {
        return res.json({
            error: 'Something went wrong while authenticating with GitHub',
            result: ''
        });
    }

    var requestForm = {
        client_id: settings.githubClientId,
        client_secret: settings.githubClientSecret,
        code: req.body.code
    };

    // Ping the GitHub servers for an
    requestify.request('https://github.com/login/oauth/access_token', {
        method: 'POST',
        headers: { 'Accept' : 'application/json' },
        body: requestForm
    }).then(function (resp) {
        try {
            var access_token = resp.getBody().access_token;
        } catch (e) {
            return res.json({
                error: 'Something went wrong while authenticating with GitHub',
                result: ''
            });
        }

        // Store the access_token to the database
        var provider = {
            user_id: req.user.id,
            name: 'github',
            access_token: access_token,
            image: 'http://google.nl'
        };

        Providers.create(provider)
            .then(function() {
                return res.json({
                    error: '',
                    result: 'Your account has been authenticated with GitHub!'
                });
            })
            .then(function() {
                return res.json({
                    error: 'Something went wrong while authenticating with GitHub',
                    result: ''
                });
            });
    });
});

module.exports = router;