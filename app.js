require('dotenv').config()
const express     = require('express')
const path        = require('path')
const favicon     = require('serve-favicon')
const bodyParser  = require('body-parser')

var app = express();

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.use(favicon(path.join(__dirname, 'public', 'assets/img/logo.png')))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, 'public')))

app.use('/', require('./routes/index'))

app.use(function(req, res, next) {
  var err = new Error('Not Found')
  err.status = 404
  next(err)
});

app.use(function(err, req, res, next) {
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}
  res.status(err.status || 500)
  res.render('error')
});

module.exports = app
