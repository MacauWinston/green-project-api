require('dotenv').config()

const express = require('express')
const cors = require('cors')
const config = require('./config/config')
const bodyParser = require('body-parser')
const users = require('./routers/user_router')

const app = express()

app.use(express.static('public'))
app.use(cors())
app.use(bodyParser.json())

app.use('/users',users);

app.listen(config.port, () => {
    console.log('Server listening on port %s, Ctrl+C to stop', config.port)
})