let Router = require('express').Router()
let { User } = require('../models')
Router.route('/:userName').get((req, res) => {
    // search for user by userName and return user object from DB
    console.log(req.params.userName)
    User.findOne({userName: req.params.userName})
    .then(user => {
        let foundFollower = -1;
        if(req.query.userId) {
            console.log('checking user id', user)
            foundFollower = user.followers.findIndex((follower) => {
                console.log(typeof follower.toString())
            return follower.toString() === req.query.userId
            })
        }
        console.log(foundFollower, req.query.userId)
        res.json({user, followed: foundFollower !== -1})
    })
    .catch(err => {
        console.log(err)
    })
})
module.exports = Router