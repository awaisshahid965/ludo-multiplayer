const http = require('http')
const { app } = require('./src/app')
const { initializeSocketServer } = require('./src/socket')

const PORT = process.env.PORT || 3000

const server = http.createServer(app)
initializeSocketServer(server)

server.listen(PORT, () => {
    console.log(`App is listening on port ${PORT}`)
})