const express = require("express")
const router = express.Router()
const passport = require("passport")
require("../config/passport")

//Google Login
router.get('/google', passport.authenticate('google', {
  scope: ['profile']
}))

router.get(
  '/google/callback',
  passport.authenticate('google'),
  (req, res) => {
    console.log('Current User: ', req.user)
    res.redirect('http://localhost:8080/')
  }
)

module.exports = router
