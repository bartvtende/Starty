var express = require('express');
var router = express.Router();

var models = require('../models/index');
var auth = require('./auth');

var Issues = models.Issues;

/**
 * Gets all the backlog items of this project
 */
router.get('/:projectId', auth.isAuthenticated, function(req, res){
    if (req.user.organization_id == 0 || req.user.organization_id == null) {
        res.json({
            error: 'You are not a member of an organization!',
            result: ''
        });
    }

    Issues.findAll({ where: { project_id: req.params.projectId }})
        .then(function(projects) {
            if (projects.length == 0) {
                return res.json({
                    error: 'You don\'t have any projects!',
                    result: ''
                });
            } else {
                return res.json({
                    error: '',
                    result: projects
                });
            }
        });
});

/**
 * Get a backlog item of this project
 */
router.get('/:projectId/:id', auth.isAuthenticated, function(req, res){
    if (req.user.organization_id == 0 || req.user.organization_id == null) {
        res.json({
            error: 'You are not a member of an organization!',
            result: ''
        });
    }

    Issues.findAll({ where: { project_id: req.params.projectId, id: req.params.id }})
        .then(function(item) {
            if (item.length == 0) {
                return res.json({
                    error: 'You don\'t have any items!',
                    result: ''
                });
            } else {
                return res.json({
                    error: '',
                    result: item[0]
                });
            }
        });
});

/**
 * Creates a backlog item
 */
router.post('/', auth.isAuthenticated, function(req, res) {
    if (req.user.organization_id == 0 || req.user.organization_id == null) {
        res.json({
            error: 'You are not a member of an organization!',
            result: ''
        });
    }

    Issues.create({
        id: req.body.id,
        project_id: req.body.project_id,
        title: req.body.title,
        description: req.body.description,
        time_expected: req.body.time_expected,
        time_reality: 0,
        creator: req.user.id,
        createdAt: models.sequelize.fn('NOW'),
        updatedAt: models.sequelize.fn('NOW')
    }).then(function (item) {
        return res.json({
            error: '',
            result: item
        });
    });
});
 
/**
 * Updates an backlog item
 */
router.put('/', auth.isAuthenticated, function(req, res) {
    var id = req.body.id;
    var projectId = req.body.project_id;

    if (req.user.organization_id == 0 || req.user.organization_id == null) {
        res.json({
            error: 'You are not a member of an organization!',
            result: ''
        });
    }

    if (id == null) {
        res.json({
            error: 'You didn\'t specify a backlog item!',
            result: ''
        });
    }

    Issues.find({ where: { project_id: projectId, id: id }})
        .then(function(backlog) {
            if (backlog == null) {
                return res.json({
                    error: 'The backlog item doesn\'t exist',
                    result: ''
                })
            }

            backlog.title = req.body.title;
            backlog.description = req.body.description;
            backlog.time_expected = req.body.time_expected;
            backlog.time_reality = 0;
            backlog.updatedAt = models.sequelize.fn('NOW');

            backlog.save()
                .then(function() {
                    return res.json({
                        error: '',
                        result: backlog
                    });
                });
        });
});
 
/**
 * Updates an backlog item
 */
router.delete('/:projectId/:id', auth.isAuthenticated, function(req, res) {
    var id = req.params.id;

    if (req.user.organization_id == 0 || req.user.organization_id == null) {
        res.json({
            error: 'You are not a member of an organization!',
            result: ''
        });
    }

    if (id == null) {
        res.json({
            error: 'You didn\'t specify a backlog item!',
            result: ''
        });
    }

    Issues.find({ where: { project_id: req.params.projectId, id: id }})
        .then(function(backlog) {
            if (backlog == null) {
                return res.json({
                    error: 'The backlog item doesn\'t exist',
                    result: ''
                })
            }

            backlog.destroy()
                .then(function() {
                    return res.json({
                        error: '',
                        result: backlog
                    });
                });
        });
});

module.exports = router;