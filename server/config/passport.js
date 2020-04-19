require("dotenv").config()
const passport = require("passport")
const GoogleStrategy = require("passport-google-oauth20").Strategy
const User = require("../models/User")

passport.serializeUser((user, done) => {
  done(null, user._id)
})
passport.deserializeUser((id, done) => {
  User.findOne(
    { _id: id },
    (error, user) => {
      done(error, user)
    }
  )
})


passport.use(new GoogleStrategy(
  {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_SECRET,
    callbackURL: '/auth/google/callback'
  },
  async (accessToken, refreshToken, profile, done) => {
    const currentUser = await User.findOne({ socialID: profile.id })
    if(currentUser) {
      done(null, currentUser)
    } else {
      new User({
        socialID: profile.id,
        name: profile.displayName,
        avatar: profile.photos[0].value
      }).save().then(newUser => {
        done(null, newUser)
      })
    }
  }
))
