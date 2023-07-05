const mongoose = require("mongoose")

const profileSchema = new mongoose.Schema({
    name: {type: String, required: true},
    age: {type: String, required: true},
    sex: {type: String, required: true},
})

const ProfileModel = mongoose.model('profiles', profileSchema)

module.exports = ProfileModel;