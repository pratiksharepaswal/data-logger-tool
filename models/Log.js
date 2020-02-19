var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
    timestamp: { type: Schema.Types.Date, default: Date.now },
    log_type: {
        type: String,
        enum: ['auth', 'click', 'write']
    },
    message: { type: String, required: true },
    user: { type: Schema.Types.ObjectId, ref: 'user' },
    data: { type: Object }
});

module.exports = mongoose.model('log', schema);