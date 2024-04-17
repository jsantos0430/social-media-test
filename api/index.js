require('dotenv-safe').config();
const mongoInit = require('./config/mongo')

const app = require("./app")

app.listen(process.env.PORT, () => {
    console.log(`Listening por: ${process.env.PORT}`)
})

mongoInit();