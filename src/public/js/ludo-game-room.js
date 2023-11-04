// socket initialization...

const socket = io('/ludo-game');
let userName, roomid;
let usersObj = {}
socket.on("connect", function() {
    userName = getUserName()
    roomid = window.location.pathname.split('/').filter(_ => !!_)[1]
    socket.emit('join_room', roomid)
})

socket.on('room_joined', () => {
    socket.emit('initialize_player', roomid, userName)
})

socket.on('ready', (usersDataObj) => {
    // start game
    usersObj = usersDataObj
    console.log(usersObj)
})


// game logic...

// var scores, roundScore, activePlayer, gamePlaying, lastDice;



