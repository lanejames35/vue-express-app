require("dotenv").config()
const express = require("express")
const bodyParser = require("body-parser")
const cors = require("cors")
const session = require("express-session")
const MongoStore = require("connect-mongo")(session)
const mongoose = require("mongoose")
const passport = require("passport")

const PORT = process.env.PORT || 5000

// Initialize the server
const app = express()


// Connect the routes
const api = require("./routes/api")
const auth = require("./routes/auth")

// Connect to the database
mongoose.connect(
  `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0-fdzqq.azure.mongodb.net/test?retryWrites=true&w=majority`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  } 
).catch(error => {
  console.log('Problem connecting to the database', error)
})
mongoose.connection.on('open', () => {
  console.log('Connected to the database')
})
mongoose.connection.on('error', error => {
  console.log(new Error(error))
})

// Server middleware
app.use(bodyParser.json())
app.use(cors({
  origin: 'http://localhost:8080',
  credentials: true
}))
app.use(session({
  store: new MongoStore({ mongooseConnection: mongoose.connection }),
  secret: process.env.SESSION_PASS,
  resave: false,
  saveUninitialized: true,
  cookie: {
    maxAge: 8 * 60 * 60 * 1000,
    httpOnly: true,
    secure: false // Change to true over HTTPS
  }
}))
app.use(passport.initialize())
app.use(passport.session())

// Routes
app.use('/api', api)
app.use('/auth', auth)

app.get('/', (req, res) => {
  res.send("Hello World!")
})

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`)
})
