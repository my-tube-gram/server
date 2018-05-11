const mongoose = require('mongoose')

const videoSchema = mongoose.Schema({
  title: String,
  url: String,
  description: String,
  like: Number,
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, {
  timestamps: true
})

const Video = mongoose.model('Video', videoSchema)

module.exports = Video