require('dotenv-safe').config();
const express = require('express')
const app = express();
const mongoInit = require('./config/mongo')
const router = express.Router();
const bodyParser = require('body-parser')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

// Rounters
app.use('/api', require('./app/routers/api')(router))

app.listen(process.env.PORT, () => {
    console.log(`Listening por: ${process.env.PORT}`)
})

mongoInit();