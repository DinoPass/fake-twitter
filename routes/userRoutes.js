let Router = require('express').Router()
let { User } = require('../models')
Router.route('/:userName').get((req, res) => {
    // search for user by userName and return user object from DB
    console.log(req.params.userName)
    User.findOne({userName: req.params.userName})
    .limit(15)
    .populate('posts')
    .exec()
    .then(user => {
        const foundFollower = user.followers.findIndex((follower) => {
            return follower === req.query.userId
        })
        console.log(user)
        res.json(Object.assign({}, user, {followed: foundFollower !== -1}))
    })
    .catch(err => {
        console.log(err)
    })
})
module.exports = Router