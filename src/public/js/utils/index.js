function getUserName() {
    const storedUserName = localStorage.getItem('userName')
    let userName = storedUserName ?? prompt("please enter your name:")
    while(!userName) {
        alert('Please enter correct username...')
        userName = prompt("please enter your name:")
    }
    localStorage.setItem('userName', userName)
    return userName
}

    