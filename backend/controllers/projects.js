var express = require('express');
var router = express.Router();

var models = require('../models/index');
var auth = require('./auth');

var Organizations = models.organizations;
var Projects = models.projects;
var Users = models.users;
var ProjectUser = models.projectuser;

/**
 * Gets all the projects of this user
 */
router.get('/', auth.isAuthenticated, function(req, res){
    if (req.user.organization_id == 0 || req.user.organization_id == null) {
        res.json({
            error: 'You are not a member of an organization!',
            result: ''
        });
    }


    Users.belongsToMany(Projects, {through: ProjectUser, foreignKey: 'UID'});
    Projects.belongsToMany(Users, {through: ProjectUser, foreignKey: 'PID'});
    Projects.findAll({ where: { organization_id: req.user.organization_id}, include: [{model: Users, attributes: ['id', 'name'], through: {attributes: ['UID', 'PID']}}]})
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
 * Returns a specific project
 */
router.get('/:shortcode', auth.isAuthenticated, function(req, res) {
    var shortcode = req.params.shortcode;

    if (req.user.organization_id == 0 || req.user.organization_id == null) {
        res.json({
            error: 'You are not a member of an organization!',
            result: ''
        });
    }

    Projects.find({ where: { shortcode: shortcode, organization_id: req.user.organization_id }})
        .then(function(project) {
            if (project == null) {
                return res.json({
                    error: 'The project doesn\'t exist!',
                    result: ''
                });
            }
            if (project.organization_id != req.user.organization_id) {
                return res.json({
                    error: 'You are not a member of this organization!',
                    result: ''
                });
            }
            return res.json({
                error: '',
                result: project
            });
        });
});

/**
 * Creates a project
 */
router.post('/', auth.isAuthenticated, function(req, res) {
    if (req.user.organization_id == 0 || req.user.organization_id == null) {
        res.json({
            error: 'You are not a member of an organization!',
            result: ''
        });
    }

    Projects.create({
        organization_id: req.user.organization_id,
        shortcode: req.body.shortcode,
        name: req.body.name,
        description: req.body.description
    }).then(function (project) {
        return res.json({
            error: '',
            result: project
        });
    });
});

/**
 * Updates an project
 */
router.put('/', auth.isAuthenticated, function(req, res) {
    var projectId = req.body.project_id;

    if (req.user.organization_id == 0 || req.user.organization_id == null) {
        res.json({
            error: 'You are not a member of an organization!',
            result: ''
        });
    }

    if (projectId == null) {
        res.json({
            error: 'You didn\'t specify a project!',
            result: ''
        });
    }

    Projects.find({ where: { id: projectId }})
        .then(function(project) {
            if (project == null) {
                return res.json({
                    error: 'The project doesn\'t exist',
                    result: ''
                })
            }
            project.organization_id = req.user.organization_id;
            project.shortcode = req.body.shortcode;
            project.name = req.body.name;
            project.description = req.body.description;

            project.save()
                .then(function() {
                    return res.json({
                        error: '',
                        result: project
                    });
                });
        });
});

router.delete('/:shortcode', auth.isAuthenticated, function(req, res) {
    var shortcode = req.params.shortcode;

    if (req.user.organization_id == 0 || req.user.organization_id == null) {
        res.json({
            error: 'You are not a member of an organization!',
            result: ''
        });
    }

    Projects.findAll({ where: { shortcode: shortcode, organization_id: req.user.organization_id }})
        .then(function(project) {
            var project = project[0];
            if (project == null) {
                return res.json({
                    error: 'The project doesn\'t exist!',
                    result: ''
                });
            }
            if (project.organization_id != req.user.organization_id) {
                return res.json({
                    error: 'You are not a member of this organization!',
                    result: ''
                });
            }
            project.destroy()
                .then(function() {
                    return res.json({
                        error: '',
                        result: project
                    });
                })
                .then(function() {
                    return res.json({
                        error: 'Something went wrong, please try again!',
                        result: ''
                    });
                });
        });
});

/**
 * Creates a link between user and project
 */
router.post('/join', auth.isAuthenticated, function(req, res) {
    if (req.user.organization_id == 0 || req.user.organization_id == null) {
        res.json({
            error: 'You are not a member of an organization!',
            result: ''
        });
    }

    ProjectUser.create({
        UID: req.user.id,
        PID: req.body.shortcode
    }).then(function (project) {
        return res.json({
            error: '',
            result: project
        });
    });
});

module.exports = router;