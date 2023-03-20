const board = document.querySelector('.game-board')
const restartButton = document.querySelector('.restart')
const playersForm = document.querySelector('#players')
const playerStatus = document.querySelector('.player-status')
const scoreboard = document.querySelector('.score-board')
const gameState = {
    board: [
        [null, null, null,],
        [null, null, null,],
        [null, null, null,],
    ],
    players: ['X', 'O'],

    scoreboard:[{
        name:'X',
        wins: 0,
        losses: 0,
    },
    {
        name:'O',
        wins: 0,
        losses: 0,
    }],

    currentPlayer: 'X',
    currentPlayerId: 0,
}

board.addEventListener('click', (e)=>{
    const row = e.target.id[0]
    const column = e.target.id[1]
    if (gameState.board[row][column] !== null){
        window.alert('This Space is Occupied')
        switchPlayers()
    }else {
        gameState.board[row][column] = gameState.currentPlayer
    }
        renderPlayers();
        renderPlayerStatus();
        switchPlayers();
        youWin();
        renderScoreboard();
        checkForTie();
    });

function renderPlayers(){
    for (let i=0; i<3; i++){
        for(let j=0; j<3; j++){
            let cell = document.getElementById(`${i}${j}`)
            cell.innerText = gameState.board[i][j];
        }
    }
}
playerStatus.innerHTML = `${gameState.scoreboard[0].name} Starts!`
function renderPlayerStatus(){
    if (gameState.currentPlayer[gameState.currentPlayerId] !== gameState.players[0]){
    playerStatus.innerHTML = `${gameState.scoreboard[0].name}'s turn!`
} else {
    playerStatus.innerHTML = `${gameState.scoreboard[1].name}'s turn!`
}
}
function renderScoreboard(){
    scoreboard.innerHTML = `
    ${gameState.scoreboard[0].name}'s Score: ${gameState.scoreboard[0].wins}
    <br>
    ${gameState.scoreboard[1].name}'s Score: ${gameState.scoreboard[1].wins}
    `
}
renderScoreboard()

for (let i=0; i<3; i++){
    for(let j=0; j<3; j++){
        const cell = document.createElement('div')
        cell.id = `${i}${j}`
        cell.classList.add('cell')
        board.append(cell)
    }
}
function switchPlayers(){
    if (gameState.currentPlayer !== gameState.players[0]){
        gameState.currentPlayer = gameState.players[0]
    } else {
        gameState.currentPlayer = gameState.players[1]
    }
}

restartButton.addEventListener('click', restart)

function restart(){
    gameState.board = [
    [null, null, null,],
    [null, null, null,],
    [null, null, null,],
]
    for (let i=0; i<3; i++){
        for(let j=0; j<3; j++){
            let cell = document.getElementById(`${i}${j}`)
            cell.innerText = '';
        }
    }
    playerStatus.innerHTML = ``;
    gameState.currentPlayer = 'X'
    playerStatus.innerHTML = `${gameState.scoreboard[0].name} Starts!`       
}

function checkRow(){
    for (let i = 0; i < gameState.board.length; i++){
        if (gameState.board[i][0] === gameState.board[i][1] && gameState.board[i][1] === gameState.board[i][2]
            && gameState.board[i][0] !== null){
                return true
            } 
    }
}

function checkColumn(){
    for (let i = 0; i < gameState.board.length; i++){
        if (gameState.board[0][i] === gameState.board[1][i] && gameState.board[1][i] === gameState.board[2][i] 
            && gameState.board[0][i] !== null){
                return true
            }
        }
}

function checkDiags(){
    if (gameState.board[0][0] === gameState.board[1][1] && gameState.board[1][1] === gameState.board[2][2] && gameState.board[0][0] !== null){
    return true
}
    if (gameState.board[0][2] === gameState.board[1][1] && gameState.board[1][1] === gameState.board[2][0] && gameState.board[0][2] !== null){
    return true
    } 
}

function tieRowOne(){
    if (gameState.board[0][1] !== null && gameState.board[0][2] !== null && gameState.board[0][3] !== null){
        return true 
    }
}

function tieRowTwo(){
    if (gameState.board[1][0] !== null && gameState.board[1][1] !== null && gameState.board[1][2] !== null){
        return true
    }
}

function tieRowThree(){
    if (gameState.board[2][0] !== null && gameState.board[2][1] !== null && gameState.board[2][2] !== null){
        return true 
    }
}

function checkForTie(){
    if (tieRowOne() === true && tieRowTwo() === true && tieRowThree() === true){
        window.alert(`Draw! Restarting Game...`)
        restart()
    }
}
function youWin(){
    if (checkRow() === true || checkColumn() === true || checkDiags() === true){
        let winningPlayer = gameState.currentPlayer[gameState.currentPlayerId]
        if (winningPlayer != gameState.players[0]){
        playerStatus.innerHTML = `${gameState.scoreboard[0].name} has won!`
        setTimeout(()=>window.alert(`${gameState.scoreboard[0].name} has won!`),250)
        gameState.scoreboard[0].wins++
        } else {
            playerStatus.innerHTML = `${gameState.scoreboard[1].name} has won!`
            setTimeout(()=>window.alert(`${gameState.scoreboard[1].name} has won!`),250)
            gameState.scoreboard[1].wins++
        } 
        setTimeout(restart, 1000)
    }
}
playersForm.addEventListener('submit', (e)=>{
    e.preventDefault()
    gameState.scoreboard[0].name = e.target[0].value
    gameState.scoreboard[1].name = e.target[1].value
});

