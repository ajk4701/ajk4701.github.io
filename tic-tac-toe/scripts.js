// JavaScript code for Tic-Tac-Toe game

// declare the board data for a game, using 3 arrays
// "-" indicates unmarked, "x" indicates an X mark, "o" indicates an O mark
let rowA = ["-", "-", "-"];
let rowB = ["-", "-", "-"];
let rowC = ["-", "-", "-"];

let currentTurn = "x";
let remainingMoves = 9;
let gameOver = false;

let currentPlayerDisplay;
let gameOutputMsg;
let replayButton;

//check if 3 spaces match
function spaceMatch(spaceA, spaceB, spaceC) {
    return spaceA == spaceB && spaceA == spaceC;
}

//check the game board for a winner or draw
function checkGameboard(a, b, c) {
    let outcome = "d";

    //cols
    if(spaceMatch(a[0], b[0], c[0]) && a[0] != "-") outcome = a[0];
    if(spaceMatch(a[1], b[1], c[1]) && a[1] != "-") outcome = a[1];
    if(spaceMatch(a[2], b[2], c[2]) && a[2] != "-") outcome = a[2];

    //rows
    if(spaceMatch(a[0], a[1], a[2]) && a[0] != "-") outcome = a[0];
    if(spaceMatch(b[0], b[1], b[2]) && b[0] != "-") outcome = b[0];
    if(spaceMatch(c[0], c[1], c[2]) && c[0] != "-") outcome = c[0];

    //diagonals
    if(spaceMatch(a[0], b[1], c[2]) && a[0] != "-") outcome = a[0];
    if(spaceMatch(a[2], b[1], c[0]) && a[2] != "-") outcome = a[2];

    return outcome;
}

function showGameOutcome(outcome) {
    gameOutputMsg.innerHTML = outcome;
    gameOutputMsg.classList.add("showOutcome");
    replayButton.style.display = "block";
    gameOver = true;
}

//handle clicking square
function clickSquare() {
    if(this.innerHTML == "" && !gameOver) {
        this.innerHTML = currentTurn;
        this.classList.add("clicked");

        remainingMoves--;

        //update array
        if(this.id == "a1") rowA[0] = currentTurn;
        if(this.id == "a2") rowA[1] = currentTurn;
        if(this.id == "a3") rowA[2] = currentTurn;

        if(this.id == "b1") rowB[0] = currentTurn;
        if(this.id == "b2") rowB[1] = currentTurn;
        if(this.id == "b3") rowB[2] = currentTurn;

        if(this.id == "c1") rowC[0] = currentTurn;
        if(this.id == "c2") rowC[1] = currentTurn;
        if(this.id == "c3") rowC[2] = currentTurn;

        console.log(rowA);
        console.log(rowB);
        console.log(rowC);

        let winState = checkGameboard(rowA, rowB, rowC);

        if (winState == "x") {
            showGameOutcome("X wins!");
        } else if (winState == "o") {
            showGameOutcome("O wins!");
            gameOver = true;
        } else if (winState == "d" && remainingMoves == 0) {
            showGameOutcome("Draw!");
            gameOver = true;
        }

        //switch player
        if(!gameOver) {
            if(currentTurn == "x") {
                currentTurn = "o";
            } else {
                currentTurn = "x";
            }
            currentPlayerDisplay.innerHTML = currentTurn;
        }
    }
}

//replay game
function replayGame() {
    rowA = ["-", "-", "-"];
    rowB = ["-", "-", "-"];
    rowC = ["-", "-", "-"];

    currentTurn = "x";
    remainingMoves = 9;
    gameOver = false;

    currentPlayerDisplay.innerHTML = currentTurn;
    gameOutputMsg.innerHTML = "";
    gameOutputMsg.classList.remove("showOutcome");
    replayButton.style.display = "none";

    let allSpaces = document.querySelectorAll(".cell");

    for(let eachSpace of allSpaces) {
        eachSpace.innerHTML = "";
        eachSpace.classList.remove("clicked");
    }
}

//page load
document.addEventListener("DOMContentLoaded", function() {
    let allSpaces = document.querySelectorAll(".cell");

    for(let eachSpace of allSpaces) {
        eachSpace.addEventListener("click", clickSquare);
    }
    
    currentPlayerDisplay = document.querySelector("#currentPlayer span");
    gameOutputMsg = document.querySelector("#gameOutcome");
    replayButton = document.querySelector("#replayButton");

    currentPlayerDisplay.innerHTML = currentTurn;
    replayButton.addEventListener("click", replayGame);
});