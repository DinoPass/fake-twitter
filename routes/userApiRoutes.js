let Router = require('express').Router()
let { User } = require('../models')
Router.route('/').post((req, res) => {
    console.log(req.body)
    User.create(req.body)
    .then(user => {
        res.json(user)
    })
    .catch(err => {
        console.log(err)
    })
})
.get((req, res) => {
    User.findById(req.query.id)
    .then(user => {
        res.json(user)
    })
    .catch(err => {
        console.log(err)
    })
})

module.exports = Router