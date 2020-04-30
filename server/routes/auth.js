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
    res.redirect('/')
  }
)

router.get('/logout', (req, res) => {
  req.logout()
  res.redirect('/')
})

module.exports = router
