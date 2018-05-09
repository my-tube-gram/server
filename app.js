require('dotenv').config()
const express = require('express')
const logger = require('morgan')
const cors = require('cors')
const mongoose = require('mongoose')

const videoRoute = require('./routes/video.router')

const app = express()

app.use(cors())

mongoose.connect('mongodb://rafie:rg872@ds155587.mlab.com:55587/mytubegram')

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/video', videoRoute)

app.listen(3000, () => {
    console.log('listening to port 3000');
    
})