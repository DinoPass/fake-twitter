let mongoose = require('mongoose')
let Schema = mongoose.Schema

// create model for twitter post
let postSchema = new Schema({
    userId: {type: Schema.Types.ObjectId, ref: 'User', required: true},
    message: {type: String, required: true, trim: true},
    date: {type: Date, required: true, default: Date.now},
    likes: {type: Number, default: 0},
    retweet: {type: Number, default: 0}
})

let postModel = mongoose.model('Post', postSchema)

module.exports = postModel