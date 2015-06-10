var mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');
var Schema = mongoose.Schema;

var messagesSchema = new Schema({
    projectId: Number,
    senderId: Number,
    receiverId: Number,
    providerId: Number,
    message: String
}, { versionKey: false });

messagesSchema.plugin(timestamps);

var Messages = mongoose.model('Messages', messagesSchema);

module.exports = Messages;