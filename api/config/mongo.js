const mongoose = require('mongoose')

module.exports = () => {
    const connect = () => {
        mongoose.Promise = global.Promise

        const printConectionStatus = (dbStatus) => {
            console.log('******************')
            console.log('Starting Server')
            console.log('* Port: ' + process.env.PORT)
            console.log('* NODE_ENV: ' + process.env.NODE_ENV)
            console.log(dbStatus)
            console.log('******************')
        }
        mongoose.connect(process.env.DB_URL, {})
            .then(() => {
                printConectionStatus('* DB connection OK')
            })
            .catch((err) => {
                printConectionStatus(`* Eror DB connection: ${err}`)
            })
    }

    connect()

    mongoose.connection.on('err', console.log)
    mongoose.connection.on('disconnected', connect)
}