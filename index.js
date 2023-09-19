const http = require('http')
const { app } = require('./src/app')

const server = http.createServer(app)