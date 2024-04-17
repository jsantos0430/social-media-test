const express = require('express')
const app = express();
const router = express.Router();
const bodyParser = require('body-parser')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use('/api', require('./app/routers/api')(router))

module.exports = app