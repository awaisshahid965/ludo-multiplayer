class UserSocketManager {
    static users = {}

    static getUserDataBySocketId = (socketId) => {
        return {...UserSocketManager.users[socketId]}
    }

    static addUser = (socketId, userData) => {
        UserSocketManager.users[socketId] = userData;
    }

    static deleteUser = (socketId) => {
        delete UserSocketManager.users[socketId];
    }

    static getAllUsers = () => Object.values(UserSocketManager.users)

    static updateUsersData = (socketId, userData) => {
        UserSocketManager.users[socketId] = userData;
    }

    static getOtherActiveUsers = (socketId) => {
        const tempUsers = {...UserSocketManager.users}
        delete tempUsers[socketId]
        return Object.values(tempUsers)
    }
}

module.exports = UserSocketManager