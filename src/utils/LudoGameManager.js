const LudoGame = require("./ludo-game.util");

const initGameDataValues = () => {
  return {
    scores: [0, 0],
    activePlayer: 0,
    roundScore: 75,
    gamePlaying: true,
  }
}

class LudoGameManager {
  static ludoGameRooms = {};

  static addUserToRoom(roomId, playerData) {
    if (!LudoGameManager.ludoGameRooms[roomId]) {
      LudoGameManager.ludoGameRooms[roomId] = {};
    }
    LudoGameManager.ludoGameRooms[roomId][playerData.socketId] = playerData;
  }

  static removeUserFromRoom(roomId, socketId) {
    if (LudoGameManager.ludoGameRooms[roomId]) {
      delete LudoGameManager.ludoGameRooms[roomId][socketId];
    }
  }

  static getUsersFromRoom = (roomId) =>  LudoGameManager.ludoGameRooms[roomId]

  // static getUsersGameData = (roomId) =>  {
  //   const usersData = LudoGameManager.getUsersFromRoom(roomId)
  //   const gameDataObject = {}
  //   for (let userData in usersData) {
  //     gameDataObject[usersData[userData].socketId] = {
  //       gameData: {
  //         ...usersData[userData].userGameData.getGameValues()
  //       }
  //     }
  //   }
  //   return gameDataObject
  // }

  static initGameUsers(roomId, socketId, userName) {
    const playerData = {
      userName,
      socketId,
      gameData: initGameDataValues(),
    };
    LudoGameManager.addUserToRoom(roomId, playerData);
  }
}

module.exports = LudoGameManager;