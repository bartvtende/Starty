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
    order: Number,
    completed: Boolean
}, { versionKey: false });

var itemsSchema = new Schema({
    listId: Schema.Types.ObjectId,
    shortcode: String,
    title: String,
    description: String,
    assignedUsers: [],
    backlog: [],
    issues: [],
    status: String,
    completedAt: Date,
    expectedTime: Number
}, { versionKey: false });

sprintsSchema.plugin(timestamps);
listsSchema.plugin(timestamps);
itemsSchema.plugin(timestamps);

var Sprints = mongoose.model('Sprints', sprintsSchema);
var ScrumboardLists = mongoose.model('Scrumboard_Lists', listsSchema);
var ScrumboardItems = mongoose.model('Scrumboard_Items', itemsSchema);

module.exports = {
	Sprints: Sprints,
	ScrumboardLists: ScrumboardLists,
	ScrumboardItems: ScrumboardItems
};