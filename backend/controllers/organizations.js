var express = require('express');
var router = express.Router();

var models = require('../models/index');
var auth = require('./auth');

var Organizations = models.Organizations;
var Users = models.Users;

/**
 * Retrieves an organization that the user is part of
 */
router.get('/', auth.isAuthenticated, function(req, res) {
    if (req.user.organization_id == 0 || req.user.organization_id == null) {
        return res.json({
            error: 'You are not a member of an organization!',
            result: ''
        });
    }

    Organizations.find({where: { id: req.user.organization_id }})
        .then(function(organization) {
            if (organization == null) {
                return res.json({
                    error: 'Organization has not been found',
                    result: ''
                });
            }
            return res.json({
                error: '',
                result: organization
            });
        });
});

/**
 * Creates an organization if the user isn't already in one
 */
router.post('/', auth.isAuthenticated, function(req, res) {
    if (req.user.organization_id != null && req.user.organization_id != 0) {
        return res.json({
            error: 'You are already a member of an organization!',
            result: ''
        });
    }
    Organizations.create({
        name: req.body.name
    }).then(function(organization) {
        req.user.organization_id = organization.id;

        req.user.save()
            .then(function() {
                return res.json({
                    error: '',
                    result: organization
                });
            });
    });
});

/**
 * Adds a registered user to the organization
 *
 * TODO: Implement an invite tablekk
 */
router.post('/invite', auth.isAuthenticated, function(req, res) {
    var email = req.body.email;
    var organizationId = req.user.organization_id;

    Users.find({ where: { email: email }})
        .then(function(user) {
            if (user == null) {
                res.json({
                    error: 'User is not a member of Starty!',
                    result: ''
                });
            } else if (user.organization_id != 0 && user.organization_id != null) {
                res.json({
                    error: 'User is already a member of an organization!',
                    result: ''
                });
            } else {
                console.log(req.user);
                user.organization_id = organizationId;
                user.save()
                    .then(function() {
                        res.json({
                            error: '',
                            result: 'The organization has been added to the user!'
                        });
                    });
            }
        });
});

module.exports = router;