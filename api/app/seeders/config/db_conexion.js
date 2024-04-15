const mongoose = require('mongoose')

exports.execute = async () => {
    await mongoose.connect("mongodb://127.0.0.1:27017/social_media_test_db")
}