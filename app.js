// Selecting elements from the DOM
const userScoreElement = document.getElementById("user-score");
const computerScoreElement = document.getElementById("computer-score");
const resultElement = document.getElementById("game-result");
const playAgainBtn = document.getElementById("play-again-btn");
let handsElement;
let computerChoiceElement;

// Initializing scores and turn counters
let userScore = 0;
let computerScore = 0;
let userTurns = 0;
let computerTurns = 0;

// Function to get a random choice for the computer
function getComputerChoice() {
  const choices = ["rock", "paper", "scissors"];
  const randomIndex = Math.floor(Math.random() * choices.length);
  return choices[randomIndex];
}

// Function to initialize elements after DOM content is loaded
document.addEventListener("DOMContentLoaded", () => {
  handsElement = document.querySelectorAll(".hands img");
  computerChoiceElement = document.getElementById("computer-choice-icon");
});

// Function to show the hand image for the given choice
function showImage(choice, player) {
  const handElements = document.querySelectorAll(`.${player} .hands img`);
  handElements.forEach(hand => {
    if (hand.id === `${choice}-hand`) {
      hand.style.display = "block";
      hand.style.visibility = "visible";
    } else {
      hand.style.display = "none";
      hand.style.visibility = "hidden";
    }
  });
}

// Function to update the score
function updateScore() {
  userScoreElement.textContent = userScore;
  computerScoreElement.textContent = computerScore;
}

// Function to display the result message
function showResult(resultText) {
  resultElement.textContent = resultText;
  resultElement.style.display = "block"; 
}


// Function to enable the play again button
function enablePlayAgainBtn() {
  playAgainBtn.style.display = "visible"; 
}

// Function to reset the game state
function resetGame() {
  userScore = 0;
  computerScore = 0;
  userTurns = 0;
  computerTurns = 0;
  updateScore();
  showResult("");
  if (handsElement) {
    handsElement.forEach(hand => {
      hand.style.display = "none";
      hand.style.visibility = "hidden";
    });
  }
}

// Function to handle the click event on the play again button
playAgainBtn.addEventListener("click", () => {
  // Reload the page to restart the game
  location.reload();
});
// Function to compare choices and determine the winner
function compareChoices(userChoice, computerChoice) {
  // Increment the turn counters
  userTurns++;
  computerTurns++;

  // Show the computer's choice image if computerChoiceElement is available
  if (computerChoiceElement) {
    computerChoiceElement.style.backgroundImage = `url(assets/${computerChoice}-hand.png)`;
  }

  if (userChoice === computerChoice) {
  } else if (
    (userChoice === "rock" && computerChoice === "scissors") ||
    (userChoice === "scissors" && computerChoice === "paper") ||
    (userChoice === "paper" && computerChoice === "rock")
  ) {
    userScore++;
  } else {
    computerScore++;
  }

  updateScore();

  // Check if both players have completed 5 turns
  if (userTurns === 5 && computerTurns === 5) {
    if (userScore > computerScore) {
      showResult("You won the game!");
    } else if (userScore < computerScore) {
      showResult("Computer won the game.");
    } else {
      showResult("It's a tie! No clear winner.");
    }
    enablePlayAgainBtn();
  }
}



// Function to add click event listeners to the buttons
function addButtonListeners() {
  const buttons = document.querySelectorAll(".btn");
  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      const choice = button.value;
      showImage(choice, "you");
      const computerChoice = getComputerChoice();
      showImage(computerChoice, "computer");
      compareChoices(choice, computerChoice);

      // Disable buttons after 5 turns
      if (userTurns === 5 && computerTurns === 5) {
        buttons.forEach((btn) => {
          btn.disabled = true;
        });
      }
    });
  });
}

// Initialize the game
addButtonListeners();
resetGame();
