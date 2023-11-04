const LudoGameManager = require("../utils/LudoGameManager")

function ludoGameSocketManager(socketInstance, io) {
    const socketId = socketInstance.id
    socketInstance.on('join_room', (roomid) => {
        socketInstance.join(roomid)
        io.to(roomid).emit('room_joined')
    })

    socketInstance.on("initialize_player", (roomid, userName) => {
        LudoGameManager.initGameUsers(roomid, socketId, userName)
        socketInstance.emit('ready', LudoGameManager.getUsersFromRoom(roomid))
    })

    // game logic...
}

function onLudoGameSocketNamespaceInitialization(io) {
    const ludoGameIo = io.of('/ludo-game')
    ludoGameIo.on('connection', function(socket) {
        console.log('ludo game connected')

        ludoGameSocketManager(socket, ludoGameIo)

        socket.on("disconnect", function() {
            console.log('ludo game disconnected')
        })
    })
}

module.exports = {
    onLudoGameSocketNamespaceInitialization
}