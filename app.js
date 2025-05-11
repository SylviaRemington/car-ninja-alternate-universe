// Game state variables
let score = 0;
let lives = 3;
let timeLeft = 15;
let gameActive = false;
let spawnLoop;
let gameTimer;
let countdownInterval;

// DOM elements
const gameGrid = document.querySelector("#game-grid");
const cells = [];
const scoreDisplay = document.getElementById("points-earned");
const livesDisplay = document.getElementById("tries-left");
const countdownDisplay = document.getElementById("countdown-timer");
const startButton = document.getElementById("start-game");
const gameOverScreen = document.getElementById("gameover-screen");
const gameplayScreen = document.getElementById("gameplay-screen");
const playAgainButton = document.getElementById("play-again");

// Create the game grid
function createGrid() {
  for (let i = 0; i < 48; i++) { // 12x4 grid
    const cell = document.createElement("div");
    cells.push(cell);
    gameGrid.appendChild(cell);
    
    // Add click event to each cell
    cell.addEventListener("click", () => {
      if (!gameActive) return;
      
      // Check if cell has a car
      if (cell.classList.contains("car")) {
        score += 1;
        updateScore();
        cell.classList.remove("car");
        cell.innerHTML = "";
      } 
      // Check if cell has a pothole
      else if (cell.classList.contains("pothole")) {
        lives -= 1;
        updateLives();
        cell.classList.remove("pothole");
        cell.innerHTML = "";
        
        if (lives <= 0) {
          endGame(false); // Lose
        }
      }
    });
  }
}

// Start the game
function startGame() {
  // Reset game state
  score = 0;
  lives = 3;
  timeLeft = 15;
  gameActive = true;
  
  // Clear the grid
  cells.forEach(cell => {
    cell.classList.remove("car", "pothole");
    cell.innerHTML = "";
  });
  
  // Update displays
  updateScore();
  updateLives();
  
  // Show gameplay screen
  document.querySelectorAll(".screens").forEach(screen => {
    screen.classList.remove("active");
  });
  gameplayScreen.classList.add("active");
  
  // Start game elements
  startTimer();
  spawnLoop = setInterval(spawnRandomElement, 1000);
}

// Spawn cars or potholes
function spawnRandomElement() {
  if (!gameActive) return;
  
  const emptyCells = cells.filter(cell => 
    !cell.classList.contains("car") && 
    !cell.classList.contains("pothole")
  );
  
  if (emptyCells.length === 0) return;
  
  const randomCell = emptyCells[Math.floor(Math.random() * emptyCells.length)];
  
  // 70% chance for car, 30% for pothole
  if (Math.random() < 0.7) {
    randomCell.classList.add("car");
    randomCell.innerHTML = '<img src="https://images.autotrader.com/scaler/408/306/hn/c/03775bd69037404893e710eea5872111.jpg" alt="Car" style="width:100%;height:100%;">';
    
    // Remove car after 3 seconds if not clicked
    setTimeout(() => {
      if (randomCell.classList.contains("car")) {
        randomCell.classList.remove("car");
        randomCell.innerHTML = "";
        lives -= 1;
        updateLives();
        
        if (lives <= 0) {
          endGame(false); // Lose
        }
      }
    }, 3000);
  } else {
    randomCell.classList.add("pothole");
    randomCell.innerHTML = '<img src="https://media.istockphoto.com/id/174662203/photo/pot-hole.jpg" alt="Pothole" style="width:100%;height:100%;">';
    
    // Remove pothole after 3 seconds
    setTimeout(() => {
      if (randomCell.classList.contains("pothole")) {
        randomCell.classList.remove("pothole");
        randomCell.innerHTML = "";
      }
    }, 3000);
  }
}

// Timer functions
function startTimer() {
  countdownDisplay.textContent = `Time Left: ${timeLeft}`;
  
  countdownInterval = setInterval(() => {
    timeLeft--;
    countdownDisplay.textContent = `Time Left: ${timeLeft}`;
    
    if (timeLeft <= 3) {
      countdownDisplay.classList.add("low-time");
    }
    
    if (timeLeft <= 0) {
      endGame(score >= 10); // Win if score >= 10, else lose
    }
  }, 1000);
}

// End the game
function endGame(didWin) {
  gameActive = false;
  clearInterval(spawnLoop);
  clearInterval(countdownInterval);
  
  // Show game over screen
  gameplayScreen.classList.remove("active");
  gameOverScreen.classList.add("active");
  
  // Set win/lose message
  const message = document.createElement("h2");
  message.textContent = didWin ? "You Win!" : "Game Over!";
  message.className = didWin ? "win-message" : "lose-message";
  
  const scoreMessage = document.createElement("p");
  scoreMessage.textContent = `Final Score: ${score}`;
  
  gameOverScreen.innerHTML = "";
  gameOverScreen.appendChild(message);
  gameOverScreen.appendChild(scoreMessage);
  gameOverScreen.appendChild(playAgainButton.cloneNode(true));
}

// Update displays
function updateScore() {
  scoreDisplay.textContent = `Score: ${score}`;
}

function updateLives() {
  livesDisplay.textContent = `Lives: ${lives}`;
}

// Event listeners
startButton.addEventListener("click", startGame);
playAgainButton.addEventListener("click", startGame);

// Initialize the game
createGrid();