const router = require('express').Router()
const UsersController = require('../controllers/UsersController')
const { UsersRequest } = require('../validators')
router.post('/register', UsersRequest.register, UsersController.register)
router.post('/login', UsersRequest.login, UsersController.login)

module.exports = router