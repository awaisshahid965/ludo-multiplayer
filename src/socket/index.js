const socketio = require('socket.io')
const UserSocketManager = require('../utils/UserSocketManager')
const { ludoSocketManager } = require('./ludo.socket')

function initializeSocketServer(server) {
    const io = socketio(server)
    io.on('connection', function(socket) {

        const { refreshActiveUsersAcrossOtherSockets } = ludoSocketManager(socket, io)

        socket.on("disconnect", function() {
            UserSocketManager.deleteUser(socket.id)
            refreshActiveUsersAcrossOtherSockets(socket)
        })
    })
}

module.exports = {
    initializeSocketServer
}