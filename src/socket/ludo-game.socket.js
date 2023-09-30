function ludoGameSocketManager(socketInstance, io) {}

function onLudoGameSocketNamespaceInitialization(io) {
    io.of('/ludo-game').on('connection', function(socket) {
        console.log('ludo game connected')

        ludoGameSocketManager(socket, io)

        socket.on("disconnect", function() {
            console.log('ludo game disconnected')
        })
    })
}

module.exports = {
    onLudoGameSocketNamespaceInitialization
}