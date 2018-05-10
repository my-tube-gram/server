const Storage = require('@google-cloud/storage')
const Multer  = require('multer')

// nama bucket
const CLOUD_BUCKET = process.env.CLOUD_BUCKET

// storage butuh projectid sama path key file yang di dapat dari IAM Services Account
const storage = Storage({
  projectId: process.env.GCLOUD_PROJECT,
  keyFilename: process.env.KEYFILE_PATH
})

// bucket
const bucket = storage.bucket(CLOUD_BUCKET)

// fungsi buat dapat url image
// berdasar nama bucket sama file
const getPublicUrl = (filename) => {
  return `https://storage.googleapis.com/${CLOUD_BUCKET}/${filename}`
}

// fungsi untuk upload file ke gcs
const sendUploadToGCS = (req, res, next) => {
  if (!req.file) {
    return next()
  }

  // membuat nama file
  const gcsname = Date.now() + req.file.originalname
  // init file
  const file = bucket.file(gcsname)

  // membuat stream file
  const stream = file.createWriteStream({
    metadata: {
      contentType: req.file.mimetype
    }
  })

  // melakukan upload ke gcs
  stream.on('error', (err) => {
    req.file.cloudStorageError = err
    next(err)
  })

  // setelah finish upload ke gcs
  // simpan ke req.file nama file di dan url
  stream.on('finish', () => {
    req.file.cloudStorageObject = gcsname
    file.makePublic().then(() => {
      req.file.cloudStoragePublicUrl = getPublicUrl(gcsname)
      next()
    })
  })

  stream.end(req.file.buffer)
}

const multer = Multer({
  storage: Multer.MemoryStorage,
  // limits harus dipakai nanti kena error busybody
  limits: {
    fileSize: 5 * 1024 * 1024
  }
  // dest: '../images'
})



module.exports = {
  multer,
  sendUploadToGCS
}