const userCardsContainer = document.querySelector('#user-cards-container')

const onJoinGameRequest = (userSocketId) => {
    console.log("join request initiated...", userSocketId)
    socket.emit('request_user_for_match', userSocketId)
}

const onClickJoinRequest = (event) => {
    if (event.target.className === 'list_users__join-btn') {
        onJoinGameRequest(event.target.dataset.socketid)
    }
}

userCardsContainer.addEventListener('click', onClickJoinRequest)

const getUserCardTemplate = (userName, socketId) => {
    return `
        <div class="list_user__user-card">
            <p class="list_users__user-name">${userName}</p>
            <button class="list_users__join-btn" data-socketId="${socketId}">Join Game</button>
        </div>
    `;
}

const getNoUserActiveTemplate = () => {
    return `
        <p class="list_user__no-user">
            Currently, there is no User Active... 😛
        </p>
    `
}

const renderNoActiveUserTemplate = () => {
    userCardsContainer.innerHTML = getNoUserActiveTemplate()
}

const addUsersListToDOM = (usersList = []) => {
    userCardsContainer.innerHTML = ''
    const userCardItems = usersList.map(user => getUserCardTemplate(user.userName, user.socketId))
    userCardsContainer.innerHTML = userCardItems.toString()
}

socket.on("get_active_user", (usersList) => {
    if (!usersList.length) {
        return renderNoActiveUserTemplate()
    }
    addUsersListToDOM(usersList)
})

socket.on('accept_game_proposal_request', ({ requestPlayerName, requestPlayerSocketId }) => {
    const hasAccpetedPropmt = prompt(`Enter 'Y' and press Ok to play with ${requestPlayerName}.`)
    const hasAccpeted = hasAccpetedPropmt?.[0]?.toLowerCase?.() === 'y'
    console.log('proposal accepted...', hasAccpeted)
    if (hasAccpeted) {
        socket.emit('on_game_request_accept', requestPlayerSocketId)
    }
})

socket.on("connect", () => {
    socket.emit('get_active_user_request')
})

socket.on("refresh_users", () => {
    socket.emit('get_active_user_request')
})

socket.on("move_to_game_room", (roomId) => {
    console.log(roomId, 'roomId')
    window.location.href = `${window.origin}/match/${roomId}`
})