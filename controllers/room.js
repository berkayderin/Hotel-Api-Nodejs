const Hotel = require('../models/Hotel')
const Room = require('../models/Room')

// oda oluştur
const createRoom = async (req, res, next) => {
	const hotelId = req.params.hotelid
	try {
		const room = await Room.create(req.body)

		await Hotel.findByIdAndUpdate(hotelId, {
			$push: { rooms: room._id }
		})

		res.status(201).json(room)
	} catch (error) {
		res.status(500).json({ error: error.message })
	}
}

// oda güncelle
const updateRoom = async (req, res, next) => {
	try {
		const room = await Room.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })

		res.status(200).json(room)
	} catch (error) {
		res.status(500).json({ error: error.message })
	}
}

// oda sil
const deleteRoom = async (req, res, next) => {
	const hotelId = req.params.hotelid
	try {
		await Room.findByIdAndDelete(req.params.id)

		await Hotel.findByIdAndUpdate(hotelId, {
			$pull: { rooms: req.params.id }
		})

		res.status(200).json({ message: 'Room deleted successfully' })
	} catch (error) {
		res.status(500).json({ error: error.message })
	}
}

// oda detay
const getRoom = async (req, res, next) => {
	try {
		const room = await Room.findById(req.params.id)

		res.status(200).json(room)
	} catch (error) {
		res.status(500).json({ error: error.message })
	}
}

// tüm odaları getir
const getAllRooms = async (req, res, next) => {
	try {
		const rooms = await Room.find()

		res.status(200).json(rooms)
	} catch (error) {
		res.status(500).json({ error: error.message })
	}
}

module.exports = {
	createRoom,
	updateRoom,
	deleteRoom,
	getRoom,
	getAllRooms
}
