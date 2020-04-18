const express = require("express")
const router = express.Router()
const Guess = require("../models/Guess")

// GET the guesses
router.get('/guess', (req, res) => {
  Guess.find({})
  .then(data => {
    res.status(200).send(data)
  })
  .catch(err => {
    res.status(500).json({
      message: 'Problem getting data',
      error: err
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
      message: "Problem with the delete",
      error: err
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
      message: "Problem with the delete",
      error: err
    })
  })
})

module.exports = router
