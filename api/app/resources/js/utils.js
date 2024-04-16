const mongoose = require('mongoose')

exports.isNumber = (val) => {
    return /^\d*(\.\d+)?$/.test(val);
}

exports.parseStringToObjectId = (ids) => {
    let objects = []
    ids.forEach(id => {
        let isValid = mongoose.Types.ObjectId.isValid(id)
        if (isValid) objects.push(new mongoose.Types.ObjectId(id))
    });
    return objects
}