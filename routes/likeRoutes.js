let Router = require('express').Router()
let {User, Post} = require('../models')
Router.route('/likes').post((req, res) => {
    Post.findByIdAndUpdate(req.body.postId, {$inc: {likes: 1}}, {new: true})
    .then(post => {
        return User.findByIdAndUpdate(req.body.userId, { $addToSet: {likes: req.body.postId } }, 
        { new: true })
    })
    .then(user => {
        res.send(user)
    })
    .catch(err => {
        console.log(err)
    })
})

module.exports = Router