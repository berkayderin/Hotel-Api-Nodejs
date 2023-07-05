const express = require('express')
const router = express.Router()

const { verifyAdmin, verifyUser } = require('../middlewares/verify')

const { updateUser, deleteUser, getUser, getAllUsers } = require('../controllers/user')

router.put('/user/:id', verifyUser, updateUser)
router.delete('/user/:id', verifyUser, deleteUser)
router.get('/user/:id', verifyUser, getUser)
router.get('/users', verifyAdmin, getAllUsers)

module.exports = router
