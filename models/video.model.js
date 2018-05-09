const mongoose = require('mongoose')

const videoSchema = mongoose.Schema({
    title: String,
    url: String,
    description: String,
    like: Number,
    dislike: Number
})

const Video = mongoose.model('Video', videoSchema)

module.exports = Video