const User = require('../models/user')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const register = async (req, res, next) => {
	const { username, password, email } = req.body

	try {
		const user = await User.findOne({ email })
		if (user) {
			return res.status(500).json({ message: 'Böyle bir kullanıcı zaten var' })
		}

		if (password.length < 6) {
			return res.status(500).json({ message: 'Şifre 6 karakterden az olamaz' })
		}
		const passwordHash = await bcrypt.hash(password, 12)

		if (!validateEmail(email)) {
			return res.status(500).json({ message: 'Geçersiz email adresi' })
		}

		const newUser = await User.create({
			username,
			password: passwordHash,
			email
		})

		const accessToken = jwt.sign({ id: newUser._id, isAdmin: newUser.isAdmin }, 'JWT_SECRET', {
			expiresIn: '1h'
		})

		res
			.cookie('token', accessToken, {
				httpOnly: true
			})
			.status(201)
			.json({ message: 'Kullanıcı başarıyla oluşturuldu', accessToken })
	} catch (error) {
		res.status(500).json({ error: error.message })
	}
}

// email regex fonksiyonu
const validateEmail = (email) => {
	const re = /\S+@\S+\.\S+/
	return re.test(email)
}

const login = async (req, res, next) => {
	const { email, password } = req.body

	try {
		const user = await User.findOne({ email })
		if (!user) {
			return res.status(500).json({ message: 'Böyle bir kullanıcı bulunamadı' })
		}

		const isMatch = await bcrypt.compare(password, user.password)
		if (!isMatch) {
			return res.status(500).json({ message: 'Yanlış şifre' })
		}

		const accessToken = jwt.sign({ id: user._id, isAdmin: user.isAdmin }, 'JWT_SECRET', {
			expiresIn: '1h'
		})

		res.cookie('token', accessToken, {
			httpOnly: true
		})
		res.status(200).json({ message: 'Başarıyla giriş yapıldı', accessToken })
	} catch (error) {
		res.status(500).json({ error: error.message })
	}
}

module.exports = {
	register,
	login
}
