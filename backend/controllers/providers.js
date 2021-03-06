var express = require('express');
var router = express.Router();

var models = require('../models/index');
var auth = require('./auth');

var settings = require('../config/settings.js');

var requestify = require('requestify');

var Providers = models.providers;
var Projects = models.projects;

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

    // Ping the GitHub servers for an
    requestify.request('https://github.com/login/oauth/access_token', {
        method: 'POST',
        headers: { 'Accept' : 'application/json' },
        body: requestForm
    }).then(function (resp) {
        try {
            console.log(resp.getBody());
            var access_token = resp.getBody().access_token;
        } catch (e) {
            return res.json({
                error: 'Something went wrong while authenticating with GitHub',
                result: ''
            });
        }

        if (access_token == null) {
            return res.json({
                error: 'Something went wrong while authenticating with GitHub',
                result: ''
            });
        }

        Projects.find({ order: 'createdAt DESC' })
            .then(function(project) {
                // Store the access_token to the database
                var provider = {
                    project_id: 31,
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
});

module.exports = router;