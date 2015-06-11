var express = require('express');
var router = express.Router();

var models = require('../models/index');
var auth = require('./auth');

// var Organizations = models.Organizations;
// var Projects = models.Projects;
// var Users = models.Users;
var Backlog = models.Backlog;

/**
 * Gets all the projects of this user
 */
router.get('/:projectId', auth.isAuthenticated, function(req, res){
    if (req.user.organization_id == 0 || req.user.organization_id == null) {
        res.json({
            error: 'You are not a member of an organization!',
            result: ''
        });
    }

    Backlog.findAll({ where: { project_id: req.user.project_id }})
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
 * Creates a item
 */
router.post('/', auth.isAuthenticated, function(req, res) {
    if (req.user.organization_id == 0 || req.user.organization_id == null) {
        res.json({
            error: 'You are not a member of an organization!',
            result: ''
        });
    }

    Backlog.create({
        id: req.body.id,
        project_id: req.body.project_id,
        title: req.body.title,
        description: req.body.description,
        time_expected: req.body.time_expected,
        time_reality: 0,
        creator: req.user.id,
        createdAt: models.sequelize.fn('NOW'),
        updatedAt: 0
    }).then(function (item) {
        return res.json({
            error: '',
            result: item
        });
    });
});
 
/**
 * Updates an project
 */
// router.put('/', auth.isAuthenticated, function(req, res) {
//     var projectId = req.body.project_id;

//     if (req.user.organization_id == 0 || req.user.organization_id == null) {
//         res.json({
//             error: 'You are not a member of an organization!',
//             result: ''
//         });
//     }

//     if (projectId == null) {
//         res.json({
//             error: 'You didn\'t specify a project!',
//             result: ''
//         });
//     }

//     Projects.find({ where: { id: projectId }})
//         .then(function(project) {
//             if (project == null) {
//                 return res.json({
//                     error: 'The project doesn\'t exist',
//                     result: ''
//                 })
//             }
//             project.organization_id = req.user.organization_id;
//             project.shortcode = req.body.shortcode;
//             project.name = req.body.name;
//             project.description = req.body.description;

//             project.save()
//                 .then(function() {
//                     return res.json({
//                         error: '',
//                         result: project
//                     });
//                 });
//         });
// });

module.exports = router;