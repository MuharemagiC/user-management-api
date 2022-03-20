const express = require('express')

const userController = require('../controllers/userController')

const router = express.Router()

router.post('/create', userController.user_create)

router.get('/list', userController.users_list)

router.delete('/delete/:id', userController.user_delete)

router.put('/update/:id', userController.user_update)

router.get('/:id', userController.user_get_by_id)


module.exports = router