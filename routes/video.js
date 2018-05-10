const express = require('express')
const router = express.Router()
const { saveNewVideo, getAllVideo, updateVideoById, deleteVideoById  } = require('../controllers/video.controller')
//const {} = require('../middlewares')
const { multer, sendUploadToGCS } = require('../helpers/video.helper')

// video itu nama field yang mau d pakai AKA req.body.video
router.post('/', multer.single('video'), sendUploadToGCS, saveNewVideo)
router.get('/', getAllVideo)
router.put('/:id', updateVideoById)
router.delete('/:id', deleteVideoById)

module.exports = router