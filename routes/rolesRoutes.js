const express = require('express')

const rolesController = require('../controllers/rolesCntroller')

const router = express.Router()

router.get('/list/:userId', rolesController.roles_list)

router.post('/create/:userId', rolesController.roles_create)

router.delete('/delete/:roleId', rolesController.roles_delete)

module.exports = router