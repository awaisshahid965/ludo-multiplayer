const socketio = require('socket.io')

function initializeSocketServer(server) {
    const io = socketio(server)
    io.on('connection', (socket) => {
        console.log(`user connnected with socket id: ${socket.id}`)
    })
}

module.exports = {
    initializeSocketServer
}