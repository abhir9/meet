const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const cookieSession = require('cookie-session')
const app = express()
const passport = require('./config/passport')
const authRoutes = require('./authRoutes/')
const routes = require('./routes/')
require('dotenv').load()

const PORT = process.env.PORT || 3002

const pathPublic = path.join(process.cwd(), 'client')
const secretKey = process.env.SECRETKEY || 'secretkey'

mongoose.Promise = Promise

mongoose.connect(process.env.MONGOURI || 'mongodb://demo:demo123@ds137913.mlab.com:37913/polls', {useMongoClient: true})
app.use(express.static(pathPublic))
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

app.use(cookieSession({
  name: 'CookieVotes',
  keys: [secretKey],
  maxAge: 7 * 24 * 60 * 60 * 1000,
  cookie: {secure: false},
  resave: true
}))

const configSocket = require('./socketio/configSocket.js')

const server = app.listen(PORT)
configSocket(server, app)
app.use(passport.initialize())

app.use(authRoutes)
app.use(routes)

process.on('uncaughtException', function (err) {
  console.log(err)
})
process.on('exit', function () {
  console.log('server down!');
});

console.log(`Listening on PORT ${PORT}`)
