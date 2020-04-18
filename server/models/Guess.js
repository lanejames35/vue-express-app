const mongoose = require("mongoose")
const Schema = mongoose.Schema

const guessSchema = new Schema({
  author: String,
  birthday: String,
  time: String,
  weight: String,
  createdAt: String
})

const Guess = mongoose.model('Guess', guessSchema)

module.exports = Guess
