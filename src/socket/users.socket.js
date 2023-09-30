const { uuid } = require("../utils")
const UserSocketManager = require("../utils/UserSocketManager")

const refreshActiveUsersAcrossOtherSockets = (socketInstance) => {
    socketInstance.broadcast.emit("refresh_users")
}

function usersSocketManager(socketInstance, io) {
    const socketId = socketInstance.id
    console.log(`ludo-socket-manager initialized with socket id: ${socketId}`)

    socketInstance.on("get_active_user_request", () => {
        socketInstance.emit("get_active_user", UserSocketManager.getOtherActiveUsers(socketId))
    })
    socketInstance.on("add_user_to_list", (userName) => {
        refreshActiveUsersAcrossOtherSockets(socketInstance)
        UserSocketManager.addUser(socketId, { socketId, userName })
    })

    socketInstance.on('request_user_for_match', (userSocketId) => {
        const { userName: requestPlayerName, socketId: requestPlayerSocketId } = UserSocketManager.getUserDataBySocketId(socketId)
        socketInstance.to(userSocketId).emit("accept_game_proposal_request", { requestPlayerName, requestPlayerSocketId })
    })

    socketInstance.on("on_game_request_accept", (userSocketId) => {
        io.to([socketId, userSocketId]).emit("move_to_game_room", uuid())
    })

    return {
        refreshActiveUsersAcrossOtherSockets
    }
}

function onUserSocketNamespaceInitialization(io) {
    const usersIo = io.of('/users')
    .on('connection', function(socket) {

        const { refreshActiveUsersAcrossOtherSockets } = usersSocketManager(socket, usersIo)

        socket.on("disconnect", function() {
            UserSocketManager.deleteUser(socket.id)
            refreshActiveUsersAcrossOtherSockets(socket)
        })
    })
}

module.exports = {
    onUserSocketNamespaceInitialization
}