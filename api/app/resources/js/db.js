require('dotenv-safe').config();
const mongoose = require('mongoose')

exports.connect = async () => { 
    await mongoose.connect(process.env.NODE_ENV == 'development' ? process.env.DB_URL : process.env.DB_URL_TEST)
}

exports.clean = async () => { 
    const collections = mongoose.connection.collections
    for (const key in collections) {
        const collection = collections[key]
        await collection.deleteMany();
    }
}

exports.close = async () => {
    await mongoose.connection.close();
}