const mongoose = require('mongoose')

const db = () => {
	mongoose
		.connect(process.env.MONGO_URL, {
			useNewUrlParser: true,
			useUnifiedTopology: true
		})
		.then(() => {
			console.log('MongoDB bağlantısı başarılı.')
		})
		.catch((err) => {
			console.log(err)
		})
}

module.exports = db
