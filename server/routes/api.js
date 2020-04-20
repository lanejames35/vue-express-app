const express = require("express")
const router = express.Router()
const Guess = require("../models/Guess")
const User = require("../models/User")

// Check authentication for user endpoint
const checkAuth = (req, res, next) => {
  if(!req.user){
    res.status(401).json({
      status: 'Unauthorized',
      message: 'This request requires authentication.'
    })
  } else {
    next()
  }
}

/**
 * Guess endpoint
 */

// GET the guesses
router.get('/guess', (req, res) => {
  Guess.find({})
  .then(data => {
    res.status(200).send(data)
  })
  .catch(err => {
    res.status(500).json({
      status: 'Problem getting data',
      message: err
    })
  })
})

// POST a guess
router.post('/guess/new', (req, res) => {
  new Guess({
    author: req.body.author,
    birthday: req.body.birthday,
    weight: req.body.weight,
    time: req.body.time,
    createdAt: new Date()
  })
  .save()
  .then(resp => {
    res.status(200).send(resp)
  })
  .catch(err => {
    res.status(500).json({
      status: "Problem with the delete",
      message: err
    })
  })
}) 

// DELETE a guess
router.delete('/guess/:id', (req, res) => {
  Guess.findOneAndDelete({ _id: req.params.id })
  .then(value => {
    res.status(200).send(value)  
  })
  .catch(err => {
    res.status(500).json({
      status: "Problem with the delete",
      message: err
    })
  })
})

/**
 * Users endpoint
 */

// Get an authenticated user's profile
router.get('/user', checkAuth, (req, res) => {
  User.findById(req.user.id)
  .then(value => {
    res.status(200).send(value)
  })
  .catch(error => {
    res.status(500).json({
      status: "Problem getting the requested information",
      message: error
    })
  })
})

module.exports = router
