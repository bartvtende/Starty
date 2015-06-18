var express = require('express');
var router = express.Router();

var models = require('../models/index');
var settings = require('../config/settings');
var auth = require('./auth');

var request = require('request');

var Providers = models.Providers;

/**
 * Lists all the repositories from the user
 */
router.get('/:projectId/repositories', auth.isAuthenticated, function(req, res) {
    var projectId = req.params.projectId;

    Providers
        .find({ where: { project_id: projectId }})
        .then(function(provider) {
            if (provider == null || provider.access_token == null) {
                return res.json({
                    error: 'There are no providers for this project',
                    result: ''
                });
            }

            requestify.request('https://api.github.com/user/repos', {
                method: 'GET',
                headers: { 'Authorization': 'token ' + provider.access_token }
            }).then(function (resp) {
                if(resp.getCode() == 200) {
                    var list = [];
                    var body = resp.getBody();

                    for (var i = 0; i < body.length; i++) {
                        list.push({ id: body[i].id, name: body[i].name, owner: body[i].owner.login, perms: body[i].permissions.admin })
                    }

                    return res.json({
                        error: '',
                        result: list
                    });
                } else {
                    return res.json({
                        error: 'Error retrieving GitHub data',
                        result: ''
                    })
                }
            })
        });
});

router.post('/:projectId/webhook', auth.isAuthenticated, function(req, res) {
    if (req.body.owner == null || req.body.repo == null) {
        return res.json({
            error: 'Wrong input!',
            result: ''
        });
    }

    var projectId = req.params.projectId;

    Providers
        .find({ where: { project_id: projectId }})
        .then(function(provider) {
            if (provider == null || provider.access_token == null) {
                return res.json({
                    error: 'There are no providers for this project',
                    result: ''
                });
            }

            var requestBody = {
                name: 'web',
                active: true,
                events: [
                    'push',
                    'pull_requests'
                ],
                config: {
                    url: settings.baseUrl + '/github/' + projectId + '/webhook/event',
                    content_type: 'json'
                }
            };

            //requestify.request('https://api.github.com/repos/' + req.body.owner + '/' + req.body.repo + '/hooks', {
            //    method: 'POST',
            //    headers: {'Authorization': 'token ' + provider.access_token},
            //    body: JSON.stringify(requestBody), // Make it into a string
            //    dataType: 'json'
            //}).then(function(response) {
            //    if (response.getCode() == 200) {
            //        return res.json({
            //            error: '',
            //            result: 'The webhook has been created!'
            //        });
            //    } else {
            //        return res.json({
            //            error: 'Something went wrong while creating the webhook!',
            //            result: ''
            //        });
            //    }
            //});

            console.log(JSON.stringify(requestBody));

            request.post({
                url: 'https://api.github.com/repos/' + req.body.owner + '/' + req.body.repo + '/hooks',
                json: requestBody,
                headers: {'Authorization': 'token ' + provider.access_token, 'User-Agent': 'bartvtende'}
            }, function (error, response, body) {
                if (!error && response.statusCode == 200) {
                    return res.json({
                        error: '',
                        result: 'The webhook has been created!'
                    });
                } else {
                    return res.json({
                        error: body,
                        result: ''
                    });
                }
            });
        });
});

router.post('/:projectId/webhook/event', function(req, res) {
    console.log(res.body);
    res.json({
        error: '',
        result: 'Yay!'
    });
});

module.exports = router;