require('dotenv').config()
const createError = require('http-errors')
const express     = require('express')
const path        = require('path')
const logger      = require('morgan')
const mongoose    = require('mongoose')
mongoose.connect('mongodb://mytubegram:gramtubemy@ds117540.mlab.com:17540/mytubegram')

const indexRouter = require('./routes/index')
const usersRouter = require('./routes/users')
const videoRouter = require('./routes/video.router')

const app = express()

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, 'public')))

app.use('/', indexRouter)
app.use('/users', usersRouter)
app.use('/videos', videoRouter)

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

module.exports = app
