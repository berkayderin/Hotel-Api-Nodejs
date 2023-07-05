const mongoose = require('mongoose')

const HotelSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true
	},
	description: {
		type: String,
		require: true
	},
	city: {
		type: String,
		required: true
	},
	distance: {
		type: String,
		required: true
	},
	photo: {
		type: String,
		required: true
	},
	address: {
		type: String,
		required: true
	},
	type: {
		type: String,
		required: true
	},
	title: {
		type: String,
		required: true
	},
	rating: {
		type: Number,
		min: 0,
		max: 5
	},
	room: {
		type: [String]
	},
	featured: {
		type: String,
		default: 'false'
	},
	price: {
		type: Number,
		required: true
	}
})

module.exports = mongoose.model('Hotel', HotelSchema)
