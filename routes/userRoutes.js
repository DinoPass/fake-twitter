let Router = require('express').Router()
let { User } = require('../models')
Router.route('/:userName').get((req, res) => {
    // search for user by userName and return user object from DB
    User.findOne({userName: req.params.userName})
    .limit(15)
    .populate('posts')
    .exec()
    .then(user => {
        res.json(user)
    })
    .catch(err => {
        console.log(err)
    })
})
module.exports = Router