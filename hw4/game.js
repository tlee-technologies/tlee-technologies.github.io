/* 
Author: TJ
Date: 03/07/2025
Description: Updated JavaScript logic for Rock-Paper-Scissors Game with score tracking and play/reset functionality
*/

const choices = ["rock", "paper", "scissors"];
let playerChoice = null;
let playerScore = 0;
let computerScore = 0;

// Allow user to select their choice (rock, paper, or scissors)
document.querySelectorAll(".choice").forEach(choice => {
    choice.addEventListener("click", () => {
        console.log("User clicked on:", choice.getAttribute("data-choice"));
        clearSelection();
        choice.classList.add("selected");
        playerChoice = choice.getAttribute("data-choice");
    });
});

function clearSelection() {
    document.querySelectorAll(".choice").forEach(choice => {
        choice.classList.remove("selected");
    });
    playerChoice = null;
}

// Event listeners for play and reset buttons
document.getElementById("reset-button").addEventListener("click", resetGame);
document.getElementById("play-button").addEventListener("click", startComputerThrow);

function startComputerThrow() {
    if (!playerChoice) {
        alert("Please select Rock, Paper, or Scissors before playing!");
        return;
    }
    
    console.log("Starting computer throw...");
    
    const computerImage = document.querySelector("#computer-choice img");
    const resultText = document.getElementById("result");
    const waitingCaption = document.getElementById("waiting-caption");
    let shuffleCount = 0;
    
    resultText.textContent = "RESULTS: WAITING...";
    computerImage.src = "images/question-mark.PNG";
    computerImage.alt = "Waiting...";
    waitingCaption.style.visibility = "visible";

    const interval = setInterval(() => {
        const randomChoice = choices[Math.floor(Math.random() * choices.length)];
        computerImage.src = `images/${randomChoice}.PNG`;
        computerImage.alt = randomChoice.charAt(0).toUpperCase() + randomChoice.slice(1);
        shuffleCount++;
        console.log("Shuffling images... Step:", shuffleCount);
        if (shuffleCount >= 6) {
            clearInterval(interval);
            waitingCaption.style.visibility = "hidden";
            determineWinner(randomChoice);
        }
    }, 500);
}

function determineWinner(computerChoice) {
    const resultText = document.getElementById("result");
    console.log("Player choice:", playerChoice, "Computer choice:", computerChoice);
    
    if (playerChoice === computerChoice) {
        resultText.textContent = "RESULTS: IT'S A TIE!";
    } else if (
        (playerChoice === "rock" && computerChoice === "scissors") ||
        (playerChoice === "paper" && computerChoice === "rock") ||
        (playerChoice === "scissors" && computerChoice === "paper")
    ) {
        resultText.textContent = "RESULTS: YOU WIN!";
        playerScore++;
    } else {
        resultText.textContent = "RESULTS: YOU LOSE!";
        computerScore++;
    }
    updateScore();
    updatePlayButton();
}

function updateScore() {
    document.getElementById("score").textContent = `SCORE: Player ${playerScore} - Computer ${computerScore}`;
    console.log("Score updated. Player:", playerScore, "Computer:", computerScore);
}

function resetGame() {
    clearSelection();
    playerChoice = null;
    playerScore = 0;
    computerScore = 0;
    document.querySelector("#computer-choice img").src = "images/question-mark.PNG";
    document.getElementById("result").textContent = "RESULTS: WAITING...";
    document.getElementById("score").textContent = "SCORE: Player 0 - Computer 0";
    document.getElementById("waiting-caption").style.visibility = "visible";
    updatePlayButton();
    console.log("Game reset.");
}

function updatePlayButton() {
    const playButton = document.getElementById("play-button");
    if (playerScore === 0 && computerScore === 0) {
        playButton.textContent = "Play";
    } else {
        playButton.textContent = "Play Again";
    }
}