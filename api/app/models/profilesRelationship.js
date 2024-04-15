const mongoose = require('mongoose')

let Schema = mongoose.Schema

let profiles_relationship = new Schema({
    profiles: {
        _id: { type: Schema.Types.ObjectId, required: true, ref: 'profiles' },
        first_name: { type: 'String', require: false },
        last_name: { type: 'String', require: false },
        phone: { type: 'String', require: false },
    },
    friends: [{
        _id: { type: Schema.Types.ObjectId, required: true, ref: 'profiles' },
        first_name: { type: 'String', require: false },
        last_name: { type: 'String', require: false },
        phone: { type: 'String', require: false },
    }]
}, { timestamps: true, versionKey: false })

module.exports = mongoose.model('profiles_relationship', profiles_relationship)