var express = require('express');
var bcrypt = require('bcryptjs');

var router = express.Router();

var models = require('../models/index');
var auth = require('./auth');

var Users = models.users;

/**
 * Returns the logged in user
 */
router.get('/', auth.isAuthenticated, function(req, res) {
    req.user.password = '';
    return res.json({
        error: '',
        result: req.user
    });
});

/**
 * Returns all users in the organization, including yourself
 */
router.get('/all', auth.isAuthenticated, function(req, res) {
    if (req.user.organization_id == 0 || req.user.organization_id == null) {
        return res.json({
            error: 'You are currently not in an organization',
            result: ''
        });
    }

    Users.findAll({ where: { organization_id: req.user.organization_id }})
        .then(function(users) {
            users = users.filter(function(n){ return n != undefined });

            return res.json({
                error: '',
                result: users
            });
        });
});

/**
 * Enables the user to login to the application
 */
router.post('/login', function(req, res) {
    Users.find({ where: { email: req.body.email }})
        .then(function(user) {
            if (!user) {
                return res.status(401).json({
                    error: { email: 'Incorrect email' },
                    result: ''
                });
            }

            bcrypt.compare(req.body.password, user.password, function(err, isMatch) {
                if (!isMatch) {
                    return res.status(401).json({
                        error: { password: 'Incorrect password' },
                        result: ''
                    });
                }

                user.password = '';

                var token = auth.createToken(user);

                return res.json({
                    token: token,
                    user: user
                });
            });
    });
});

/**
 * Enables the user to register for the application
 */
router.post('/register', function(req, res) {
    Users.find({ where: { email: req.body.email }})
        .then(function(user) {
            if (user) {
                return res.status(422).json({
                    error: 'Email is already taken.',
                    result: ''
                });
            }

            var user = {
                email: req.body.email,
                password: req.body.password,
                name: req.body.name
            };

            bcrypt.genSalt(10, function (err, salt) {
                bcrypt.hash(user.password, salt, function (err, hash) {
                    user.password = hash;

                    Users.create(user)
                        .then(function (user) {
                            user.password = '';

                            var token = auth.createToken(user);

                            return res.json({
                                token: token,
                                user: user
                            });
                        });
                });
            });
        });
});

/**
 * Enables the user to change their password
 */
router.post('/forgot-password', function(req, res) {
    Users.find({ where: { email: req.body.email }})
        .then(function(user) {
            if (user == null) {
                return res.status(401).json({
                    error: 'There is no such user!',
                    result: ''
                });
            }
            bcrypt.compare(req.body.old_password, user.password, function(err, isMatch) {
                if (!isMatch) {
                    return res.status(401).json({
                        error: { old_password: 'Incorrect old password' },
                        result: ''
                    });
                }

                if (req.body.new_password != req.body.new_password_confirmation || req.body.new_password == undefined) {
                    return res.status(401).json({
                        error: { new_password: 'The two new passwords don\'t match!' },
                        result: ''
                    });
                }

                bcrypt.genSalt(10, function (err, salt) {
                    bcrypt.hash(req.body.new_password, salt, function (err, hash) {
                        user.password = hash;

                        user.save()
                            .then(function() {
                                return res.json({
                                    error: '',
                                    result: 'Your password has been changed!'
                                })
                            })
                    });
                });
            });
        });
});

module.exports = router;