const Video = require('../models/Videos')
const Comment = require('../models/Comments')
const User = require('../models/User')
const passport = require('passport')
const router = require('express').Router()

// get video router.get("/video/")


//this will save comments of user on video in comment part and video should be saved using iframe only.

// Use Video.find({})

router.get("/", async (req, res) => {
    try {
        let videos = await Video.find({}).populate({
            path: 'comments',
            populate: {
                path: "user",
            }
        }).exec()
        if (videos && videos.length) {
            return res.send({
                videos,
                message: "Videos found"
            })
        }
        return res.send({
            message: "No videos found."
        })
    } catch (error) {
        console.log(error)
    }
})

router.post("/:id/add-comment", async (req, res) => {
    try {
        let { comment_text } = req.body
        let video = await Video.findOne({ _id: req.params.id })
        if (video) {
            let comment = await new Comment({
                user: req.user._id,
                text: comment_text,
                // video_id: video._id
            }).save()
            if (comment) {
                video.comments.push(comment._id)
                let savedVideo = await video.save()
                res.redirect('/dashboard')
            }
        }
    } catch (error) {
        console.log(error)
    }
})

module.exports = router