board = [
    "E", "E", "E", 
    "E", "E", "E", 
    "E", "E", "E", 
];

let game = {
    playerWon: false,
    activePlayer: "X",
    players: ["X","O"],
    X: "Player X's turn",
    O: "Player O's turn",
    playAgain: "Click the board to play again!",
}

wins = [
    [0,1,2], //horizontal wins
    [3,4,5],
    [6,7,8],

    [0,3,6], //vertical wins
    [1,4,7],
    [2,5,8],

    [0,4,8], //diagnal wins
    [6,4,2],
];

function testGameCompleted(board){
    
    for (let i in game.players){
        //for both X and O
        let player = game.players[i]

        for (let j in wins){
            winBoard = wins[j]
            
            //if all 3 positions of win are player's val
            if (    board[winBoard[0]] === player
                 && board[winBoard[1]] === player
                 && board[winBoard[2]] === player){
                
                //declare winner
                game.gameOver = true;
                winMsg(player)                
                return `${player} wins!`
            }
        }
    }

    if (!board.includes("E")) { //if board has no more empty values
                                //game is a tie                     
        winMsg("tie")
        game.gameOver = true;
        return "It's a tie!"
    }
    //otherwise, game continues
    return false
}


function play(boxId){
    //if the game has finished, reset the board on click
    if (game.gameOver) {return reset()}

    // convert string boxId to integer
    boxId = Number(boxId)

    //disallow re-using box
    if (board[boxId] !== "E") return "occupied" 

    let clickedBox = document.getElementById(boxId)
    let whichPlayer = document.getElementById("player")
    
    //assign player's val to DOM and storage
    clickedBox.innerHTML = game.activePlayer 
    board[boxId] = game.activePlayer
    
    //change DOM display to next player
    whichPlayer.innerHTML = 
        (whichPlayer.innerHTML === game.X) ? game.O : game.X
    game.activePlayer = (game.activePlayer === "X") ? "O" : "X"

    //test if the game has completed
    testGameCompleted(board)
}

function winMsg(endState){
    let msg = {
        X:   [ " ", "X", " ", "W", "O","N", "!", "!","!"],
        O:   [ " ", "X", " ", "W", "O","N", "!", "!","!"],
        tie: [ " ", " ", " ", "T", "I","E", "!", "!","!"],
    }
    let boxes = document.getElementsByTagName("td")
    for (i in boxes) {
        boxes[i].innerText = msg[endState].shift()
    }
    document.getElementById("player")
                    .innerHTML = game.playAgain
}

function reset(){
    board = [
        "E", "E", "E", 
        "E", "E", "E", 
        "E", "E", "E", 
    ];
    game.activePlayer = "X"
    game.gameOver = false;
    document.getElementById("player").innerHTML = game.X

    let boxes = document.getElementsByTagName("td")
    for (i in boxes) {
        boxes[i].innerText = ""
    }
}