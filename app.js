require('dotenv').config()
const express  = require('express')
const mongoose = require('mongoose')
const cors     = require('cors')
const logger = require('morgan')
mongoose.connect('mongodb://mytubegram:gramtubemy@ds117540.mlab.com:17540/mytubegram')

const indexRouter = require('./routes/index')
const usersRouter = require('./routes/users')
const videoRouter = require('./routes/video')

const app = express()

app.use(cors())
app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/', indexRouter)
app.use('/users', usersRouter)
app.use('/videos', videoRouter)

app.listen(3000, () => {
  console.log('connected on port 3000')
})