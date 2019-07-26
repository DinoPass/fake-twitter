let Router = require('express').Router()
let {User, Post} = require('../models')

Router.route('/retweet').post((req, res) => {
    Post.findByIdAndUpdate(req.body.postId, {$inc: {retweet: 1}}, {new: true})
    .then(post => {
        return User.findByIdAndUpdate(req.body.userId, {$addToSet: {posts: post._id}})
    })
    .then(user => {
        res.send(user)
    })
    .catch(err => {
        console.log(err)
    })
})

module.exports = Router