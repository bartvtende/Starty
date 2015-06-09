var express = require('express');
var router = express.Router();

var models = require('../models');
var Users = models.Users;

/**
 * Retrieves all messages
 */
router.get('/', function(req, res) {
    Users.findAll()
        .then(function(users) {
            var err = '';
            if (users == undefined)
                err = 'Er zijn geen gebruiker gevonden!';
            return res.json([{
                error: err,
                result: users
            }]);
        });
});


router.get('/:id', function(req, res) {
    var id = req.params.id;

    Users.findAll({ where: { id: id }})
        .then(function(user) {
            var err = '';
            if (user == undefined)
                err = 'Er is geen gebruiker gevonden!';
            return res.json([{
                error: err,
                result: user
            }]);
        });
});

module.exports = router;