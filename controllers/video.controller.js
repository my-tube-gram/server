const Video = require('../models/video.model')

module.exports = {
  saveNewVideo(req, res) {
    let video = new Video(req.body)
    
    video.url     = req.file.cloudStoragePublicUrl
    video.like    = 0
    video.dislike = 0

    video.save()
      .then(result => {
        res.status(200).json({
          message: 'success save new video',
          result
        })
      })
      .catch(error => {
        res.status(error.status).json({
          error
        })
      })
  },

  getAllVideo(req, res) {
    Video.find({})
      .then(result => {
        res.status(200).json({
          message: 'success get all videos',
          result
        })
      })
      .catch(error => {
        res.status(error.status).json({
          error
        })
      })
  },

  updateVideoById(req, res) {
    Video.findByIdAndUpdate(req.params.id, req.body)
      .then(result => {
        res.status(200).json({
          message: 'success update video',
          result
        })
      })
      .catch(error => {
        res.status(error.status).json({
          error
        })
      })
  },

  deleteVideoById(req, res) {
    Video.findByIdAndRemove(req.params.id)
      .then(result => {
        res.status(200).json({
          message: 'success delete video',
          result
        })
      })
      .catch(error => {
        res.status(error.status).json({
          error
        })
      })
  }
}