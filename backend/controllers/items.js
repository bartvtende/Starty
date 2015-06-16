var express = require('express');
var router = express.Router();

var models = require('../models/index');
var auth = require('./auth');

var Backlog = models.Backlog;
var Issues = models.Issues;

var getModel = function (model) {
    switch (model) {
        case "backlog" :
            return Backlog;
        case "issues" :
            return Issues;
    }
};

/**
 * Gets all the items of this project
 */
router.get('/:model/:projectId', auth.isAuthenticated, function(req, res){
    if (req.user.organization_id == 0 || req.user.organization_id == null) {
        res.json({
            error: 'You are not a member of an organization!',
            result: ''
        });
    }

    var model = getModel(req.params.model);
    model.findAll({ where: { project_id: req.params.projectId }})
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
 * Get a item of this project
 */
router.get('/:model/:projectId/:id', auth.isAuthenticated, function(req, res){
    if (req.user.organization_id == 0 || req.user.organization_id == null) {
        res.json({
            error: 'You are not a member of an organization!',
            result: ''
        });
    }

    var model = getModel(req.params.model);
    model.findAll({ where: { project_id: req.params.projectId, id: req.params.id }})
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
 * Creates an item
 */
router.post('/:model', auth.isAuthenticated, function(req, res) {
    if (req.user.organization_id == 0 || req.user.organization_id == null) {
        res.json({
            error: 'You are not a member of an organization!',
            result: ''
        });
    }

    var item = req.body;

    item.time_reality = 0;
    item.creator = req.user.id;
    item.createdAt = models.sequelize.fn('NOW');
    item.updatedAt = models.sequelize.fn('NOW');

    var model = getModel(req.params.model);
    model.create(item).then(function (item) {
        return res.json({
            error: '',
            result: item
        });
    });
});
 
/**
 * Updates an item
 */
router.put('/:model', auth.isAuthenticated, function(req, res) {
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

    var model = getModel(req.params.model);
    model.find({ where: { project_id: projectId, id: id }})
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
 * Deletes an item
 */
router.delete('/:model/:projectId/:id', auth.isAuthenticated, function(req, res) {
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

    var model = getModel(req.params.model);
    model.find({ where: { project_id: req.params.projectId, id: id }})
        .then(function(item) {
            if (item == null) {
                return res.json({
                    error: 'The item item doesn\'t exist',
                    result: ''
                })
            }

            item.destroy()
                .then(function() {
                    return res.json({
                        error: '',
                        result: item
                    });
                });
        });
});

module.exports = router;