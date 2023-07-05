const Hotel = require('../models/Hotel')
const Room = require('../models/Room')

// hotel oluştur
const createHotel = async (req, res, next) => {
	try {
		const hotel = await Hotel.create(req.body)
		res.status(201).json(hotel)
	} catch (error) {
		res.status(500).json({ error: error.message })
	}
}

// hotel güncelle
const updateHotel = async (req, res, next) => {
	const { id } = req.params
	try {
		const hotel = await Hotel.findByIdAndDelete(id, req.body, { new: true })
	} catch (error) {
		res.status(500).json({ error: error.message })
	}
}

// hotel sil
const deleteHotel = async (req, res, next) => {
	const { id } = req.params
	try {
		await Hotel.findByIdAndDelete(id)
		res.status(200).json({ message: 'Hotel deleted successfully' })
	} catch (error) {
		res.status(500).json({ error: error.message })
	}
}

// hotel detay
const getHotel = async (req, res, next) => {
	const { id } = req.params
	try {
		const hotel = await Hotel.findById(id)
		res.status(200).json(hotel)
	} catch (error) {
		res.status(500).json({ error: error.message })
	}
}

// tüm otelleri getir
const getAllHotels = async (req, res, next) => {
	const { min, max, ...other } = req.query
	try {
		const hotels = await Hotel.find({
			...other,
			cheapestPrice: { $gt: min || 0, $lt: max || 999 }
		}).limit(req.query.limit)

		res.status(200).json(hotels)
	} catch (error) {
		res.status(500).json({ error: error.message })
	}
}

const typeByCount = async (req, res, next) => {
	try {
		const hotel = await Hotel.countDocuments({ type: 'hotel' })
		const villa = await Hotel.countDocuments({ type: 'villa' })

		res.status(200).json(
			{
				type: 'hotel',
				count: hotel
			},
			{
				type: 'villa',
				count: villa
			}
		)
	} catch (error) {
		res.status(500).json({ error: error.message })
	}
}

const typeByCity = async (req, res, next) => {
	try {
		const cities = req.query.cities.split(',')

		const hotel = await Promise.all(
			cities.map((city) => {
				return Hotel.countDocuments({ city: city })
			})
		)

		res.status(200).json(hotel)
	} catch (error) {
		res.status(500).json({ error: error.message })
	}
}

module.exports = {
	createHotel,
	updateHotel,
	deleteHotel,
	getHotel,
	getAllHotels,
	typeByCount,
	typeByCity
}
