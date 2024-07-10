const express = require('express')
const router = express.Router()
const UserController = require('./userControllers')

router.get('/users',UserController.getAllUsers)
router.get('/users/:email',UserController.findUserByEmail)
router.post('/users',UserController.createUser)
router.put('/users/:id',UserController.updateUser)
router.delete('/users/:id',UserController.deleteUser)
module.exports = router