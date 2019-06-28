let mongoose = require('mongoose')
let Schema = mongoose.Schema

// create model for twitter post
let postSchema = new Schema({
    message: {type: String, required: true, trim: true},
    date: {type: Date, required: true, default: Date.now}
})

let postModel = mongoose.model('Post', postSchema)

module.exports = postModel