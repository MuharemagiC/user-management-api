const express = require('express')

const authController = require('../controllers/authController')

const router = express.Router()

router.get('/register', authController.auth_register)

module.exports = router