const mongoose = require('mongoose')

let Schema = mongoose.Schema

let profiles = new Schema({
    first_name: { type: 'String', require: true },
    img: { type: 'String', require: false },
    last_name: { type: 'String', require: false },
    phone: { type: 'String', require: false },
    address: { type: 'String', require: false },
    city: { type: 'String', require: false },
    state: { type: 'String', require: false },
    zipcode: { type: 'String', require: false },
    available: { type: 'Boolean', require: false },
}, { timestamps: true, versionKey: false })

module.exports = mongoose.model('profiles', profiles)