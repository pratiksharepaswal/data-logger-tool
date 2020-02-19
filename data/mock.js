const mongoose = require('mongoose')
const db = require('../config/keys').MongoURI
const Video = require('../models/Videos')
const Comment = require('../models/Comments')

mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: true })
    .then(() => {
        const videoArr = [
            {
                name: "Test 1",
                embed_link: "https://www.youtube.com/embed/U8XF6AFGqlc"
            },
        ]
        videoArr.forEach(v => {
            let video = new Video(v)
            video.save((err, saved) => {
                if (err) {
                    throw err
                }
                if (saved) {
                    console.log("saved ", v.name)
                }
            })
        })
    })
    .catch(err => console.log(err));

