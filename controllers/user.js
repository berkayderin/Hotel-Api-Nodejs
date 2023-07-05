const User = require('../models/user')

const updateUser = async (req, res, next) => {
	try {
		const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true })
		res.status(200).json({ message: 'Kullanıcı başarıyla güncellendi', user })
	} catch (error) {
		res.status(500).json({ error: error.message })
	}
}

const deleteUser = async (req, res, next) => {
	try {
		await User.findByIdAndDelete(req.params.id)
		res.status(200).json({ message: 'Kullanıcı başarıyla silindi' })
	} catch (error) {
		res.status(500).json({ error: error.message })
	}
}

const getUser = async (req, res, next) => {
	try {
		const user = await User.findById(req.params.id)
		res.status(200).json({ message: 'Kullanıcı başarıyla getirildi', user })
	} catch (error) {
		res.status(500).json({ error: error.message })
	}
}

const getAllUsers = async (req, res, next) => {
	try {
		const users = await User.find()
		res.status(200).json({ message: 'Kullanıcılar başarıyla getirildi', users })
	} catch (error) {
		res.status(500).json({ error: error.message })
	}
}

module.exports = {
	updateUser,
	deleteUser,
	getUser,
	getAllUsers
}
