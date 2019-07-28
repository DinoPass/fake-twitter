// simple server
let express = require('express')
let mongoose = require('mongoose')
let Router = require('./routes')
let postRouter = require('./routes/postRoutes')
let followRoutes = require('./routes/followRoutes')
let likeRoutes = require('./routes/likeRoutes')
let retweetsRoutes = require('./routes/retweetsRoutes')
let app = express()
let path = require('path')
let passport = require('passport')
let localStrategy = require('passport-local')
let {User} = require('./models')
let session = require('express-session')

const port = 3001

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static(path.join(__dirname, 'build')))
app.use(session({cookie: {maxAge: 2000000}, resave: true, saveUninitialized: true, secret: 'xavier'}))
app.use(passport.initialize())
app.use(passport.session())
passport.serializeUser((user, done) => {
    done(null, user.id)
})
passport.deserializeUser((id, done) => {
    User.findById(id)
    .then((user) => {
        done(null, user)
    })
    .catch(err => {
        done(err)
    })
})
// passport is handling auth for login
passport.use(new localStrategy((userName, password, done) => {
    User.findOne({userName})
        .then((user) => {
            if(!user) {
                return done(null, false)
            }
            if(password === user.password) {
                return done(null, user)
            } else {
                return done(null, false)
            }
        })
        .catch(err => {
            return done(err)
        }) 
}))

let mongooseOptions = {useNewUrlParser: true}

mongoose.connect('mongodb://localhost:27017/twitterDb', mongooseOptions)
.then(() => {
    console.log('Database is running')
}).catch((err) => {
    console.log(err)
})
app.use(Router, postRouter, likeRoutes, followRoutes, retweetsRoutes)
app.get(/^\/(?!login|signup|user|post|likes|retweet).*/, (req, res) => {
    console.log('index is running', path.resolve(__dirname, 'build', 'index.html'))
    res.sendFile(path.resolve(__dirname, 'build', 'index.html'))
})
app.post('/signup', (req, res) => {
    User.create(req.body)
    .then((user) => {
        res.send({message: 'Sign up was successful'})
    })
    .catch(err => {
        res.status(422).send({message: 'Error occured during sign up'})
    })
})
// passport local strategy handles login part
app.post('/login', passport.authenticate('local'), (req, res) => {
    res.cookie('user', req.user.id, {maxAge: 900000})
    res.send(req.user)
})
app.post('/logout', (req, res) => {
    req.logout()
    res.send({message: 'logout was successful'})
})
app.listen(port, () => {
    console.log('port is running on 3001')
})