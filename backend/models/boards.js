var mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');
var Schema = mongoose.Schema;

var sprintsSchema = new Schema({
    projectId: String,
    name: String,
    startAt: Date,
    endAt: Date
}, { versionKey: false });

var listsSchema = new Schema({
    sprintId: Schema.Types.ObjectId,
    name: String,
    order: Number
}, { versionKey: false });

var itemsSchema = new Schema({
    listId: Schema.Types.ObjectId,
    shortcode: String,
    title: String,
    description: String,
    assignedUsers: String,
    backlog: [],
    issues: [],
    status: String,
    completedAt: Date
}, { versionKey: false });

sprintsSchema.plugin(timestamps);
listsSchema.plugin(timestamps);
itemsSchema.plugin(timestamps);

var Sprints = mongoose.model('Sprints', sprintsSchema);
var ScrumboardLists = mongoose.model('ScrumboardLists', listsSchema);
var ScrumboardItems = mongoose.model('ScrumboardItems', itemsSchema);

module.exports = {
	Sprints: Sprints,
	ScrumboardLists: ScrumboardLists,
	ScrumboardItems: ScrumboardItems
};