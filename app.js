const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const dotenv = require('dotenv')
const db = require('./configs/db')

const authRoutes = require('./routes/auth')
const hotelRoutes = require('./routes/hotel')
const roomRoutes = require('./routes/room')
const userRoutes = require('./routes/user')

dotenv.config()

const app = express()

app.use(cors())
app.use(bodyParser.json({ limit: '50mb' }, { extended: true }))
app.use(bodyParser.urlencoded({ limit: '50mb' }, { extended: true }))
app.use(cookieParser())

app.use('/', authRoutes)
app.use('/api', hotelRoutes)
app.use('/api', roomRoutes)
app.use('/', userRoutes)

db()

const PORT = 3001
app.listen(PORT, () => {
	console.log(`${PORT} Portunda server çalışıyor.`)
})
