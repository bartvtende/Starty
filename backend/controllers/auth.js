var jwt = require('jwt-simple');
var moment = require('moment');

var settings = require('../config/settings');
var models = require('../models');

var Users = models.users;

module.exports = {

    createToken: function(user) {
        var payload = {
            exp: moment().add(180, 'minutes').unix(),
            iat: moment().unix(),
            sub: user.id
        };

        return jwt.encode(payload, settings.tokenSecret);
    },

    isAuthenticated: function(req, res, next) {
        if (!(req.headers && req.headers.authorization)) {
            return res.status(400).json({
                error: 'You did not provide a JSON Web Token in the Authorization header.',
                result: ''
            });
        }

        var header = req.headers.authorization.split(' ');
        var token = header[1];
        try {
            var payload = jwt.decode(token, settings.tokenSecret);
        } catch(err) {
            return res.status(401).json({
                error: 'The JSON Web Token is not in a valid format',
                result: ''
            })
        }
        var now = moment().unix();

        if (now > payload.exp) {
            return res.status(401).json({
                error: 'Token has expired',
                result: ''
            });
        }

        Users.find({ where: { id: payload.sub}})
        .then(function(user) {
            if (user == null) {
                return res.status(400).json({
                    error: 'User no longer exists.',
                    result: ''
                });
            }

            req.user = user;
            next();
        });
    }
};