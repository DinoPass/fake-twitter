let Router = require('express').Router()
let {User} = require('../models')

Router.route('/follow').post((req, res) => {
    User.findByIdAndUpdate(req.body.followingId, {$addToSet: {followers: req.body.userId}},
    {new: true})
    .then(followingUser => {
        return User.findByIdAndUpdate(req.body.userId, {$addToSet: {following: req.body.followingId}},
        {new: true})
    })
    .then(user => {
        res.send(user)
    })
    .catch(err => {
        console.log(err)
    })
    .delete((req, res) => {
        User.findByIdAndUpdate(req.query.followingId, {$pull: {followers: req.query.userId}})
        .then(followUser => {
            return User.findByIdAndUpdate(req.query.userId, {$pull: {following: req.query.followingId}})
        })
        .then(user => {
            res.send(user)
        })
        .catch(err => {
            console.log(err)
        })
    })

})

module.exports = Router