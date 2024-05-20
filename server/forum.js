const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const cors = require('cors')
const path = require('path')

const config = require('./config')

const connection = mongoose.connect(config.mongoUri, {
    useUnifiedTopology: true
})
mongoose.connection.on('connected', () => {
    console.log('Connection made')
})

const app = express()
app.use(bodyParser.json())
app.use(cors())

app.use(express.static(path.join(__dirname, '..', 'client/build')))

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'client/build/index.html'))
})

const PORT = 5005
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})