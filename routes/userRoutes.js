const express = require('express')

const userController = require('../controllers/userController')

const router = express.Router()

router.post('/create', userController.user_create)

router.get('/list', userController.users_list)

module.exports = router