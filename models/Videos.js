const { Schema, model } = require('mongoose')

const videoSchema = Schema({
    name: String,
    embed_link: String,
    comments: [{
        type: Schema.Types.ObjectId,
        ref: 'comment'
    }]
})

const videoModel = model('video', videoSchema)

module.exports = videoModel