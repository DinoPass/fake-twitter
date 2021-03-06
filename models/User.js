let mongoose = require('mongoose')
let Schema = mongoose.Schema

// create model for twitter post
let userSchema = new Schema({
    userName: {type: String, required: true, trim: true, unique: true},
    password: {type: String, required: true, trim: true},
    posts: [{
        type: Schema.Types.ObjectId,
        ref: 'Post'
    }],
    avatar: { type: String, required: true, trim: true, default: 'http://www.digitalvertigo.co.uk/forum/uploads//monthly_05_2016/post-3489-0-19929300-1462982286.jpg'},
    bio: { type: String, trim: true }, 
    createdAt: { type: Date, required: true, default: Date.now },
    followers: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    following: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    likes: [{ type: Schema.Types.ObjectId, ref: 'Post' }]

})

let userModel = mongoose.model('User', userSchema)

module.exports = userModel