let userApiRoutes = require('./userApiRoutes')
let userRoutes = require('./userRoutes')
let Router = require('express').Router()

Router.use('/user', userRoutes, userApiRoutes)

module.exports = Router