const express = require('express')
const router = express.Router()

const { verifyAdmin } = require('../middlewares/verify')

const { createRoom, updateRoom, deleteRoom, getRoom, getAllRooms } = require('../controllers/room')

router.get('/room', getAllRooms)
router.get('/room/:id', getRoom)
router.post('/room/:hotelid', verifyAdmin, createRoom)
router.patch('/room/:id', verifyAdmin, updateRoom)
router.delete('/room/:id/:hotelid', verifyAdmin, deleteRoom)

module.exports = router
