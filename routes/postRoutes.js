let Router = require('express').Router()
let {Post, User} = require('../models')

Router.route('/posts').post((req, res) => {
    let newPost;

    Post.create({ message: req.body.message, userId: req.body.userId })
    .then(post => {
        newPost = post
        return User.findByIdAndUpdate(req.body.userId, { $addToSet: { posts: post._id } }, {new: true})
    })
    .then(user => {
        res.json(newPost)
    })
    .catch(err => {
        console.log(err)
    })
}).get((req, res) => {
    console.log(req.query.id)
    Post.findById(req.query.id)
    .then(post => {
        res.json(post)
    })
    .catch(err => {
        console.log(err)
    })
}).put((req, res) => {
    Post.findByIdAndUpdate(req.body.id, { $set: { message: req.body.message }}, { new: true })
    .then(post => {
        res.json(post)
    })
    .catch(err => {
        console.log(err)
    })
}).delete((req, res) => {
    Post.findByIdAndRemove(req.query.id)
    .then(post => {
        console.log(post)
        res.send('Post was removed successfully ' + req.query.id)
    })
})

module.exports = Router