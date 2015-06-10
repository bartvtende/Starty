var mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');
var Schema = mongoose.Schema;

var messagesSchema = new Schema({
    // Empty schema for now (will add later)
}, { versionKey: false, strict: false });

messagesSchema.plugin(timestamps);

var Messages = mongoose.model('Messages', messagesSchema);

module.exports = Messages;