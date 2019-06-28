// simple server
let express = require('express')
let mongoose = require('mongoose')
let Router = require('./routes')
let postRouter = require('./routes/postRoutes')
let app = express()
let path = require('path')

const port = 3001

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static(path.join(__dirname, 'build')))
let mongooseOptions = {useNewUrlParser: true}

mongoose.connect('mongodb://localhost:27017/twitterDb', mongooseOptions)
.then(() => {
    console.log('Database is running')
}).catch((err) => {
    console.log(err)
})
app.use(Router, postRouter)
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'))
})
app.listen(port, () => {
    console.log('port is running on 3001')
})