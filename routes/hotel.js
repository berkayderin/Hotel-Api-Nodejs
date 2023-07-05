const express = require('express')
const router = express.Router()
const { verifyAdmin } = require('../middlewares/verify')

const {
	createHotel,
	updateHotel,
	deleteHotel,
	getHotel,
	getAllHotels,
	typeByCount,
	typeByCity
} = require('../controllers/hotel')

router.get('/hotel', getAllHotels)
router.get('/hotel/:id', getHotel)
router.get('/hotel/type-count', typeByCount)
router.get('/hotel/type-city', typeByCity)
router.post('/hotel', verifyAdmin, createHotel)
router.patch('/hotel/:id', verifyAdmin, updateHotel)
router.delete('/hotel/:id', verifyAdmin, deleteHotel)

module.exports = router
