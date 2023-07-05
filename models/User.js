const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema(
	{
		username: {
			type: String,
			required: true
		},
		email: {
			type: String,
			required: true,
			unique: true
		},
		password: {
			type: String,
			require: true
		},
		country: {
			type: String
		},
		img: {
			type: String
		},
		city: {
			type: String
		},
		isAdmin: {
			type: Boolean,
			default: false
		}
	},
	{ timestamps: true }
)

module.exports = mongoose.model('User', UserSchema)
