var express = require('express');
var router = express.Router();

var models = require('../models/index');
var auth = require('./auth');

var Organizations = models.organizations;
var Users = models.users;

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
 * Returns all users within this organization
 */
router.get('/users', auth.isAuthenticated, function(req, res) {
    if (req.user.organization_id == 0 || req.user.organization_id == null) {
        return res.json({
            error: 'You are currently not in an organization',
            result: ''
        });
    }

    Users.findAll({where : { organization_id: req.user.organization_id}})
        .then(function(users) {
            if (users.length == 0) {
                return res.json({
                    error: 'There are no users in this organization',
                    result: ''
                });
            }

            return res.json({
                error: '',
                result: users
            });
        });
});

/**
 * Adds a registered user to the organization
 *
 * TODO: Implement an invite table
 */
router.post('/invite', auth.isAuthenticated, function(req, res) {
    var email = req.body.email;
    var organizationId = req.user.organization_id;

    Users.find({ where: { email: email }})
        .then(function(user) {
            if (user == null) {
                return res.json({
                    error: 'User is not a member of Starty!',
                    result: ''
                });
            } else if (user.organization_id != 0 && user.organization_id != null) {
                return res.json({
                    error: 'User is already a member of an organization!',
                    result: ''
                });
            } else {
                user.organization_id = organizationId;
                user.save()
                    .then(function() {
                        return res.json({
                            error: '',
                            result: 'The organization has been added to the user!'
                        });
                    });
            }
        }, function(err) {
            console.log(err);
        });
});

module.exports = router;