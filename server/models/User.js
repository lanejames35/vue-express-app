const mongoose = require("mongoose")
const Schema = mongoose.Schema

const userSchema = new Schema({
  socialID: String,
  name: String,
  avatar: String
})

const User = mongoose.model('User', userSchema)

module.exports = User
