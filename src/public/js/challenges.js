const SHIFT_TURN_VALUE = 1
let scores;
let activePlayer;
let roundScore;
let gamePlaying;
let  winningScore;

function nextPlayer() {
    activePlayer = ++activePlayer % 2;
    roundScore = 0;

    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');

    document.getElementById('dice-1').style.display = 'none';
    document.getElementById('dice-2').style.display = 'none';
}

function init() {
    scores = [0, 0];
    activePlayer = 0;
    roundScore = 0;
    gamePlaying = true;
    winningScore = document.querySelector('.final-score')?.value ?? 100
    initGameScreen()
}

const initGameScreen = () => {
    document.getElementById('dice-1').style.display = 'none';
    document.getElementById('dice-2').style.display = 'none';

    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
}

document.querySelector('.btn-new').addEventListener('click', init);

// after initialization
function onGameEnd() {
    document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
    document.getElementById('dice-1').style.display = 'none';
    document.getElementById('dice-2').style.display = 'none';
    document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
    document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
    gamePlaying = false;
}

const isCurrentPlayerWon = () => scores?.[activePlayer] >= winningScore

function changePlayerTurn() {
    if (isCurrentPlayerWon()) {
        return onGameEnd()
    }
    nextPlayer();
}

function onCLickHoldButton() {
    if (!gamePlaying) {
        return;
    }
    scores[activePlayer] += roundScore;
    document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
    changePlayerTurn()
}

document.querySelector('.btn-hold').addEventListener('click', onCLickHoldButton);

function updateDiceValuesOnUI(dice1Value, dice2Value) {
    document.getElementById('dice-1').style.display = 'block';
    document.getElementById('dice-2').style.display = 'block';
    document.getElementById('dice-1').src = '/dice/dice-' + dice1Value + '.png';
    document.getElementById('dice-2').src = '/dice/dice-' + dice2Value + '.png';
}

// change dices
function getNewDiceValues() {
    const dice1Value = Math.floor(Math.random() * 6) + 1;
    const dice2Value = Math.floor(Math.random() * 6) + 1;
    return {
        dice1Value,
        dice2Value
    }
}

const hasToTurnShift = (dice1, dice2) => dice1 === SHIFT_TURN_VALUE || dice2 === SHIFT_TURN_VALUE

function updateRoundScoreValues(dice1Value, dice2Value) {
    roundScore += dice1Value + dice2Value;
    document.querySelector('#current-' + activePlayer).textContent = roundScore;
}

function updateRoundScore(dice1Value, dice2Value) {
    if (hasToTurnShift()) {
        return nextPlayer();
    }
    updateRoundScoreValues(dice1Value, dice2Value)
}

function onClickRollDiceButton() {
    const { dice1Value, dice2Value } = getNewDiceValues()
    updateDiceValuesOnUI(dice1Value, dice2Value)
    updateRoundScore(dice1Value, dice2Value)
}

document.querySelector('.btn-roll').addEventListener('click', onClickRollDiceButton);

init()