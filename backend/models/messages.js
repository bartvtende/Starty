var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var messagesSchema = new Schema({
    // Empty schema for now (will add later)
}, { versionKey: false, strict: false });

var Messages = mongoose.model('Messages', messagesSchema);

module.exports = Messages;