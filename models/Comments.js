const { Schema, model } = require('mongoose')

const commentSchema = Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "user"
    },
    text: {
        type: String,
        trim: true,
        required: true
    },
    timestamp: { 
        type: Schema.Types.Date, default: Date.now 
    }
})

const commentModel = model('comment', commentSchema)

module.exports = commentModel