const socketio = require('socket.io')
const { onUserSocketNamespaceInitialization } = require('./users.socket')
const { onLudoGameSocketNamespaceInitialization } = require('./ludo-game.socket')

function initializeSocketServer(server) {
    const io = socketio(server)
    onUserSocketNamespaceInitialization(io)
    onLudoGameSocketNamespaceInitialization(io)
}

module.exports = {
    initializeSocketServer
}