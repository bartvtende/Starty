var express = require('express');
var router = express.Router();

var Boards = require('../models/boards');
var auth = require('./auth');

/**
 * Retrieves all sprints for a project
 */
router.get('/:projectId', auth.isAuthenticated, function(req, res) {
    var projectId = req.params.projectId;
    var limit = 100;
    var ret = {Sprints: [], ScrumboardLists: [], ScrumboardItems: []};

    // Find all the sprints
    Boards.Sprints
        .find({ projectId: projectId })
        .where('receiverId').equals(null)
        .limit(limit)
        .sort({ createdAt: 'asc' })
        .exec(function(err, json) {
            if (err) {
                return res.json({
                    error: err,
                    result: ''
                });
            }
            ret.Sprints = json;

            var sprintIds = [];
            for (var i in ret.Sprints) {
                var sprint = ret.Sprints[i];
                var ObjectId = require('mongoose').Types.ObjectId; 
                sprintIds = sprintIds.concat(new ObjectId(sprint._id));
            };
            
            // Find all the lists
            Boards.ScrumboardLists
                .find({ sprintId: {$in: sprintIds} })
                .where('receiverId').equals(null)
                .limit(limit)
                .sort({ createdAt: 'asc' })
                .exec(function(err, json) {

                    if (err) {
                        return res.json({
                            error: err,
                            result: ''
                        });
                    }
                    ret.ScrumboardLists = json;

                    var listIds = [];
                    for (var i in ret.ScrumboardLists) {
                        var list = ret.ScrumboardLists[i];
                        var ObjectId = require('mongoose').Types.ObjectId;
                        listIds = listIds.concat(new ObjectId(list._id));
                    };

                    // Find all the items
                    Boards.ScrumboardItems
                        .find({ listId: {$in: listIds} })
                        .where('receiverId').equals(null)
                        .limit(limit)
                        .sort({ createdAt: 'asc' })
                        .exec(function(err, json) {
                            if (err) {
                                return res.json({
                                    error: err,
                                    result: ''
                                });
                            }
                            ret.ScrumboardItems = json;
                            return res.json({
                                error: '',
                                result: ret
                            });
                        });
                });
        });
});

/**
 * Creates a new sprint for a project
 */
router.post('/sprints', auth.isAuthenticated, function(req, res) {
    var sprint = new Boards.Sprints(req.body);

    sprint.save(function(err, sprint) {
        
            if (err) {
                return res.json({
                    error: err,
                    result: ''
                });
            }
            return res.json({
                error: '',
                result: sprint
            });

    });

});

/**
 * Creates a new list for a project
 */
router.post('/lists', auth.isAuthenticated, function(req, res) {
    var list = new Boards.ScrumboardLists(req.body);

    list.save(function(err, list) {
        
        if (err) {
            return res.json({
                error: err,
                result: ''
            });
        }
        return res.json({
            error: '',
            result: list
        });

    });

});

/**
 * Creates a new list for a project
 */
router.put('/lists', auth.isAuthenticated, function(req, res) {

    var ObjectId = require('mongoose').Types.ObjectId; 
    var list = Boards.ScrumboardLists
        .update(
            { _id: new ObjectId(req.body._id )},
            {name: req.body.name, order: req.body.order},
            {  },
            function(err, list) {

                if (err) {
                    return res.json({
                        error: err,
                        result: ''
                    });
                }
                return res.json({
                    error: '',
                    result: list
                });
            });

});

/**
 * Creates a new list for a project
 */
router.delete('/lists/:id', auth.isAuthenticated, function(req, res) {
    var ObjectId = require('mongoose').Types.ObjectId; 
    var list = Boards.ScrumboardLists
        .findOneAndRemove(
            { _id: new ObjectId(req.params.id )},
            {  },
            function(err, list) {

                if (err) {
                    return res.json({
                        error: err,
                        result: ''
                    });
                }


                Boards.ScrumboardLists
                    .find({ sprintId: new ObjectId(list.sprintId)})
                    .sort({ order: 'asc' })
                    .exec(function(err, json) {
                        var i = 0;
                        for (var list in json) {
                                        console.log(i+": "+json[list]);


                            // var ObjectId = require('mongoose').Types.ObjectId; 
                            Boards.ScrumboardLists
                                .where({ _id: new ObjectId(json[list]._id )})
                                .update({order: i},
                                    function(err, list) {

                                        if (err) {
                                            return res.json({
                                                error: err,
                                                result: ''
                                            });
                                        }
                                    });
                            i++;


                        }
                    });

                return res.json({
                    error: '',
                    result: list
                });
            });

});

/**
 * Creates a new item for a project
 */
router.post('/items', auth.isAuthenticated, function(req, res) {
    var item = new Boards.ScrumboardItems(req.body);

    item.save(function(err, item) {
        
        if (err) {
            return res.json({
                error: err,
                result: ''
            });
        }
        return res.json({
            error: '',
            result: item
        });

    });

});

/**
 * Sets a new item for a project
 */
router.put('/items', auth.isAuthenticated, function(req, res) {

    var ObjectId = require('mongoose').Types.ObjectId; 
    var item = Boards.ScrumboardItems
        .update(
            { _id: new ObjectId(req.body._id ) },
            {
                listId: req.body.listId,
                shortcode: req.body.shortcode,
                title: req.body.title,
                description: req.body.description,
                assignedUsers: req.body.assignedUsers,
                status: req.body.status
            },
            {},
            function(err, item) {

                if (err) {
                    return res.json({
                        error: err,
                        result: ''
                    });
                }
                return res.json({
                    error: '',
                    result: item
                });
            });

});

/**
 * Creates a new item for a project
 */
router.delete('/items/:id', auth.isAuthenticated, function(req, res) {
    var ObjectId = require('mongoose').Types.ObjectId; 
    var item = Boards.ScrumboardItems
        .findOneAndRemove(
            { _id: new ObjectId(req.params.id )},
            {  },
            function(err, item) {

                if (err) {
                    return res.json({
                        error: err,
                        result: ''
                    });
                }


                Boards.ScrumboardItems
                    .find({ sprintId: new ObjectId(item.sprintId)})
                    .sort({ order: 'asc' })
                    .exec(function(err, json) {
                        var i = 0;
                        for (var item in json) {
                                        console.log(i+": "+json[item]);


                            // var ObjectId = require('mongoose').Types.ObjectId; 
                            Boards.ScrumboardItems
                                .where({ _id: new ObjectId(json[item]._id )})
                                .update({order: i},
                                    function(err, item) {

                                        if (err) {
                                            return res.json({
                                                error: err,
                                                result: ''
                                            });
                                        }
                                    });
                            i++;


                        }
                    });

                return res.json({
                    error: '',
                    result: item
                });
            });

});

module.exports = router;