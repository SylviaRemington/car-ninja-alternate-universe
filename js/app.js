// CAR NINJA GAME JS

console.log('JS LINKED AND WORKING');

/*
✅ Create grid first in HTML CSS & JS - so have game's playing field needed for cars and potholes
Set Up Variables and Displays for score/lives/displays: ✅ Set up score, ✅ lives, and displays to track and show the game’s state.

✅ Set up these variables already:
let score, let lives, const gameGrid, const width, const height, const cellCount, const cells, const cell,
const gameplayScreen, const startButton, let gameTimer, let timeLeft, let countdownInterval,
const scoreDisplay, const countdownDisplay

Code the Start Game Button Functionality
Code the Score Functionality
Code the Lives Functionality
Code the Timer Functionality
Code the Car Spawning Functionality
Code the game Over-Functionality
Code the pothole spawning functionality
Code the win/loss conditions
Code for 3 Round Functionality

create click event where click on car and number generates for score
create click event where click on a cell that doesn't have points, and number generates for score
*/

/* ------ADDTL VARIABLES ADDED TO THE TOP THAT I WAS MISSING ----------*/

let spawnLoop = null;
let isGameActive = false; // New game state flag
const livesDisplay = document.getElementById('tries-left');
const countdownDisplay = document.getElementById('countdown-timer');
const gameOverScreen = document.getElementById('gameover-screen');


// /*-------- Temporary Code to Have For Gameplay Screen As Active Until I'm able to create code that moves from one screen to the next-----*/

//INSTRUCTIONS
// Get the elements
const instructionsButton = document.getElementById('instructions');
const instructionsScreen = document.getElementById('instructions-screen');
const starterScreen = document.getElementById('starter-screen');
const gameplayScreen = document.getElementById('gameplay-screen');
const backButton = document.getElementById('back-button');

//Instructions button so it functions:
instructionsButton.addEventListener('click', () => {
    // hiding all other screens first to prevent overlaps
    document.querySelectorAll('.screens').forEach(screen => {
        screen.classList.remove('active');
    });
    // to show only the instructions screen
    instructionsScreen.classList.add('active');
});

// Instructions button so it functions:
// instructionsButton.addEventListener('click', () => {
//     starterScreen.classList.remove('active');
//     gameplayScreen.classList.add('active'); 
    // instructionsScreen.classList.add('active');
// });

// Back button so it functions:
backButton.addEventListener('click', () => {
    instructionsScreen.classList.remove('active');
    gameplayScreen.classList.add('active');
});

/* ------CREATING GRID ----------*/

//CREATING GRID
//CREATING gameplayScreen WITH gameGrid - finding and then making it active
// const gameplayScreen = document.getElementById('gameplay-screen'); // Find gameplay screen //already typed above
gameplayScreen.classList.add('active'); // Show gameplay screen - as active (as opposed to hidden)


// Creating gameGrid
// /* Using tools/example Tristan showed in class*/
const gameGrid = document.querySelector("#game-grid");//grabbing the grid in html
const width = 12; // columns - width usually refers to how many columns are in each row. 12 columns * 12 rows = 144 squares total
const height = 4; // rows
const cellCount = width * height; //12 * 4 = 48 --currently creating a game with 12 across and 4 high -- subject to change later
const cells = []; //creating an empty array that is meant to store each cell of the grid as I create them in a loop.
const cell = document.createElement("div"); //creating the cells
let score = 0; //creating score variable for tracking player's points
// let lives = 3; // creating lives variable for tracking player's lives (3 total)
let car = document.createElement('img'); //defining car in global scope

function createGrid() {
        for (let i = 0; i < cellCount; i++) {
                const cell = document.createElement("div");
                cells.push(cell); // Store <div> elements, not numbers
                gameGrid.appendChild(cell);
        }
}
createGrid();


/* ------CREATING START BUTTON FUNCTIONALITY ----------*/


//CREATING START BUTTON FUNCTIONALITY
const startButton = document.getElementById("start-game");
startButton.addEventListener('click', startGame);

function startGame() {
    score = 0;
    isGameActive = true;
    updateScore();
    //clear any existing intervals
    if (spawnLoop) clearInterval(spawnLoop);
    if (countdownInterval) clearInterval(countdownInterval);

    // Reset screens
    document.getElementById('gameplay-screen').classList.add('active');
    document.getElementById('gameover-screen').classList.remove('active');

    //Start game functions
    spawnLoop = setInterval(spawnCar, 500);
    startGameTimer();
}

startButton.addEventListener('click', () => {
    console.log('Start button clicked');
    startGame();
});



/* ------ADD & REMOVE CYBERTRUCKS FOR CAR SPAWNING FUNCTIONALITY ----------*/


//PART OF CAR SPAWNING FUNCTIONALITY
//CREATING ADDING AND REMOVING CYBERTRUCK
function addCyberTruck(cellNumber) {
    cells[cellNumber].classList.add("cybertruck");
}

// ------

function removeCyberTruck() {
    cells[cybertruckPosition].classList.remove("cybertruck");
}


/* ------CREATING SPAWN CAR FUNCTIONALITY ----------*/

//CREATING SPAWN CAR SECTION
// SPAWN CAR Section
// spawnCar is showing up in between cells and not hitting cells - Need to figure out why not working
function spawnCar() { //Declaring a function called spawnCar that will run code to add a car image to the grid when called
    if (!isGameActive) return;
    const randomCellPick = Math.floor(Math.random() * cells.length); //storing a random # to pick a grid cell
    //Math.random()built in function generates decimal number and then it's multiplied by 48 //don't totally get it but it's working
    const cell = cells[randomCellPick];
    if (!cell.querySelector('img')) { // Check if cell is empty with no image so it can put an image in there
        const car = document.createElement('img'); //creates a new img html element
        car.src = '../images/cybertruck.jpg'; //setting image source
        car.alt = 'Cybertruck Car'; //setting alt text for accessibility and screen readers
        car.style.width = '100%'; //newly created car is styled with the width of 100% of the cell
        car.style.height = '100%'; //newly created car is styled with the height of 100% of the cell
        car.classList.add('car'); // Ensure CSS positioning
        cell.appendChild(car); //adds car as child of cell
        car.addEventListener('click', () => {
            if (isGameActive) {
                score++;
                updateScore();
                car.remove();
            }
        });
        setTimeout(() => {
            car.remove();
        }, 3000); //removes car from grid after 3 seconds if not clicked
}
}


// setInterval(spawnCar, 1000); // Spawn car every 1 second//! Commented out setInterval so that it doesn't immediately spawn cars immediately before game starts
//setInterval is a function that repeatedly calls a function at a set interval.


/* ------CREATING CLICK-TO-SCORE FUNCTIONALITY ----------*/


//ADDING CLICK-TO-SCORE FUNCTIONALITY
const scoreDisplay = document.getElementById("points-earned"); //selecting and creating a variable for the score display element

function updateScore() { //updates the score
    scoreDisplay.textContent = `Score: ${score}`;
}


/* ------CREATING COUNTDOWN TIMER FUNCTIONALTIY ----------*/


//ADDING COUNTDOWN TIMER FUNCTIONALITY, SO CODE DOESN'T GO ON INDEFINITELY
//getting help from chatgpt, deepseek, and grok big time for this one:

let gameTimer; // creating gameTimer for the 15-second timeout
let timeLeft = 15; //starting time for the 15-second timeout
let countdownInterval; //for live countdown display turning red in last 3 seconds

// const startButton = document.getElementById('start-game');//already declared
startButton.addEventListener('click', restartGame);


function startGameTimer() {
    const countdownDisplay = document.getElementById('countdown-timer');
    timeLeft = 15;
    countdownDisplay.textContent = `Time Left: ${timeLeft}`;

    if (countdownInterval) clearInterval(countdownInterval);
    if (gameTimer) clearTimeout(gameTimer);

    countdownInterval = setInterval(() => {
        if (timeLeft <= 0) {
            countdownDisplay.textContent = `Time Left: 0`;
            clearInterval(countdownInterval);
            triggerGameOver();
            return;
        }
        timeLeft--;
        countdownDisplay.textContent = `Time Left: ${timeLeft}`;
        if (timeLeft <= 3) {
            countdownDisplay.classList.add("low-time");
        } else {
            countdownDisplay.classList.remove("low-time");
        }
    }, 1000);
}

    // After 15 seconds, end the game
    gameTimer = setTimeout(() => {
      triggerGameOver();
    }, 15000);
 

    function triggerGameOver() {
        clearInterval(countdownInterval);
        if (spawnLoop) clearInterval(spawnLoop);
        spawnLoop = null;
        isGameActive = false;
    
        const cars = document.querySelectorAll('#game-grid img');
        cars.forEach(car => car.remove());
    
        const gameplayScreen = document.getElementById('gameplay-screen');
        const gameOverScreen = document.getElementById('gameover-screen');
        gameplayScreen.classList.remove('active');
        gameOverScreen.classList.add('active');
    
        const message = score >= 17 ? 'You Win! Ninja Master!' : 'Game Over, man! You lose! Try Again.';
        gameOverScreen.innerHTML = `<h2>${message}</h2><button id="play-again" class="buttons">Play Again!</button>`;
        document.getElementById('play-again').addEventListener('click', restartGame);
    }

    function restartGame() {
        // Reset score and timer display
        score = 0;
        timeLeft = 15;
        updateScore();
        document.getElementById('countdown-timer').textContent = `Time Left: ${timeLeft}`;
        
        // Clear any existing cars
        document.querySelectorAll('#game-grid img').forEach(img => img.remove());
        
        // Show gameplay screen, hide game over screen
        document.getElementById('gameplay-screen').classList.add('active');
        document.getElementById('gameover-screen').classList.remove('active');
        
        // Start the game
        startGame();
    }

    


/* ------CODE GRAVEYARD FOR OLD CODE NOT USING OR OLD NOTES ----------*/


// function restartGame() {
//     startGame();
// };


// Code Graveyard - Addtl added after
/*
#gameover-screen {
    text-align: center; /* Centers everything */
    /* padding-top: 150px; /* Pushes everything down */
/* }

.game-message {
    color: cornflowerblue;
    font-size: 30px;
    margin-bottom: 30px; /* Space between message and button */
/* } */
/* 
#play-again {
    font-size: 15px;
    padding: 10px 20px;
} */
 
/* #gameover-screen {
    text-align: center;
} */

// CODE GRAVEYARD ---------------------------------------------------------------
//I put my excess code and code ideas in another file since it's so large.
//If you want to see all the Code Graveyard code (thousands of lines with notes, ideas, etc), 
//you can find that on my github account under the repo name of "car-ninja-alternate-universe"

// CODE GRAVEYARD ---------------------------------------------------------------

// // CODE GRAVEYARD/*-------------------------------------------------------------------------------------------------------------------*/
// // CODE GRAVEYARD/*-------------------------------------------------------------------------------------------------------------------*/
// // CODE GRAVEYARD/*-------------------------------------------------------------------------------------------------------------------*/
// // CODE GRAVEYARD/*-------------------------------------------------------------------------------------------------------------------*/
// // CODE GRAVEYARD/*-------------------------------------------------------------------------------------------------------------------*/
// // CODE GRAVEYARD/*-------------------------------------------------------------------------------------------------------------------*/
// // CODE GRAVEYARD/*-------------------------------------------------------------------------------------------------------------------*/
// //HTML CSS JS DATA.JS  README LICENSE

// //LICENSE
// MIT License

// Copyright (c) 2025 Sylvia Remington

// Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

// The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

// ___________________________________

// In addition... From the creator, Sylvia Remington, this is a creation for a class assignment, and is my first time creating a game. I chose to create a game that is quite similar to Fruit Ninja except I am using cars and only "clicking on them". 

// This idea of using licensing was shared to me by Landon. He's been using this verbiage for his original code, and it was great to get the awareness of how we can protect our future original code and code ideas. I am using this MIT verbiage from Landon as a placeholder until I am able to research this further. I am aware that my game is very similar to Fruit Ninja, and most likely does not need any licensing since I'm creating it to learn how to code. However, I wanted to put this in my project as practice for future original projects! Yay!... Just wanted to get all this out there and be as transparent as possible. Thanks! 
// -------------
// //README
// # car-ninja-alternate-universe
// # car-ninja
// Car Ninja Game ---- Ready to ninja chop some cars??!? Have all the cars around you been driving too slowly in the fast lane, lately? And you're done with it?! If so, Car Ninja is for you!

// README Requirements:

// 1. Screenshot/Logo: A screenshot of your app or a logo.

// 2. Your game's name: Include a description of your game and what it does. Background info about the game and why you chose it is a nice touch.

// Game Name: Car Ninja

// Description:

// Background Info: I chose to create this game because (1) Fruit Ninja is FUN! Who doesn't like to slice random fruit and see it splat everywhere, without the real-life cleanup?! And (2) I wanted to create a game that is similar but with cars because when I drive in the United States, the drivers are horrible and they like to drive slowly in the fast lanes, and also don't abide by driving rules. I thought it would be fun to create a game where you could "slice" a car that's a poor driver (since you can't do it in real life. hehe). I figure this new rendition could be the solution for "road rage". Just play Car Ninja, and you won't want to do crazy things on the real road! lol

// 3. Getting started: Include a link to your deployed game and any instructions you deem important. This should also contain a link to your planning materials./Use one of these three terminologies "Deployed Game" or "Play at" or "Demo"
// Link to deployed game:
// Instructions: 
// Link to my planning materials:
// Excalidraw Proposal Rendering:
// User Stories:
// Pseudocode:

// 4. Attributions: This section should include links to any external resources (such as libraries or assets) you used to develop your application that require attribution. You can exclude this section if it does not apply to your application.
// General External Resources:
// Libraries: 
// Assets:
// References:

// 5. Technologies Used: List of the technologies used, for example: HTML, CSS, JavaScript, Google Fonts (is that a technology or just a linked site?), etc.
// HTML
// CSS
// JavaScript

// 6. Next Steps: Planned future enhancements (stretch goals).
// Expanding on the game and creating a full slice rather than just a click
// More animations.
// More sound effects.
// More backdrops including different locations.
// A fuller variety of cars.
// The ability to be different characters as you play.


// 7. //If time, add sections including: Features, Screenshot/Images/Visuals Descriptions,MVP Requirements, Early Concept/Ideas, Process aka Build/CodeProcess, Known Issues & Bug Solves, Edge Cases Covered, and also disclaimer since I'm re-creating a game that is already big "Fruit Ninja". Somewhere state that this is educational, for learning class purposes, and is from a ninja-movie-watching-fan!

// 8. Ahas & Awarenesses from this project while researching code, coding, and fixing bugs

// CONSISTENT TEXT - In my data.js section, inside Objects, using consistent text for the "key" in key: value pairs was especially eye opening for me, regarding ease of use later on in coding... Especially in JS iterating over arrays and objects (e.g. forEach, for...loop). Creating consistent text makes code more reusable and easier to maintain.

// Example: 

// MY INITIAL VERSION:
// const carComments = [
//     { comment1: "Oh noooo! I was driving to slow!" },//AI is saying I need consistent keys here and to name them all "text"/ask about this
//     { comment2: "" },
//     { comment3: "" },
//     { comment4: "" },
//     { comment5: "" } //Took off trailing comment here. Even though comma works with modern JS, doesn't work for older environments.
// ];

// CORRECTED VERSION FOR MORE USEABILITY:
// const carComments = [
//     { text: "Oh noooo! I was driving to slow!" },//AI is saying I need consistent keys here and to name them all "text"/ask about this
//     { text: "" },
//     { text: "" },
//     { text: "" },
//     { text: "" } //Took off trailing comment here. Even though comma works with modern JS, doesn't work for older environments.
// ];

// //README
// # car-ninja-alternate-universe
// # car-ninja
// Car Ninja Game ---- Ready to ninja chop some cars??!? Have all the cars around you been driving too slowly in the fast lane, lately? And you're done with it?! If so, Car Ninja is for you!

// README Requirements:

// 1. Screenshot/Logo: A screenshot of your app or a logo.

// 2. Your game's name: Include a description of your game and what it does. Background info about the game and why you chose it is a nice touch.

// Game Name: Car Ninja

// Description:

// Background Info: I chose to create this game because (1) Fruit Ninja is FUN! Who doesn't like to slice random fruit and see it splat everywhere, without the real-life cleanup?! And (2) I wanted to create a game that is similar but with cars because when I drive in the United States, the drivers are horrible and they like to drive slowly in the fast lanes, and also don't abide by driving rules. I thought it would be fun to create a game where you could "slice" a car that's a poor driver (since you can't do it in real life. hehe). I figure this new rendition could be the solution for "road rage". Just play Car Ninja, and you won't want to do crazy things on the real road! lol

// 3. Getting started: Include a link to your deployed game and any instructions you deem important. This should also contain a link to your planning materials./Use one of these three terminologies "Deployed Game" or "Play at" or "Demo"
// Link to deployed game:
// Instructions: 
// Link to my planning materials:
// Excalidraw Proposal Rendering:
// User Stories:
// Pseudocode:

// 4. Attributions: This section should include links to any external resources (such as libraries or assets) you used to develop your application that require attribution. You can exclude this section if it does not apply to your application.
// General External Resources:
// Libraries: 
// Assets:
// References:

// 5. Technologies Used: List of the technologies used, for example: HTML, CSS, JavaScript, Google Fonts (is that a technology or just a linked site?), etc.
// HTML
// CSS
// JavaScript

// 6. Next Steps: Planned future enhancements (stretch goals).
// Expanding on the game and creating a full slice rather than just a click
// More animations.
// More sound effects.
// More backdrops including different locations.
// A fuller variety of cars.
// The ability to be different characters as you play.


// 7. //If time, add sections including: Features, Screenshot/Images/Visuals Descriptions,MVP Requirements, Early Concept/Ideas, Process aka Build/CodeProcess, Known Issues & Bug Solves, Edge Cases Covered, and also disclaimer since I'm re-creating a game that is already big "Fruit Ninja". Somewhere state that this is educational, for learning class purposes, and is from a ninja-movie-watching-fan!

// 8. Ahas & Awarenesses from this project while researching code, coding, and fixing bugs

// CONSISTENT TEXT - In my data.js section, inside Objects, using consistent text for the "key" in key: value pairs was especially eye opening for me, regarding ease of use later on in coding... Especially in JS iterating over arrays and objects (e.g. forEach, for...loop). Creating consistent text makes code more reusable and easier to maintain.

// Example: 

// MY INITIAL VERSION:
// const carComments = [
//     { comment1: "Oh noooo! I was driving to slow!" },//AI is saying I need consistent keys here and to name them all "text"/ask about this
//     { comment2: "" },
//     { comment3: "" },
//     { comment4: "" },
//     { comment5: "" } //Took off trailing comment here. Even though comma works with modern JS, doesn't work for older environments.
// ];

// CORRECTED VERSION FOR MORE USEABILITY:
// const carComments = [
//     { text: "Oh noooo! I was driving to slow!" },//AI is saying I need consistent keys here and to name them all "text"/ask about this
//     { text: "" },
//     { text: "" },
//     { text: "" },
//     { text: "" } //Took off trailing comment here. Even though comma works with modern JS, doesn't work for older environments.
// ];


// // DATA.JS:
// //Below is data for putting funny car insult comments and also congratulatory comments.

// //ADDTL REMINDERS AND IDEAS:
// //objects have key:valuePairs,
// //create a randomization of pulling these comments. Figure out how to do that in JS.

// const carComments = [
//     { text: "Oh noooo! I was driving to slow!" },//AI is saying I need consistent keys here and to name them all "text"/ask about this
//     { text: "Bad cybertruck! Bad!" },
//     { text: "What are you doing on the road, cybertruck? You don't fit!" },
//     { text: "Slow drivers! Hiiiiya!!!" },
//     { text: "Why are you driving slowly in the fast lane?!" } //Took off trailing comment here. Even though comma works with modern JS, doesn't work for older environments.
// ];

// //This!.. is a CYBERTRUCK! CHOP IT! --EASTER EGG DOUG DIMURO CAR GUY

// const carClickCommentSounds = [
//     {text: "hiyyyyyyyaaaaaaa!"},
//     {text: "NINJA CHOP!"},
//     {text: "kapow!"},
//     {text: "Splat!"},
//     {text: "Wham!"},
//     {text: "Whack!"},
//     {text: "Slice!"},
//     {text: "Swoosh!"},
//     {text: "Snap!"},
//     {text: "Crack!"},
//     {text: "Zing!"},
//     {text: "Zoom!"},
//     {text: "Bam!"},
//     {text: "Ping!"},
//     {text: "Smack!"},
//     {text: "Strike!"},
//     {text: "Crush!"},
//     {text: "Flash!"},
//     {text: "Silence. Target destroyed!"},
//     {text: "Zoomf!"},
//     {text: "Boomf!"},
//     {text: "Chop Chop!"},
// ]

// const congratsComments = [
//     { text: "You're technique is very strong!" },
//     { text: "You are like the Iron Fist, chopping through cars and saving people from horrible drivers!" },
//     { text: "You are like Wolverine, cutting all these cars in half!" },
//     { text: "You're doing grrrrreat!" },
//     { text: "ALRIIIIGHT, YOU'VE CHOPPED ALL THE CYBERTRUCKS" },
//     { text: "CHOPPING THE CAR CHOPPING THE CAR" }//BREAKING THE LAW SONG
// ];


// const gameOverComments = [
//     {text: "Gameover, man! Gameover!"}, //from the movie Aliens2. Maybe also add "Why don't you put her in charge?!"
//     {text: "Dooooooooooooooode"},
//     {text: "Breh, you're not good at this."},
//     {text: "Beavis, I'm disappointed in you."},
//     {text: "Settle down, Beavis, you lost"},
//     {test: "Simmah down now! Simmah down nah!"}
// ];


// const carChoiceNinja = [
// {
//     name: "Ferrari Ninja",
//     speed: 120, //or could do a string "The speed of sound."
//     weapons: ["Sword", "Ninja Stars/Throwing Stars", "Nunchucks"],
//     locations: ["Rome", "Australia", "Nepal", "Japan", "Underground", "Under water"], //where car typically likes to drive
// },

// {
//     name: "Cybertruck Trashcan",
//     speed: 20,
//     weapons: "I'm a cybertruck. I look like a big weapon",
//     locations: ["Rome", "Australia", "Nepal", "Japan", "Underground", "Under water"], 
// }
// ];
// //above create a startGame function within the Object like...
// // startGame: function() {
// //     console.log("Game started!");
// // }

// // Access properties
// // console.log(carNinja.name); // "Ferrari Ninja"
// // carNinja.startGame(); // "Game started!"

// /*
// INFORMATION ABOUT INCONSISTENT KEYS THAT CAN BE DELETED LATER AFTER I DELVE MORE INTO THIS AND BETTER UNDERSTAND IT:
// Why Consistent Keys (e.g., text) Are Recommended

// You’re correct that iterating by index lets you access each object (e.g., carComments[0], carComments[1]), but the issue is accessing the comment text inside each object due to inconsistent keys (comment1, comment2, etc.). Here’s why this causes problems and why consistent keys help:
// Problem with Inconsistent Keys:
// Each object has a different key (comment1, comment2, comment3, etc.), so to get the comment text, you need to know which key to use for each index:
// carComments[0].comment1 gets “Oh noooo! I was driving to slow!”

// carComments[1].comment2 gets “”, etc.

// When iterating, you can’t use a single key to access the text. You’d need logic to match the index to the correct key (e.g., if index === 0, use comment1; if index === 1, use comment2), which is complex and error-prone.

// For specific comment selection (e.g., picking “Oh noooo!” for a slow-driving scenario), you must hardcode the key (comment1) and index (0), making your function less flexible.

// Why Consistent Keys Help:
// Using the same key (e.g., text) for all objects means you can access the comment text with one key, regardless of index:
// carComments[0].text, carComments[1].text, etc.

// Iteration: In a loop (e.g., index++), you can always use carComments[index].text to get the comment, no extra logic needed.

// Specific Selection: To pick a comment (e.g., “Oh noooo!”), use the index (carComments[0].text) or add an id/type property (e.g., { text: "Oh noooo!", type: "slow" }) for clarity, without needing unique keys.

// Simpler Functions: A function to display or select comments can assume text as the key, making your code reusable and easier to maintain (user story #24).

// Your Concern (No Confusion with Different Keys):
// You think different keys (comment1, comment2) help identify comments to avoid confusion, especially for specific functions. However:
// Indices Are Enough: The array’s index (0, 1, 2, ...) already identifies each comment uniquely. You can iterate with index++ and select by index (e.g., carComments[0] for “Oh noooo!”).

// Unique Keys Add Complexity: Needing to know comment1 vs. comment2 in your function logic is harder than using text and relying on indices or an id property.

// Example (no code): If you want “Oh noooo!” for a slow-driving function, check carComments[0].text or add { text: "Oh noooo!", id: "slow" } and filter by id, not comment1.


// */

// ------------

// <!-- CAR NINJA GAME HTML -->

// <!-- Instructions about how to play the game are included in your app. -->
// <!-- Include win/loss logic and render win/loss messages in HTML. The game you chose must have a win/lose condition. -->
// <!-- All images on the site have alt text. -->
// <!-- No text is placed on top of an image in a way that makes the text inaccessible. -->
// <!-- The game is coded using proper indentation. -->

// <!-- First create the screen/grid where cars move and have start button there.
// Then if have time create the other screens.
// Create the grid.
// Then create a start game button, an instructions button, a pause button, 
// an end game button, and also a place where points can be earned

// Also, created a data area where I can put car comments 
// and also audio sounds and funny comments. -->

 
// <!DOCTYPE html>
// <html lang="en"><!-- Defines the webpage in the english language. -->


// <head>
//     <meta charset="UTF-8">
//     <meta name="viewport" content="width=device-width, initial-scale=1.0">
//     <title>Car Ninja</title> <!-- Title of game to be displayed in browser tab -->
//     <meta property="og:title" content="Car Ninja"><!-- Added this line so that Car Ninja title shows up in the browser tab / It wasn't showing up prior to this.-->
//     <script defer src="./js/app.js"></script> <!-- Link to my JS file -->
//     <script defer src="./js/data.js"></script> <!-- Link to my data.js file -->
//     <!-- <link rel="stylesheet" href="./css/reset.css">  --> <!-- Link to Meyers CSS reset - will implement this as soon as I have more time to do styles-->
//     <link rel="stylesheet" href="./css/style.css"> <!-- Link to my CSS file -->
// </head>


// <body>

//     <!-- HEADER holds the game's title / Wanted to use Semantic Elements in HTML for better visibility & SEO on search engines. -->
//     <header class="header">
//         <h1>Car Ninja Game!</h1>
//     </header>


//     <h2 id ="gameplay-screen-title" class="screen-title">Time to Ninja Chop - Gameplay Screen</h2>

     
//     <!-- Using Nav Bar for buttons at the top instead of div - better navigation for all & easier readbility for SEO/other coders-->
//     <nav>
//         <button id="start-game" class="buttons">Start Game</button>
//         <button id="instructions" class="buttons">Instructions</button>
//         <!-- <button id="adjust-game-speed" class="buttons">Adjust Game Speed</button>the ability to choose a different game speed each time -->
//         <!-- <button id="pause-game" class="buttons">Pause Game</button>Also have a button to click on if you want to pause game or leave/start over -->
//         <!-- <button id="leave-game" class="buttons">Leave Game</button> -->
//     </nav>



//     <!-- MAIN GAME SCREENS - houses the game's 4 screens of the Starter Screen, the Instructions Screen, the Gameplay Screen, and the GameOver Screen -->
//     <main>

//         <!-- STARTER SCREEN -- chose to do section instead of div for each screen for better SEO & readibility -->
//         <section id="starter-screen" class="screens">
//             <button id="get-your-car" class="buttons">Get Your Car</button><!-- the ability to choose different cars each time play -->
//             <button id="swords" class="buttons">Sword, Stars, or Nunchucks</button><!-- the ability to choose different weapons each time play -->
//             <button id="level-up" class="buttons">Level Up!</button><!-- the ability to level up with different missions after a certain amount of points -->
//             <h2>Welcome to Car Ninja</h2>
//             <h3>Ready to Ninja Chop Some Cars?!!!</h3>
//             <p>Click "Start Game" to begin or read more about the game by clicking "Instructions" to learn how to
//                 play!</p>
//         </section>


//         <!-- INSTRUCTIONS SCREEN -->
//         <section id="instructions-screen" class="screens">
//             <h2>Instructions</h2>
//             <p><strong>Your challenge if you choose to accept it...</strong></p>
//             <ol>
//                 <li>Click cars to score points. Don't you wanna get slow drivers, bad drivers, and cybertrucks off the road?</li>
//                 <!-- <li>Avoid potholes to keep lives. If you click on a pothole, you lose a life!</li> //for level up -->
//                 <li>Score 17+ points in 15 seconds to win!</li>
//                 <li>Hit the "Start Game" button to play again!</li>
//             </ol>
//         </section>


//         <!-- GAMEPLAY SCREEN -->
//         <section id="gameplay-screen" class="screens">

//             <!-- SCORE DISPLAY - recommended to use span because inline and because it's dynamic text-->
//             <div class="score-display"><!-- Using class instead of id for reusability, in case create another screen with points earned. -->
//                 <span id="points-earned">Score: 0</span><!-- Using an id name that makes sense to me for easier referencing -->
//                 <!-- <span id="tries-left">Lives: 3</span>Using an id name that makes sense to me for easier referencing -->
//                 <span id="countdown-timer">Time Left: 15</span>
//             </div>

//             <!-- GAME-GRID -->
//             <div id="game-grid">
//                 <!-- <img src="https://images.autotrader.com/scaler/408/306/hn/c/03775bd69037404893e710eea5872111.jpg"
//                     width="100" height="100" alt="Car Name Of Image Here">
//                 <img src="https://media.istockphoto.com/id/174662203/photo/pot-hole.jpg?s=612x612&w=0&k=20&c=HhFYQD5qAJItGzYWJJQ72nxBR8iidL7Np2g82dfvnoM="
//                     width="100" height="100" alt="Pothole Image Here"> -->
//             </div>
//             <!-- Create more car image/images -->
//             <!-- Create potholes/bombs you shouldn't click -->
//             <!-- have a 'ready...3 2 1... go'section -->
//         </section>


//         <!-- GAMEOVER SCREEN... have Bill Paxton saying "Game Over Man! Game Over! Why don't we put her in charge?" -->
//         <section id="gameover-screen" class="screens">
//             <button id="fun-facts" class="buttons">Fun Facts</button>
//         </section>

//     </main>

    

//     <!-- FOOTER  -->
//     <footer>
//         <!-- <button id="play-again" class="buttons">Play Again!</button> -->
//         <!-- <button id="back-to-home-screen" class="buttons">Back To Home Screen</button> //to be used later when work on game later-->
//         <!-- <button id="ninja-ads" class="buttons">Ads?! Ninja Chop Them!</button> -->
//         <!-- create funny ads that pop up and then you ninja chop them randomly whether in the game or outside the game. -->
//     </footer>

// </body>

// </html>

// ----
// //CSS 
// /* CAR NINJA GAME CSS */

// /* CSS Flexbox and/or Grid is used for page layout design. */

// /* Colors used on the site have appropriate contrast that meet the 
// WCAG 2.0 level AA standard. */

// /* The game is coded using proper indentation. */

// /*ADDTL INFO FOR HIDING ELEMENTS - TO BE DELETED BEFORE SUBMISSION

// What Does display: none Mean?

// Definition: display: none in CSS hides an element completely from the page, removing it from the 
// layout as if it doesn’t exist. It’s not visible, and it takes up no space (unlike visibility: hidden, 
// which hides but keeps space).

// Use in Your Game: You’d use display: none to hide screens (e.g., <div id="gameplay-screen">) or content 
// (e.g., instructions) initially, then use JavaScript to set display: block to show them when needed 
// (e.g., when clicking “Play Game” or “Instructions”, user stories #1–2).

// Example Context: Apply display: none to <div id="gameplay-screen"> in CSS so it’s hidden until the game starts,
//  controlled by JavaScript. */


// /*******************************
//   RESETS & GLOBAL STYLES IN BODY
// ********************************/
// * {
//   box-sizing: border-box;
// }

// body {
//   background-color: lightgrey;
// }



// /*****************************
// HEADER STYLES
// *****************************/
// header h1 { /* chose header h1 to differentiate between other headers on other screens */
//   color: cornflowerblue;/* originally using this color and might come back to color: rgb(39, 39, 231); */
//   -webkit-text-stroke: 1px black; /* Black outline around letters */
//   text-align: center;
//   margin-bottom: 5px;
// }

// h2 {
//   margin-top: 0; 
//   /* removes all space above */
//   margin-bottom: .8px;
//   color: cornflowerblue;
//   -webkit-text-stroke: 1px black;
//   text-align: center;
//   margin-bottom: 11px;
// }



// /*****************************
// NAVIGATION BAR STYLES
// *****************************/
// nav {
//   display: flex;
//   justify-content: center;
//   gap: 12px;
// }



// /*****************************
// BUTTON STYLES
// *****************************/

// /* ALL BUTTONS */
// .buttons {
//   /* dark blue with light blue border */
//   background-color: cornflowerblue;
// }

// /* START GAME BUTTON & INSTRUCTIONS BUTTONS */
// #start-game, #instructions {
//   background-color: yellow;
// }

// /* BACK TO HOME SCREEN BUTTON */
// #play-again, #back-to-home-screen {
//   background-color: yellow;
// }



// /*******************************
// HIDING SCREENS
// ********************************/
// .screens {
//   display: none;
// }

// .active { 
//   /* Any element with class="active" will be visible on the screen. And the class="active" is done in JS */
//   display: block;
// }



// /*****************************
// SCREEN-SPECIFIC STYLES
// *****************************/

// /* Styling Of Different Screens below */
// #starter-screen h2, #instructions-screen h2 {
//   color: cornflowerblue;/* originally using this color and might come back to color: rgb(39, 39, 231); */
//   -webkit-text-stroke: 1px black; /* Black outline around letters */
//   text-align: left;
// }

// /* #gameplay-screen-title {} */


// /* DOUBLE CHECK THIS STYLING BELOW WITH RESETING MARGIN AND MAKE SURE IT'S CORRECT */
// #instructions-screen p,
// #instructions-screen ol {
// margin: 0;/* Resets top/bottom margins */
// }


// #instructions-screen p {
//   font-size: 12px;
//   margin-top: 0;
//   color: black;
// }

// #instructions-screen

// ol {
//   font-size: 12px;
//   font-weight: semi-bold;
// }

// /* Trying to add thin black border around images... and not currently working*/
// #game-grid img {
//   border: 5px black;
// }



// /*****************************
// SCORE & LIVES STYLES
// *****************************/

// .score-display {
//   color: white;
//   font-size: 24px;
//   font-family: Arial, sans-serif;
//   background: rgba(0, 0, 0, 0.5);
//   padding: 10px;
//   border-radius: 5px;
//   margin-top: 10px;
//   margin-bottom: 20px; /* Space between score and game grid */
//   text-align: center; /* Optional: Center the text */
// }

// #points-earned, #tries-left {
//   margin-right: 20px;
// }



// /*****************************
//           GRID 
// *****************************/

// #game-grid {/* targeting the full container/the outer wrapper holding all the grid squares */
//   display: flex; /* to arrange cells in the grid*/
//   flex-wrap: wrap; /* to arrange cells in the grid */
//   width: 600px; /*sets grid size - fixed width for 12 columns so grid has stability depending on screen size */
//   margin: 0 auto; /* to center the grid on the page & fixes left alignment issue*/

// }

// #game-grid div { /* targeting each individual box inside the grid */
//   width: calc(100% / 12); /* makes every cell exactly 50px wide (600 divided by 12) */
//   height: 50px;  /* keeps height 50px for 4 rows - not sure why height in px works but height in % doesn't */
//   border: 1px solid rgb(17, 111, 142); /* for cell outlines */
//   box-sizing: border-box; /* ensures borders are included in width */
// }

// #game-grid div.cybertruck {
//   background-image: url("../images/cybertruck.jpg");
//   background-size: 100% 100%; /* stretch to fill cell - I'm ok if image is distorted - wanted it to be on purpose so car looks more cartoony */
//   /* Can use background-size: cover too to fill without the distortion */
//   background-repeat: no-repeat; /*to show one image*/
//   background-position: center; /*to center the in the cell*/
// }



// /*****************************
// FOOTER STYLES
// *****************************/
// footer {
//   display: flex;
//   justify-content: right;
//   gap: 15px;
//   /* margin-top: 12px; */
// }

// #play-again, #back-to-home-screen {
//   margin-top: 12px;
// }

// -------------


// // CAR NINJA GAME JS

// console.log('JS LINKED AND WORKING');

// /*
// ✅ Create grid first in HTML CSS & JS - so have game's playing field needed for cars and potholes
// Set Up Variables and Displays for score/lives/displays: ✅ Set up score, ✅ lives, and displays to track and show the game’s state.

// ✅ Set up these variables already:
// let score, let lives, const gameGrid, const width, const height, const cellCount, const cells, const cell,
// const gameplayScreen, const startButton, let gameTimer, let timeLeft, let countdownInterval,
// const scoreDisplay, const countdownDisplay

// Code the Start Game Button Functionality
// Code the Score Functionality
// Code the Lives Functionality
// Code the Timer Functionality
// Code the Car Spawning Functionality
// Code the game Over-Functionality
// Code the pothole spawning functionality
// Code the win/loss conditions
// Code for 3 Round Functionality

// create click event where click on car and number generates for score
// create click event where click on a cell that doesn't have points, and number generates for score
// */

// /* ------ADDTL VARIABLES ADDED TO THE TOP THAT I WAS MISSING ----------*/

// // let score = 0;
// let spawnLoop = null;
// // let countdownInterval = null;
// // let gameTimer = null;
// // let timeLeft = 15;
// let isGameActive = false; // New game state flag
// // const cells = [];
// // const cell = document.createElement("div");
// // let car = document.createElement('img');
// const livesDisplay = document.getElementById('tries-left');
// const countdownDisplay = document.getElementById('countdown-timer');
// const gameOverScreen = document.getElementById('gameover-screen');


// // /*-------- Temporary Code to Have For Gameplay Screen As Active Until I'm able to create code that moves from one screen to the next-----*/

// //CREATING GRID
// //CREATING gameplayScreen WITH gameGrid - finding and then making it active
// const gameplayScreen = document.getElementById('gameplay-screen'); // Find gameplay screen
// gameplayScreen.classList.add('active'); // Show gameplay screen - as active (as opposed to hidden)


// // Creating gameGrid
// // /* Using tools/example Tristan showed in class*/
// const gameGrid = document.querySelector("#game-grid");//grabbing the grid in html
// const width = 12; // columns - width usually refers to how many columns are in each row. 12 columns * 12 rows = 144 squares total
// const height = 4; // rows
// const cellCount = width * height; //12 * 4 = 48 --currently creating a game with 12 across and 4 high -- subject to change later
// const cells = []; //creating an empty array that is meant to store each cell of the grid as I create them in a loop.
// const cell = document.createElement("div"); //creating the cells
// let score = 0; //creating score variable for tracking player's points
// // let lives = 3; // creating lives variable for tracking player's lives (3 total)
// let car = document.createElement('img'); //defining car in global scope

// function createGrid() {
//         for (let i = 0; i < cellCount; i++) {
//                 const cell = document.createElement("div");
//                 cells.push(cell); // Store <div> elements, not numbers
//                 gameGrid.appendChild(cell);
//         }
// }
// createGrid();

// // ------------------------------

// //CREATING START BUTTON FUNCTIONALITY
// const startButton = document.getElementById("start-game");
// startButton.addEventListener('click', startGame);

// function startGame() {
//     score = 0;
//     isGameActive = true;
//     updateScore();
//     if (spawnLoop) clearInterval(spawnLoop);
//     if (countdownInterval) clearInterval(countdownInterval);
//     spawnLoop = setInterval(spawnCar, 500);
//     startGameTimer();
// }

// startButton.addEventListener('click', () => {
//     console.log('Start button clicked');
//     startGame();
// });

// // function startGame() {
// //     // reset game state
// //     score = 0;
// //     lives = 3;
// //     updateScore();//Do I need to create an additional function for this?
// // //     updateLives();//this isn't defined yet - //Do I need to create an additional function for this?
// //     //start timer
// //     startGameTimer();
// //     //start spawning cars
// //     spawnLoop = setInterval(spawnCar, 1000);//spawning cars every second
// // }

// // ------------------------------

// //PART OF CAR SPAWNING FUNCTIONALITY
// //CREATING ADDING AND REMOVING CYBERTRUCK
// function addCyberTruck(cellNumber) {
//     cells[cellNumber].classList.add("cybertruck");
// }
// // addCybertruck(7);
// // ------

// function removeCyberTruck() {
//     cells[cybertruckPosition].classList.remove("cybertruck");
// }

// // ------------------------------

// function spawnCar() {
//     if (!isGameActive) return;
//     const randomCellPick = Math.floor(Math.random() * cells.length);
//     const cell = cells[randomCellPick];
//     if (!cell.querySelector('img')) {
//         const car = document.createElement('img');
//         car.src = '../images/cybertruck.jpg';
//         car.alt = 'Cybertruck Car';
//         car.style.width = '100%';
//         car.style.height = '100%';
//         car.classList.add('car');
//         cell.appendChild(car);
//         car.addEventListener('click', () => {
//             if (isGameActive) {
//                 score++;
//                 updateScore();
//                 car.remove();
//             }
//         });
//         setTimeout(() => {
//             car.remove();
//         }, 3000);
//     }
// }


// // //CREATING SPAWN CAR SECTION
// // // SPAWN CAR Section
// // // spawnCar is showing up in between cells and not hitting cells - Need to figure out why not working
// // function spawnCar() { //Declaring a function called spawnCar that will run code to add a car image to the grid when called
// //     const randomCellPick = Math.floor(Math.random() * cells.length); //storing a random # to pick a grid cell
// //     //Math.random()built in function generates decimal number and then it's multiplied by 48 //don't totally get it but it's working
// //     const cell = cells[randomCellPick];
// //     if (!cell.querySelector('img')) { // Check if cell is empty with no image so it can put an image in there
// //         const car = document.createElement('img'); //creates a new img html element
// //         car.src = '../images/cybertruck.jpg'; //setting image source
// //         car.alt = 'Cybertruck Car'; //setting alt text for accessibility and screen readers
// //         car.style.width = '100%'; //newly created car is styled with the width of 100% of the cell
// //         car.style.height = '100%'; //newly created car is styled with the height of 100% of the cell
// //         car.classList.add('car'); // Ensure CSS positioning
// //         cell.appendChild(car); //adds car as child of cell
// //         car.addEventListener('click', () => {
// //             score++;
// //             updateScore();
// //             car.remove(); //remove the car once it is clicked
// //         })
        
// //         setTimeout(()=>{
// //             car.remove();
// //         }, 3000); //removes car from grid after 3 seconds if not clicked
// //     }
// // }

// // setInterval(spawnCar, 1000); // Spawn car every 1 second//! Commented out setInterval so that it doesn't immediately spawn cars immediately before game starts
// //setInterval is a function that repeatedly calls a function at a set interval.


// // ------------------------------

// //ADDING CLICK-TO-SCORE FUNCTIONALITY
// const scoreDisplay = document.getElementById("points-earned"); //selecting and creating a variable for the score display element

// function updateScore() { //updates the score
//     scoreDisplay.textContent = `Score: ${score}`;
// }

// // ------------------------------
// // ------------------------------

// //ADDING COUNTDOWN TIMER FUNCTIONALITY, SO CODE DOESN'T GO ON INDEFINITELY
// //getting help from chatgpt, deepseek, and grok big time for this one

// let gameTimer; // creating gameTimer for the 15-second timeout
// let timeLeft = 15; //starting time for the 15-second timeout
// let countdownInterval; //for live countdown display turning red in last 3 seconds

// // const startButton = document.getElementById('start-game');//already declared
// startButton.addEventListener('click', restartGame);


// function startGameTimer() {
//     const countdownDisplay = document.getElementById('countdown-timer');
//     timeLeft = 15;
//     countdownDisplay.textContent = `Time Left: ${timeLeft}`;

//     if (countdownInterval) clearInterval(countdownInterval);
//     if (gameTimer) clearTimeout(gameTimer);

//     countdownInterval = setInterval(() => {
//         if (timeLeft <= 0) {
//             countdownDisplay.textContent = `Time Left: 0`;
//             clearInterval(countdownInterval);
//             triggerGameOver();
//             return;
//         }
//         timeLeft--;
//         countdownDisplay.textContent = `Time Left: ${timeLeft}`;
//         if (timeLeft <= 3) {
//             countdownDisplay.classList.add("low-time");
//         } else {
//             countdownDisplay.classList.remove("low-time");
//         }
//     }, 1000);
// }


// //More recent startGameTimer
// // function startGameTimer() {
// //     const countdownDisplay = document.getElementById('countdown-timer');
// //     timeLeft = 15; // Setting game time to 15 seconds
// //     countdownDisplay.textContent = `Time Left: ${timeLeft}`;

// //     // Countdown that updates every second
// //     countdownInterval = setInterval(() => {
// //         if (timeLeft <= 0) {
// //             countdownDisplay.textContent = `Time Left: 0`; // Ensure display stops at 0
// //             clearInterval(countdownInterval); // Stop the interval
// //             return; // Exit the interval callback
// //         }

// //         timeLeft--;
// //         countdownDisplay.textContent = `Time Left: ${timeLeft}`;

// //         if (timeLeft <= 3) {
// //             countdownDisplay.classList.add("low-time");
// //         } else {
// //             countdownDisplay.classList.remove("low-time");
// //         }
// //     }, 1000);

// //     // After 15 seconds, end the game
// //     gameTimer = setTimeout(() => {
// //         triggerGameOver();
// //     }, 15000);
// // }


// // OLDER FUNCTION
// // function startGameTimer() {
// //     const countdownDisplay = document.getElementById('countdown-timer'); //selecting element
// //     timeLeft = 15; //setting game time to 15 seconds - resetting time
// //     countdownDisplay.textContent = `Time Left: ${timeLeft}`;
  
// //     // Countdown that updates every second
// //     countdownInterval = setInterval(() => {
// //       timeLeft--;
// //       countdownDisplay.textContent = `Time Left: ${timeLeft}`;

// //       if(timeLeft <= 3) {
// //         countdownDisplay.classList.add("low-time");
// //       } else {
// //         countdownDisplay.classList.remove("low-time");
// //       }

// //       if (timeLeft <= 0) {
// //         clearInterval(countdownInterval);
// //       }
// //     }, 1000);

//     // function startCountdown(callback) {
//     //     const countdownDisplay = document.getElementById('start-countdown-display');
//     //     let countdown = 3; // Start at 3 seconds
    
//     //     countdownDisplay.textContent = countdown;
    
//     //     const interval = setInterval(() => {
//     //         countdown--;
//     //         if (countdown > 0) {
//     //             countdownDisplay.textContent = countdown;
//     //         } else if (countdown === 0) {
//     //             countdownDisplay.textContent = 'Go!';
//     //         } else {
//     //             countdownDisplay.textContent = ''; // Clear display
//     //             clearInterval(interval);
//     //             callback(); // Start the game
//     //         }
//     //     }, 1000); // Update every second
//     // }
  
//     // After 15 seconds, end the game
//     gameTimer = setTimeout(() => {
//       triggerGameOver();
//     }, 15000);
 

//     function triggerGameOver() {
//         clearInterval(countdownInterval);
//         if (spawnLoop) clearInterval(spawnLoop);
//         spawnLoop = null;
//         isGameActive = false;
    
//         const cars = document.querySelectorAll('#game-grid img');
//         cars.forEach(car => car.remove());
    
//         const gameplayScreen = document.getElementById('gameplay-screen');
//         const gameOverScreen = document.getElementById('gameover-screen');
//         gameplayScreen.classList.remove('active');
//         gameOverScreen.classList.add('active');
    
//         const message = score >= 17 ? 'You Win! Ninja Master!' : 'Game Over, man! You lose! Try Again!';
//         gameOverScreen.innerHTML = `<h2>${message}</h2><button id="play-again" class="buttons">Play Again!</button>`;
//         document.getElementById('play-again').addEventListener('click', restartGame);
//     }

//     // function triggerGameOver() {
//     //     clearInterval(countdownInterval);
//     //     if (spawnLoop) clearInterval(spawnLoop);
//     //     spawnLoop = null;
//     //     isGameActive = false;
    
//     //     const cars = document.querySelectorAll('#game-grid img');
//     //     cars.forEach(car => car.remove());
    
//     //     const gameplayScreen = document.getElementById('gameplay-screen');
//     //     const gameOverScreen = document.getElementById('gameover-screen');
//     //     gameplayScreen.classList.remove('active');
//     //     gameOverScreen.classList.add('active');
    
//     //     const message = score >= 17 ? 'You Win! Ninja Master!' : 'Game Over! Try Again!';
//     //     gameOverScreen.innerHTML = `<h2>${message}</h2><button id="play-again" class="buttons">Play Again!</button>`;
//     //     document.getElementById('play-again').addEventListener('click', restartGame);
//     // }
  
// //   function triggerGameOver() {
// //     clearInterval(countdownInterval);
// //     clearTimeout(gameTimer);
// //     clearInterval(spawnLoop); //stops spawning cars
// //   }


// function restartGame() {
//     startGame();
// }
// //   function restartGame() {
// //     score = 0;
// //     isGameActive = true;
// //     updateScore();
// //     if (spawnLoop) clearInterval(spawnLoop);
// //     spawnLoop = setInterval(spawnCar, 500);
// //     startGameTimer();
// // }

// //   function restartGame() {
// //     // Reset game state
// //     score = 0;
// //     // lives = 3; // Uncomment if you add lives functionality
// //     updateScore();
// //     // updateLives(); // Uncomment if you add lives functionality

// //     // Start spawning cars and timer
// //     spawnLoop = setInterval(spawnCar, 500); // Spawns every 0.5 seconds
// //     startGameTimer();
// // }

// //   function restartGame () {
// //     spawnLoop = setInterval(spawnCar, 500);
// //     startGameTimer();
// //   }

//   //The startCountdown function does not exist in my code yet...getting an error message.
// //I intended to use a countdown mechanism (for a "Ready... 3, 2, 1, Go!" sequence), 
// // but haven't had a chance to implement the function yet.
// // function restartGame() {
// //     // reset score, lives, etc.
// //     const startCountdown = 0;
// //     startCountdown(() => {
// //       spawnLoop = setInterval(spawnCar, 500);
// //       startGameTimer(); // this line starts the timer
// //     });
// //   }


// //   function restartGame() {
//     // Reset game state
// //     score = 0;
//     // lives = 3; // Uncomment if you add lives functionality later
// //     updateScore();
//     // updateLives(); // Uncomment if you add lives functionality later

//     // Start spawning cars and timer
// //     spawnLoop = setInterval(spawnCar, 1000);
// //     startGameTimer();
// // }


// //   startCountdown(() => {
// //     spawnLoop = setInterval(spawnCar, 1000);
// //     startGameTimer();  //this line starts the timer
// //   });


// // ------------------------------
// // ------------------------------

















// /*-------------------------------- Constants --------------------------------*/

// /*-------------------------------- Variables --------------------------------*/

// /*------------------------ Cached Element References ------------------------*/

// /*-------------------------------- Functions --------------------------------*/

// /*----------------------------- Event Listeners -----------------------------*/









// //Explanations of each of these sections below:

// /*------------------------ Cached Element References ------------------------*/
// //Things I want to select so I can do something with them.
// //e.g. const button = document.querySelector('button');
// //e.g. const title = document.querySelector ('h1');

// //button to start game
// //button to adjust game speed
// //button for fun facts --randomized
// //selecting points earned area (might not be a button but something else)
// //click on cars to create getting points (can you create a car as a button? Or an image?)
// /*adjust-game-speed
// pause-game
// leave-game
// play-again
// back-to-home-screen
// starter-screen
// instructions-screen
// gameplay-screen
// gameover-screen
// fun-facts
// get-your-car
// swords
// level-up
// */

// // const startGameButton = document.querySelector('#start-game');
// // const instructionsButton = document.querySelector('#instructions');
// // const gameGrid = document.querySelector('#game-grid');
// // const score = document.querySelector('#points-earned');
// // const lives = document.querySelector('#tries-left');

// // const screens = {
// //   start: document.querySelector('#start-screen'),
// //   instructions: document.querySelector('#instructions-screen'),
// //   gameplay: document.querySelector('#gameplay-screen'),
// //   gameover: document.querySelector('#gameover-screen')
// // };


// /*-------------------------------- Functions --------------------------------*/
// //What it should do... e.g. text in the title should update
// //e.g. function updateTitle(){
//         // title.textContent = "Updated"}; 

// //Create a function that connects to a different page to start the game
// //Create a function that randomizes fun facts
// //Create a function to add points earned
// //Create a function that gives you instructions when you click on the Basic Instructions button

// // USE THIS:
// // updateScore() and updateLives() functions


// /*----------------------------- Event Listeners -----------------------------*/
// //e.g. button.addEventListener('click', updateTitle); //when you click on the button, it will update the title

// //listen for clicks to create instructions
// //listen for clicks to start game //Do they all have to be separate event listeners?
// //listen for click to adjust game speed
// //The part showing starting and ending game
// //The part showing the "playing of the game/gameplay"
// //Make subfunction categories - like button functions/ ninja functions/ word bubble functions/ sound functions

























































































// // CODE GRAVEYARD/*-------------------------------------------------------------------------------------------------------------------*/
// //
// // 
// // 
// // 
// // Code Graveyard - MAY 12TH

// /*
// #gameover-screen {
//     text-align: center; /* Centers everything */
//     /* padding-top: 150px; /* Pushes everything down */
// /* }

// .game-message {
//     color: cornflowerblue;
//     font-size: 30px;
//     margin-bottom: 30px; /* Space between message and button */
// /* } */
// /* 
// #play-again {
//     font-size: 15px;
//     padding: 10px 20px;
// } */
 
// /* #gameover-screen {
//     text-align: center;
// } */
// // 
// // CODE MAY 11TH AND BEFORE:
// //  HTML CODE GRAVEYARD /*----------------------------- HTML Code Graveyard -----------------------------*/
// // HTML CODE GRAVEYARD /*----------------------------- HTML Code Graveyard -----------------------------*/
// // After I finish the game and gameover message shows up, the play again button and start button aren't working then. How do I get them to work?
// // The issue is that your event listeners aren't being properly reattached when the game over screen appears. Here's how to fix it:

// // Problem:
// // When you create new elements with innerHTML, any previous event listeners on those elements are lost. That's why your "Play Again" and "Start Game" buttons stop working after the first game.

// // Solution:
// // For the "Play Again" button:
// // Modify your triggerGameOver() function to properly reattach the event listener:



// /*
// CAR NINJA GAME JS

// console.log('JS LINKED AND WORKING');

// /*
// ✅ Create grid first in HTML CSS & JS - so have game's playing field needed for cars and potholes
// Set Up Variables and Displays for score/lives/displays: ✅ Set up score, ✅ lives, and displays to track and show the game’s state.

// ✅ Set up these variables already:
// let score, let lives, const gameGrid, const width, const height, const cellCount, const cells, const cell,
// const gameplayScreen, const startButton, let gameTimer, let timeLeft, let countdownInterval,
// const scoreDisplay, const countdownDisplay

// Code the Start Game Button Functionality
// Code the Score Functionality
// Code the Lives Functionality
// Code the Timer Functionality
// Code the Car Spawning Functionality
// Code the game Over-Functionality
// Code the pothole spawning functionality
// Code the win/loss conditions
// Code for 3 Round Functionality

// create click event where click on car and number generates for score
// create click event where click on a cell that doesn't have points, and number generates for score
// */

// /* ------ADDTL VARIABLES ADDED TO THE TOP THAT I WAS MISSING ----------*/
// // const livesDisplay = document.getElementById('tries-left');
// // const countdownDisplay = document.getElementById('countdown-timer');
// // const gameOverScreen = document.getElementById('gameover-screen');


// // /*-------- Temporary Code to Have For Gameplay Screen As Active Until I'm able to create code that moves from one screen to the next-----*/

// //CREATING GRID
// //CREATING gameplayScreen WITH gameGrid - finding and then making it active
// // const gameplayScreen = document.getElementById('gameplay-screen'); // Find gameplay screen
// // gameplayScreen.classList.add('active'); // Show gameplay screen - as active (as opposed to hidden)


// // Creating gameGrid
// // /* Using tools/example Tristan showed in class*/
// // const gameGrid = document.querySelector("#game-grid");//grabbing the grid in html
// // const width = 12; // columns - width usually refers to how many columns are in each row. 12 columns * 12 rows = 144 squares total
// // const height = 4; // rows
// // const cellCount = width * height; //12 * 4 = 48 --currently creating a game with 12 across and 4 high -- subject to change later
// // const cells = []; //creating an empty array that is meant to store each cell of the grid as I create them in a loop.
// // const cell = document.createElement("div"); //creating the cells
// // let score = 0; //creating score variable for tracking player's points
// // let lives = 3; // creating lives variable for tracking player's lives (3 total)
// // let car = document.createElement('img'); //defining car in global scope

// // function createGrid() {
// //         for (let i = 0; i < cellCount; i++) {
// //                 const cell = document.createElement("div");
// //                 cells.push(cell); // Store <div> elements, not numbers
// //                 gameGrid.appendChild(cell);
// //         }
// // }
// // createGrid();

// // // ------------------------------

// //CREATING START BUTTON FUNCTIONALITY
// // const startButton = document.getElementById("start-game");
// // startButton.addEventListener('click', startGame);

// // function startGame() {
//     //reset game state
// //     score = 0;
// //     lives = 3;
// //     updateScore();//Do I need to create an additional function for this?
// //     updateLives();//this isn't defined yet - //Do I need to create an additional function for this?
//     //start timer
// //     startGameTimer();
//     //start spawning cars
// //     spawnLoop = setInterval(spawnCar, 1000);//spawning cars every second
// // }

// // ------------------------------

// //PART OF CAR SPAWNING FUNCTIONALITY
// //CREATING ADDING AND REMOVING CYBERTRUCK
// // function addCyberTruck(cellNumber) {
// //     cells[cellNumber].classList.add("cybertruck");
// // }
// // addCybertruck(7);
// // ------

// // function removeCyberTruck() {
// //     cells[cybertruckPosition].classList.remove("cybertruck");
// // }

// // ------------------------------

// //CREATING SPAWN CAR SECTION
// // SPAWN CAR Section
// // spawnCar is showing up in between cells and not hitting cells - Need to figure out why not working
// // function spawnCar() { //Declaring a function called spawnCar that will run code to add a car image to the grid when called
// //     const randomCellPick = Math.floor(Math.random() * cells.length); //storing a random # to pick a grid cell
//     //Math.random()built in function generates decimal number and then it's multiplied by 48 //don't totally get it but it's working
// //     const cell = cells[randomCellPick];
// //     if (!cell.querySelector('img')) { // Check if cell is empty with no image so it can put an image in there
// //         const car = document.createElement('img'); //creates a new img html element
// //         car.src = '../images/cybertruck.jpg'; //setting image source
// //         car.alt = 'Cybertruck Car'; //setting alt text for accessibility and screen readers
// //         car.style.width = '100%'; //newly created car is styled with the width of 100% of the cell
// //         car.style.height = '100%'; //newly created car is styled with the height of 100% of the cell
// //         car.classList.add('car'); // Ensure CSS positioning
// //         cell.appendChild(car); //adds car as child of cell
// //         car.addEventListener('click', () => {
// //             score++;
// //             updateScore();
// //             car.remove(); //remove the car once it is clicked
// //         })
        
// //         setTimeout(()=>{
// //             car.remove();
// //         }, 3000); //removes car from grid after 3 seconds if not clicked
// //     }
// // }

// // setInterval(spawnCar, 1000); // Spawn car every 1 second//! Commented out setInterval so that it doesn't immediately spawn cars immediately before game starts
// //setInterval is a function that repeatedly calls a function at a set interval.


// // ------------------------------

// //ADDING CLICK-TO-SCORE FUNCTIONALITY
// // const scoreDisplay = document.getElementById("points-earned"); //selecting and creating a variable for the score display element

// // function updateScore() { //updates the score
// //     scoreDisplay.textContent = `Score: ${score}`;
// // }

// // ------------------------------
// // ------------------------------

// //ADDING COUNTDOWN TIMER FUNCTIONALITY, SO CODE DOESN'T GO ON INDEFINITELY
// //getting help from chatgpt, deepseek, and grok big time for this one

// // let gameTimer; // creating gameTimer for the 15-second timeout
// // let timeLeft = 15; //starting time for the 15-second timeout
// // let countdownInterval; //for live countdown display turning red in last 3 seconds

// // const startButton = document.getElementById('start-game');//already declared
// // startButton.addEventListener('click', restartGame);

// // function startGameTimer() {
// //     const countdownDisplay = document.getElementById('countdown-timer'); //selecting element
// //     timeLeft = 15; //setting game time to 15 seconds - resetting time
// //     countdownDisplay.textContent = `Time Left: ${timeLeft}`;
  
//     // Countdown that updates every second
// //     countdownInterval = setInterval(() => {
// //       timeLeft--;
// //       countdownDisplay.textContent = `Time Left: ${timeLeft}`;

// //       if(timeLeft <= 3) {
// //         countdownDisplay.classList.add("low-time");
// //       } else {
// //         countdownDisplay.classList.remove("low-time");
// //       }

// //       if (timeLeft <= 0) {
// //         clearInterval(countdownInterval);
// //       }
// //     }, 1000);
  
//     // After 15 seconds, end the game
// //     gameTimer = setTimeout(() => {
// //       triggerGameOver();
// //     }, 15000);
// //   }
  
// //   function triggerGameOver() {
// //     clearInterval(countdownInterval);
// //     clearTimeout(gameTimer);
// //     clearInterval(spawnLoop); //stops spawning cars
// //   }

// //   function restartGame () {
// //     spawnLoop = setInterval(spawnCar, 1000);
// //     startGameTimer();
// //   }


// //   function restartGame() {
//     // reset score, lives, etc.
// //     startCountdown(() => {
// //       spawnLoop = setInterval(spawnCar, 1000);
// //       startGameTimer(); // this line starts the timer
// //     });
// //   }

// //   startCountdown(() => {
// //     spawnLoop = setInterval(spawnCar, 1000);
// //     startGameTimer();  //this line starts the timer
// //   });

// // ------------------------------
// // ------------------------------


// // CODE GRAVEYARD/*-------------------------------------------------------------------------------------------------------------------*/
// // HTML CODE GRAVEYARD /*----------------------------- HTML Code Graveyard -----------------------------*/
// // HTML CODE GRAVEYARD /*----------------------------- HTML Code Graveyard -----------------------------*/
// /*

// TITLES FOR HTML COMMENTED OUT. I USED A LOT OF COMMENTS SO TRANSPLANTING THEM HERE IN CASE I WANT TO USE THEM AGAIN.
// <!-- Header holds the game's title / Wanted to use Semantic Elements in HTML for better visibility & SEO on search engines. -->
// <!-- Using Nav Bar for buttons at the top instead of div - better navigation for all & easier readbility for SEO/other coders-->
// <!-- MAIN GAME SCREENS - houses the game's 4 screens of the Starter Screen, the Instructions Screen, the Gameplay Screen, and the GameOver Screen -->
//  <!-- STARTER SCREEN -- chose to do section instead of div for each screen for better SEO & readibility -->
// <!-- INSTRUCTIONS SCREEN -->
// <!-- GAMEPLAY SCREEN -->
// <!-- SCORE DISPLAY - recommended to use span because inline and because it's dynamic text-->
// <!-- GAME-GRID -->
// <!-- GAMEOVER SCREEN... have Bill Paxton saying "Game Over Man! Game Over! Why don't we put her in charge?" -->
// <!-- FOOTER (perhaps only Visible on GAMEOVER SCREEN - where post-game actions live) -->

// -----------------------------------------

// IDEAS FOR "FUTURE PROOFING" MY CODE THAT I NEED TO FURTHER LOOK INTO SINCE IT WAS MENTIONED IN AI AS SUGGESTIONS:
// <!-- AI suggestion for me improving this code. Need to look into this:
// Image Optimization:
// Consider adding loading="lazy" to game images
// Add width and height attributes to maintain layout

// Future-Proofing:
// Add empty <div id="countdown"></div> for your "3-2-1" timer
// Consider adding data- attributes for game state (e.g., data-score="0")

// INFO ABOUT ADDING LAZY TO IMAGES FOR GAMING:
// What loading="lazy" Means for Images
// The loading="lazy" attribute is a performance optimization that tells the browser to delay loading an image until it's about to appear in the viewport (the visible part of the webpage). Here's why and how to use it in your game:
// Key Benefits for Your Game
// Faster Initial Load
// Images load only when needed (e.g., when the player reaches the gameplay screen).
// Reduces data usage and speeds up page startup.
// Better Performance
// Prevents loading all images (cars/potholes) upfront, which can slow down older devices.
// Smoother Experience
// Avoids stuttering when many images load simultaneously.-->

// -----------------------------------------

// CHANGING BUTTONS TO SCORE DISPLAY - FOR POINTS EARNED & TRIES LEFT
//         <button id="points-earned" class="buttons">Points Earned</button> <!-- This Points Earned Button might be taken away, and instead use a SCORE DISPLAY or SCORE COUNTER -->
//         <button id="tries-left" class="buttons">Tries Left Before Gameover</button><!-- This Tries Left Button might be taken away, and instead use a SCORE DISPLAY or SCORE COUNTER -->
//         <!--Grok ai told me about better practices to use <span>s(class="display")for score and live displays as they are not interactive.
//          <span id="points-earned" class="display">Score: 0</span>
//         <span id="tries-left" class="display">Lives: 3</span> -->

// When making a simple video game, using a score display (like text on the screen) instead of buttons is better because:
// Buttons are for player input – Buttons are meant to be clicked or pressed by the player (like "Start" or "Pause").
// Scores update automatically – The score changes quickly as the player earns points, so displaying it as text is cleaner and faster.
// Less confusing – A button implies you can interact with it, but the score is just information.

// -------------

//             <!-- SCORE DISPLAY - recommended to use span because inline and because it's dynamic text-->
//             <div class = "score-display"> <!-- Using class instead of id for reusability, in case create another screen with points earned. -->
//                 <span id="points-earned">Points Earned: 0</span>
//                 <!-- Could also change this to Score: 0 for better readability and simplicity-->
//                 <span id="tries-left">Tries Left: 3</span>
//                 <!-- Could also change this to Lives: 3 for better readability and simplicity -->
//                 CHANGING TO SCORE AND LIVES BECAUSE THESE ARE THE MOST COMMON TERMS IN GAMING

// --------------

//     <!-- MAIN GAME SCREENS - houses the game's 3 screens of the Starter Screen, the Instructions Screen, the Gameplay Screen, and the GameOver Screen -->
//     <!-- The good stuff is in main...woot woot -->

// -------------

// May use these tabs for addtl parts of the website if I have time in the future:
//     <section></section>
//     <aside></aside>

// -------------

// LEVEL UP - ADDING FAKE FUNNY ADS TO NINJA CHOP - CREATE THIS LATER IF HAVE TIME
// ADD THIS BACK FOR LEVEL UP! :)
//         <!-- <button id="ninja-ads" class="buttons">Ads?! Ninja Chop Them!</button> -->
//         <!-- create funny ads that pop up and then you ninja chop them randomly whether in the game or outside the game. -->

// ------------

// CHANGING THIS CODE TO AN ORDERED LIST
//         <!-- INSTRUCTIONS SCREEN -->
//         <section id="instructions-screen" class="screen">
//             <h2>Instructions</h2>
//             <p>1. Click cars to score points. Don't you wanna get slow drivers, bad drivers, and cybertrucks off the road?</p>
//             <p>2. Avoid potholes to keep lives. If you click on a pothole, you lose a life!</p>
//             <p>3. Score 10+ points in 30 seconds to win!</p>


//         ALSO TRIED THIS BUT IT LOOKED WEIRD... TRYING TO NAME AN OL DOESN'T SEEM TO WORK
//         <!-- INSTRUCTIONS SCREEN -->
//         <section id="instructions-screen" class="screen">
//             <h2>Instructions</h2>
//             <ol>Your challenge if you choose to accept it:
//                 <li>Click cars to score points. Don't you wanna get slow drivers, bad drivers, and cybertrucks off the road?</li>
//                 <li>Avoid potholes to keep lives. If you click on a pothole, you lose a life!</li>
//                 <li>Score 10+ points in 30 seconds to win!</li>
//             </ol>

// ---------------

// Also, just had an ai review my html on 5/8/25 and this is what they came up with:

// Your HTML code is well-structured and functional - you're absolutely ready to start working on CSS and JavaScript! Here's a quick review:
// ✅ What's Working Great:

// Perfect Document Structure
// Correct DOCTYPE, html with lang, head with metadata, and body
// Excellent semantic HTML (header, nav, main, footer, section)
// Game Architecture
// Clear screen separation (starter/instructions/gameplay/gameover)
// Properly organized score display and game grid
// Good button structure for controls
// Readiness for CSS/JS
// Logical ID/class naming (#points-earned, .score-display)
// External files properly linked (app.js, data.js, style.css)

// */





// // CSS CODE GRAVEYARD /*----------------------------- CSS Code Graveyard -----------------------------*/
// // CSS CODE GRAVEYARD /*----------------------------- CSS Code Graveyard -----------------------------*/

// /*

//  ORIGINALLY FOR HEADER H1 trying this - Wanted to create a glimmer effect but it didn't hold up to the following standards: 
//  Colors used on the site have appropriate contrast that meet the WCAG 2.0 level AA standard.
//     font-size: 2.5em; chose em so that this h1 could scale with responsive designs depending on if computer or phone
//     background: linear-gradient(to right, green, blue);
//     display: flex;
//     justify-content: center; 
//     display: inline-block; Gradient hugs text
//     padding: 0.2em 0.5em; Adds space around text

// ---------------------


// /*******************************
//   HIDING SCREENS -- original code, but changing it to .active to make screens more useable. Might go back to this.
// ********************************/
// // .screens {
// //         display: none;
// //     }
    
// //     #gameplay-screen {
// //         display: block;
// //     }


// // ---------------------


// /*****************************
//  GRID //trying to figure out how to do grid again... gah!
// *****************************/
// // #game-grid {
// //         display: grid;
// //     }

// /*****************************
//             GRID --first iteration of attemption grid with sizes
// *****************************/

// // #game-grid {/* targeting the full container/the outer wrapper holding all the grid squares */
// //     display: flex;
// //     flex-wrap: wrap;
// //     /* width: 600px;
// //     height: 600px; */
// //     width: 100%; /*how do I change it so that boxes stay the same size no matter screen width? Need to look up responsive design info*/


// // }

// // #game-grid div { /* targeting each individual box inside the grid */
// //     width: 8.33%; /* 100% ÷ 12 = 8.333...%, rounded */
// //     /* height: 8.33%; */
// //     height: 50px;  /* not sure why height in px works but height in % doesn't */
// //     border: 1px solid lightblue;
// // }

// // #game-grid div.cybertruck {
// //     background-image: url("../images/cybertruck.jpg");
// //     background-size: contain;
// //     background-repeat: no-repeat;
// // }

// // UPDATING GAME GRID AND GAME GRID DIV
// // /*****************************
// //             GRID 
// // *****************************/

// // #game-grid {/* targeting the full container/the outer wrapper holding all the grid squares */
// //     display: flex; /* to arrange cells in the grid*/
// //     flex-wrap: wrap; /* to arrange cells in the grid*/
// //     width: 600px; /*sets grid size - fixed width for 12 columns so grid has stability depending on screen size */
// //     margin: 0 auto; /* to center the grid on the page & fixes left alignment issue*/
// // }

// // #game-grid div { /* targeting each individual box inside the grid */
// //     width: 8.33%; /* 100% ÷ 12 = 8.333...%, rounded */
// //     /* height: 8.33%; */
// //     height: 50px;  /* not sure why height in px works but height in % doesn't */
// //     border: 1px solid lightblue;
// // }

// // #game-grid div.cybertruck {
// //     background-image: url("../images/cybertruck.jpg");
// //     background-size: contain;
// //     background-repeat: no-repeat;
// // }

// // ----
// // GAME GRID DIV CHANGED TO THIS:
// // #game-grid div { /* targeting each individual box inside the grid */
// //     width: calc(100% / 12); /* makes every cell exactly 50px wide (600 divided by 12) */
// //     height: 50px;  /* not sure why height in px works but height in % doesn't */
// //     border: 1px solid lightblue;
// // }
// // Why: The new width ensures 12 cells fit in one row without spilling over, fixing the vertical stacking. Your global box-sizing: border-box ensures borders don’t add extra width.

// //cybertruck image changed to fit width:
// // #game-grid div.cybertruck {
// //     background-image: url("../images/cybertruck.jpg");
// //     background-size: 100% 100%;
// //     /* background-size: contain; to fit the image in the cell */ This part was deleted from css
// //     background-repeat: no-repeat; /*to show one image*/
// //     background-position: center; /*to center the in the cell*/
// // }

// //______________________________


// //  FOR SCORE WHEN WITHIN GAME GRID... BUT THIS ONE MAKES ACCESSIBILITY HARD CAUSE OVERLAY:
// //  .score-display {
// //     position: absolute; Overlay on top of the game 
// //     top: 10px;
// //     left: 10px;
// //     color: white;
// //     font-size: 24px;
// //     font-family: Arial, sans-serif;
// //     background: rgba(0, 0, 0, 0.5); /* Semi-transparent background 
// //     padding: 10px;
// //     border-radius: 5px;
// // }

// // #points-earned, #tries-left {
// //     margin-right: 20px; Space between score and lives
// // }

// // ------------------------------


// /* ADDTL STUFF TRIED BUT DIDN'T WORK FOR WHAT I WAS TRYING TO CREATE
// Remove default margins/padding */
// // #instructions-screen p,
// // #instructions-screen ol {
// //   margin: 0;          /* Resets top/bottom margins */
// //   padding: 0;         /* Resets left/right padding */
// // }

// /* Add custom spacing ONLY where needed */
// // #instructions-screen p {
// //   margin-bottom: 8px; /* Tight gap after the phrase */
// // }

// // #instructions-screen ol {
// //   margin-top: 4px;    /* Small gap before the list */
// //   padding-left: 20px; /* Adjust indentation */
// // }

// // -------------------------------




// // JS CODE GRAVEYARD /*----------------------------- JS Code Graveyard ---------------------------------------------------------*/
// // JS CODE GRAVEYARD /*----------------------------- JS Code Graveyard ---------------------------------------------------------*/

// /*
// GRID INFO
// 12 across × 4 down (48 cells) layout works great for certain types of games, especially:
// ✅ It’s Good For:
// Click-to-score games like your car game (think of it like a 4-lane highway across 12 positions)
// Fast reaction/timing games where cars “appear” in lanes to be clicked
// Visually clear layouts without overwhelming the player

// 🧠 Why It Works:
// 12 columns gives you plenty of left-to-right space (like road lanes).
// 4 rows gives enough room to visually show different car positions.
// Keeps it simple and focused — you’re not overwhelmed by too many squares.

// 🚧 When It Might Be Too Small:
// If you later add movement/animation and want cars to visibly “travel” down a long path
// If you want more complex mechanics like obstacles or combo scoring
// ✅ But for your current goal (clicking cars on screen), 12 × 4 is a solid choice.

// ---------------------------

// /*------------------------- Temporary Code to Have Gameplay Screen As Active Until I'm able to create code that moves from one screen to the next-------------------*/
// //THIS WAS TAKEN FROM TOP OF JS CODE - FIRST JS WORKING ON FOR THE GAME - USING THIS AS BASIC MVP FOR NOW, BUT WILL BUILD OUT ADDTL FUNCTIONS/CODE LATER

// // Find gameplay screen
// // const gameplayScreen = document.getElementById('gameplay-screen');

// // Show gameplay screen - as active (as opposed to hidden)
// // gameplayScreen.classList.add('active');

// // Creating gameGrid
// /* Using tools/example Tristan showed in class and this is the html I created for this previously <div id="game-grid"></div> */
// // const gameGrid = document.querySelector("#game-grid");//grabbing the grid in html
// // const width = 12; // columns - width usually refers to how many columns are in each row. 12 columns * 12 rows = 144 squares total
// // const height = 4; // rows
// // const cellCount = width * height; //12 * 4 = 48
// // const cells = [];

// // function createGrid() {
// //         for (let i = 0; i < cellCount; i++) {
// //                 const cell = document.createElement("div");
// //                 cell.textContent = i;
// //                 cells.push(i);
// //                 gameGrid.appendChild(cell);//append it to the DOM
// //         }
// // }
// // createGrid();

// // NOT WORKING cells.push(cell); //for if I want to store the divs (more useful for later interaction). //NOT WORKING
// // cells.push(cell); //for if I want to store the divs (more useful for later interaction).//change out cells.push(i);
// // Reason 💡 Why:
// // You're creating <div> elements that represent the squares of your game grid.
// // By pushing cell (the actual DOM element) into the cells array, you can later:
// // Change their styles (e.g. color, background)
// // Add event listeners to individual cells (e.g. click)
// // Identify specific positions in the grid using their index
// // If you just store the numbers i, you can't interact with the actual grid elements later.

// /*------------------------- Temporary Code to Have Gameplay Screen As Active Until I'm able to create code that moves from one screen to the next-------------------*/

// //Second Version of Temporary Code
// // Find gameplay screen
// // const gameplayScreen = document.getElementById('gameplay-screen');

// // // Show gameplay screen - as active (as opposed to hidden)
// // gameplayScreen.classList.add('active');

// // // Creating gameGrid
// // /* Using tools/example Tristan showed in class and this is the html I created for this previously <div id="game-grid"></div> */
// // const gameGrid = document.querySelector("#game-grid");//grabbing the grid in html
// // const width = 12; // columns - width usually refers to how many columns are in each row. 12 columns * 12 rows = 144 squares total
// // const height = 4; // rows
// // const cellCount = width * height; //12 * 4 = 48 --currently creating a game with 12 across and 4 high -- subject to change later
// // const cells = []; //creating an empty array that is meant to store each cell of the grid as I create them in a loop.

// // function createGrid() {
// //         for (let i = 0; i < cellCount; i++) {
// //                 const cell = document.createElement("div");
// //                 cell.classList.add("cybertruck");
// //                 cell.textContent = i;
// //                 cells.push(cell); // Store <div> elements, not numbers
// //                 gameGrid.appendChild(cell);
// //                 // cells.push(i); //pushing number i(0,1,2..) into the array - not the actual <div> elements.
// //                 // gameGrid.appendChild(cell);//append it to the DOM
// //         }
// // }
// // createGrid();

// /*------------------------- Temporary Code to Have Gameplay Screen As Active Until I'm able to create code that moves from one screen to the next-------------------*/

// //Third Version
// // const gameplayScreen = document.getElementById('gameplay-screen'); // Find gameplay screen

// // gameplayScreen.classList.add('active'); // Show gameplay screen - as active (as opposed to hidden)

// // // Creating gameGrid
// // /* Using tools/example Tristan showed in class*/
// // const gameGrid = document.querySelector("#game-grid");//grabbing the grid in html
// // const width = 12; // columns - width usually refers to how many columns are in each row. 12 columns * 12 rows = 144 squares total
// // const height = 4; // rows
// // const cellCount = width * height; //12 * 4 = 48 --currently creating a game with 12 across and 4 high -- subject to change later
// // const cells = []; //creating an empty array that is meant to store each cell of the grid as I create them in a loop.

// // function createGrid() {
// //         for (let i = 0; i < cellCount; i++) {
// //                 const cell = document.createElement("div");
// //                 // cell.classList.add("cybertruck");
// //                 cell.textContent = i;
// //                 cells.push(cell); // Store <div> elements, not numbers
// //                 gameGrid.appendChild(cell);
// //                 // cells.push(i); //pushing number i(0,1,2..) into the array - not the actual <div> elements.
// //                 // gameGrid.appendChild(cell);//append it to the DOM
// //         }
// // }
// // createGrid();

// // ----
// /*------------------------- Temporary Code to Have Gameplay Screen As Active Until I'm able to create code that moves from one screen to the next-------------------*/

// // Fourth Version - also figured out: "fixed the spawned car showing up below the cell by commenting out cell.textContent = i; because it adds a number text node
// // //  inside the cell and then the image stacks vertically under that"
// // const gameplayScreen = document.getElementById('gameplay-screen'); // Find gameplay screen

// // gameplayScreen.classList.add('active'); // Show gameplay screen - as active (as opposed to hidden)

// // // Creating gameGrid
// // /* Using tools/example Tristan showed in class*/
// // const gameGrid = document.querySelector("#game-grid");//grabbing the grid in html
// // const width = 12; // columns - width usually refers to how many columns are in each row. 12 columns * 12 rows = 144 squares total
// // const height = 4; // rows
// // const cellCount = width * height; //12 * 4 = 48 --currently creating a game with 12 across and 4 high -- subject to change later
// // const cells = []; //creating an empty array that is meant to store each cell of the grid as I create them in a loop.

// // function createGrid() {
// //         for (let i = 0; i < cellCount; i++) {
// //                 const cell = document.createElement("div");
// //                 // cell.classList.add("cybertruck");
// //                 // cell.textContent = i;//this line adds a text node inside the cell. When you later append an image, the image goes after the number
// //                 //resulting in a layout where the image stacks vertically. So it looks like the image below the cell.
// // //                 "fixed the spawned car showing up below the cell by commenting out cell.textContent = i; because it adds a number text node
// // //  inside the cell and then the image stacks vertically under that"
// //                 cells.push(cell); // Store <div> elements, not numbers
// //                 gameGrid.appendChild(cell);
// //         }
// // }
// // createGrid();

// // // ------------------------------

// // function addCyberTruck(cellNumber) {
// //     cells[cellNumber].classList.add("cybertruck");
// // }
// // // addCybertruck(7);
// // // -------------------------------

// // function removeCyberTruck() {
// //     cells[cybertruckPosition].classList.remove("cybertruck");
// // }


// // // SPAWN CAR Section
// // // spawnCar is showing up in between cells and not hitting cells - Need to figure out why not working
// // function spawnCar() { //Declaring a function called spawnCar that will run code to add a car image to the grid when called
// //     const randomCellPick = Math.floor(Math.random() * cells.length); //storing a random # to pick a grid cell
// //     //Math.random()built in function generates decimal number and then it's multiplied by 48 //don't totally get it but it's working
// //     const cell = cells[randomCellPick];
// //     if (!cell.querySelector('img')) { // Check if cell is empty with no image so it can put an image in there
// //         const car = document.createElement('img'); //creates a new img html element
// //         car.src = '../images/cybertruck.jpg'; //setting image source
// //         car.alt = 'Cybertruck Car'; //setting alt text for accessibility and screen readers
// //         car.style.width = '100%'; //newly created car is styled with the width of 100% of the cell
// //         car.style.height = '100%'; //newly created car is styled with the height of 100% of the cell
// //         cell.appendChild(car); //adds car as child of cell
// //         // removeCyberTruck();
    
// //         // if 
// //     }
// // }
// // setInterval(spawnCar, 1000); // Spawn car every 1 second
// // //setInterval is a function that repeatedly calls a function at a set interval.

// // //create click event where click on car and in any cell and number generates for score


// // ---------------------------------------

// //ADDTL INFORMATION BELOW ABOUT EACH SECTION AND EXAMPLES OF SAMPLE CODE TO REFERENCE IN CASE I NEED TO REMEMBER SYNTAX FOR JS

// /*-------------------------------- Constants --------------------------------*/
// //for creating a new element and saving it in memory
// //e.g. const clickToAddParagraphButton = document.createElement('button')


// /*-------------------------------- Variables --------------------------------*/

// // let pointsEarned = '';

// // Store score/lives in variables (score, lives).


// /*------------------------ Cached Element References ------------------------*/
// //Things I want to select so I can do something with them.
// //e.g. const button = document.querySelector('button');
// //e.g. const title = document.querySelector ('h1');

// //button to start game
// //button to adjust game speed
// //button for fun facts --randomized
// //selecting points earned area (might not be a button but something else)
// //click on cars to create getting points (can you create a car as a button? Or an image?)


// /*-------------------------------- Functions --------------------------------*/
// //What it should do... e.g. text in the title should update
// //e.g. function updateTitle(){
//         // title.textContent = "Updated"}; 

// //Create a function that connects to a different page to start the game
// //Create a function that randomizes fun facts
// //Create a function to add points earned
// //Create a function that gives you instructions when you click on the Basic Instructions button

// // USE THIS:
// // updateScore() and updateLives() functions


// /*----------------------------- Event Listeners -----------------------------*/
// //e.g. button.addEventListener('click', updateTitle); //when you click on the button, it will update the title

// //listen for clicks to create instructions
// //listen for clicks to start game //Do they all have to be separate event listeners?
// //listen for click to adjust game speed

// //The part showing starting and ending game
// //The part showing the "playing of the game/gameplay"
// //Make subfunction categories - like button functions/ ninja functions/ word bubble functions/ sound functions





// // DATA.JS CODE GRAVEYARD / // JS CODE GRAVEYARD /*----------------------------- DATA.JS CODE GRAVEYARD  -----------------------------*/
// // DATA.JS CODE GRAVEYARD / // JS CODE GRAVEYARD /*----------------------------- DATA.JS CODE GRAVEYARD  -----------------------------*/
// /*





// */

// // README CODE GRAVEYARD / //  /*----------------------------- README CODE GRAVEYARD  -----------------------------*/
// // README CODE GRAVEYARD / //  /*----------------------------- README CODE GRAVEYARD  -----------------------------*/
// /*





// */

// // LICENSE CODE GRAVEYARD / //  /*----------------------------- LICENSE CODE GRAVEYARD-----------------------------*/
// // LICENSE CODE GRAVEYARD / //  /*----------------------------- LICENSE CODE GRAVEYARD-----------------------------*/


// // CODE GRAVEYARD/*-------------------------------------------------------------------------------------------------------------------*/
// // HTML CODE GRAVEYARD /*----------------------------- MY ENTIRE GAME WITH HTML, CSS, JS BEFORE DELETING COMMENTS -----------------------------*/
// // HTML CODE GRAVEYARD /*----------------------------- MY ENTIRE GAME WITH HTML, CSS, JS BEFORE DELETING COMMENTS -----------------------------*/

// //REDOING ORDER OF THINGS FOR BETTER FUNCTIONALITY
// /*
// Create grid first in HTML CSS & JS - so have game's playing field needed for cars and potholes
// Set Up Variables and Displays: Set up score, lives, and displays to track and show the game’s state.
// SET UP VARIABLES FOR SCORE, LIVES, AND DISPLAYS
// Code the Start Game Button Functionality - 
// Code the Score Functionality
// Code the Lives Functionality
// Code the Timer Functionality
// Code the Car Spawning Functionality
// Code the game Over-Functionality
// Code the pothole spawning functionality
// Code the win/loss conditions
// Code for 3 Round Functionality
// */

// //CURRENT CODE AS OF MAY 10TH, 2025 327PM --BEFORE REDOING THE ORDER OF THINGS FOR FUNCTIONALITY

// // HTML
// // <!-- CAR NINJA GAME HTML -->

// // <!-- Instructions about how to play the game are included in your app. -->
// // <!-- Include win/loss logic and render win/loss messages in HTML. The game you chose must have a win/lose condition. -->
// // <!-- All images on the site have alt text. -->
// // <!-- No text is placed on top of an image in a way that makes the text inaccessible. -->
// // <!-- The game is coded using proper indentation. -->

// // <!-- First create the screen/grid where cars move and have start button there.
// // Then if have time create the other screens.
// // Create the grid.
// // Then create a start game button, an instructions button, a pause button, 
// // an end game button, and also a place where points can be earned

// // Also, created a data area where I can put car comments 
// // and also audio sounds and funny comments. -->

 
// // <!DOCTYPE html>
// // <html lang="en"><!-- Defines the webpage in the english language. -->


// // <head>
// //     <meta charset="UTF-8">
// //     <meta name="viewport" content="width=device-width, initial-scale=1.0">
// //     <title>Car Ninja</title> <!-- Title of game to be displayed in browser tab -->
// //     <meta property="og:title" content="Car Ninja"><!-- Added this line so that Car Ninja title shows up in the browser tab / It wasn't showing up prior to this.-->
// //     <script defer src="./js/app.js"></script> <!-- Link to my JS file -->
// //     <script defer src="./js/data.js"></script> <!-- Link to my data.js file -->
// //     <!-- <link rel="stylesheet" href="./css/reset.css">  --> <!-- Link to Meyers CSS reset - will implement this as soon as I have more time to do styles-->
// //     <link rel="stylesheet" href="./css/style.css"> <!-- Link to my CSS file -->
// // </head>


// // <body>

// //     <!-- HEADER holds the game's title / Wanted to use Semantic Elements in HTML for better visibility & SEO on search engines. -->
// //     <header class="header">
// //         <h1>Car Ninja Game!</h1>
// //     </header>


// //     <h2 id ="gameplay-screen-title" class="screen-title">Time to Ninja Chop - Gameplay Screen</h2>

     
// //     <!-- Using Nav Bar for buttons at the top instead of div - better navigation for all & easier readbility for SEO/other coders-->
// //     <nav>
// //         <button id="start-game" class="buttons">Start Game</button>
// //         <button id="instructions" class="buttons">Instructions</button>
// //         <button id="adjust-game-speed" class="buttons">Adjust Game Speed</button><!-- the ability to choose a different game speed each time-->
// //         <button id="pause-game" class="buttons">Pause Game</button><!-- Also have a button to click on if you want to pause game or leave/start over -->
// //         <button id="leave-game" class="buttons">Leave Game</button>
// //     </nav>



// //     <!-- MAIN GAME SCREENS - houses the game's 4 screens of the Starter Screen, the Instructions Screen, the Gameplay Screen, and the GameOver Screen -->
// //     <main>

// //         <!-- STARTER SCREEN -- chose to do section instead of div for each screen for better SEO & readibility -->
// //         <section id="starter-screen" class="screens">
// //             <button id="get-your-car" class="buttons">Get Your Car</button><!-- the ability to choose different cars each time play -->
// //             <button id="swords" class="buttons">Sword, Stars, or Nunchucks</button><!-- the ability to choose different weapons each time play -->
// //             <button id="level-up" class="buttons">Level Up!</button><!-- the ability to level up with different missions after a certain amount of points -->
// //             <h2>Welcome to Car Ninja</h2>
// //             <h3>Ready to Ninja Chop Some Cars?!!!</h3>
// //             <p>Click "Start Game" to begin or read more about the game by clicking "Instructions" to learn how to
// //                 play!</p>
// //         </section>


// //         <!-- INSTRUCTIONS SCREEN -->
// //         <section id="instructions-screen" class="screens">
// //             <h2>Instructions</h2>
// //             <p><strong>Your challenge if you choose to accept it...</strong></p>
// //             <ol>
// //                 <li>Click cars to score points. Don't you wanna get slow drivers, bad drivers, and cybertrucks off the road?</li>
// //                 <li>Avoid potholes to keep lives. If you click on a pothole, you lose a life!</li>
// //                 <li>Score 10+ points in 30 seconds to win!</li>
// //             </ol>
// //         </section>


// //         <!-- GAMEPLAY SCREEN -->
// //         <section id="gameplay-screen" class="screens">

// //             <!-- SCORE DISPLAY - recommended to use span because inline and because it's dynamic text-->
// //             <div class="score-display"><!-- Using class instead of id for reusability, in case create another screen with points earned. -->
// //                 <span id="points-earned">Score: 0</span><!-- Using an id name that makes sense to me for easier referencing -->
// //                 <span id="tries-left">Lives: 3</span><!-- Using an id name that makes sense to me for easier referencing -->
// //                 <span id="countdown-timer">Time Left: 15</span>
// //             </div>

// //             <!-- GAME-GRID -->
// //             <div id="game-grid">
// //                 <!-- <img src="https://images.autotrader.com/scaler/408/306/hn/c/03775bd69037404893e710eea5872111.jpg"
// //                     width="100" height="100" alt="Car Name Of Image Here">
// //                 <img src="https://media.istockphoto.com/id/174662203/photo/pot-hole.jpg?s=612x612&w=0&k=20&c=HhFYQD5qAJItGzYWJJQ72nxBR8iidL7Np2g82dfvnoM="
// //                     width="100" height="100" alt="Pothole Image Here"> -->
// //             </div>
// //             <!-- Create more car image/images -->
// //             <!-- Create potholes/bombs you shouldn't click -->
// //             <!-- have a 'ready...3 2 1... go'section -->
// //         </section>


// //         <!-- GAMEOVER SCREEN... have Bill Paxton saying "Game Over Man! Game Over! Why don't we put her in charge?" -->
// //         <section id="gameover-screen" class="screens">
// //             <button id="fun-facts" class="buttons">Fun Facts</button>
// //         </section>

// //     </main>

    

// //     <!-- FOOTER  -->
// //     <footer>
// //         <button id="play-again" class="buttons">Play Again!</button>
// //         <button id="back-to-home-screen" class="buttons">Back To Home Screen</button>
// //         <!-- <button id="ninja-ads" class="buttons">Ads?! Ninja Chop Them!</button> -->
// //         <!-- create funny ads that pop up and then you ninja chop them randomly whether in the game or outside the game. -->
// //     </footer>

// // </body>

// // </html>

// //----------------------------

// // CSS
// // /* CAR NINJA GAME CSS */

// // /* CSS Flexbox and/or Grid is used for page layout design. */

// // /* Colors used on the site have appropriate contrast that meet the 
// // WCAG 2.0 level AA standard. */

// // /* The game is coded using proper indentation. */

// // /*ADDTL INFO FOR HIDING ELEMENTS - TO BE DELETED BEFORE SUBMISSION

// // What Does display: none Mean?

// // Definition: display: none in CSS hides an element completely from the page, removing it from the 
// // layout as if it doesn’t exist. It’s not visible, and it takes up no space (unlike visibility: hidden, 
// // which hides but keeps space).

// // Use in Your Game: You’d use display: none to hide screens (e.g., <div id="gameplay-screen">) or content 
// // (e.g., instructions) initially, then use JavaScript to set display: block to show them when needed 
// // (e.g., when clicking “Play Game” or “Instructions”, user stories #1–2).

// // Example Context: Apply display: none to <div id="gameplay-screen"> in CSS so it’s hidden until the game starts,
// //  controlled by JavaScript. */


// // /*******************************
// //   RESETS & GLOBAL STYLES IN BODY
// // ********************************/
// // * {
// //     box-sizing: border-box;
// // }

// // body {
// //     background-color: lightgrey;
// // }



// // /*****************************
// //   HEADER STYLES
// // *****************************/
// // header h1 { /* chose header h1 to differentiate between other headers on other screens */
// //     color: cornflowerblue;/* originally using this color and might come back to color: rgb(39, 39, 231); */
// //     -webkit-text-stroke: 1px black; /* Black outline around letters */
// //     text-align: center;
// //     margin-bottom: 5px;
// // }

// // h2 {
// //     margin-top: 0; 
// //     /* removes all space above */
// //     margin-bottom: .8px;
// //     color: cornflowerblue;
// //     -webkit-text-stroke: 1px black;
// //     text-align: center;
// //     margin-bottom: 11px;
// // }



// // /*****************************
// //  NAVIGATION BAR STYLES
// // *****************************/
// // nav {
// //     display: flex;
// //     justify-content: space-evenly;
// // }



// // /*****************************
// //   BUTTON STYLES
// // *****************************/

// // /* ALL BUTTONS */
// // .buttons {
// //     /* dark blue with light blue border */
// //     background-color: cornflowerblue;
// // }

// // /* START GAME BUTTON & INSTRUCTIONS BUTTONS */
// // #start-game, #instructions {
// //     background-color: yellow;
// // }

// // /* BACK TO HOME SCREEN BUTTON */
// // #play-again, #back-to-home-screen {
// //     background-color: yellow;
// // }



// // /*******************************
// //   HIDING SCREENS
// // ********************************/
// // .screens {
// //     display: none;
// // }

// // .active { 
// //     /* Any element with class="active" will be visible on the screen. And the class="active" is done in JS */
// //     display: block;
// // }



// // /*****************************
// //   SCREEN-SPECIFIC STYLES
// // *****************************/

// // /* Styling Of Different Screens below */
// // #starter-screen h2, #instructions-screen h2 {
// //     color: cornflowerblue;/* originally using this color and might come back to color: rgb(39, 39, 231); */
// //     -webkit-text-stroke: 1px black; /* Black outline around letters */
// //     text-align: left;
// // }

// // /* #gameplay-screen-title {} */


// // /* DOUBLE CHECK THIS STYLING BELOW WITH RESETING MARGIN AND MAKE SURE IT'S CORRECT */
// // #instructions-screen p,
// // #instructions-screen ol {
// // margin: 0;/* Resets top/bottom margins */
// //  }


// // #instructions-screen p {
// //     font-size: 12px;
// //     margin-top: 0;
// //     color: black;
// // }

// // #instructions-screen

// // ol {
// //     font-size: 12px;
// //     font-weight: semi-bold;
// // }

// // /* Trying to add thin black border around images... and not currently working*/
// // #game-grid img {
// //     border: 5px black;
// // }



// // /*****************************
// //   SCORE & LIVES STYLES
// // *****************************/

// // .score-display {
// //     color: white;
// //     font-size: 24px;
// //     font-family: Arial, sans-serif;
// //     background: rgba(0, 0, 0, 0.5);
// //     padding: 10px;
// //     border-radius: 5px;
// //     margin-top: 10px;
// //     margin-bottom: 20px; /* Space between score and game grid */
// //     text-align: center; /* Optional: Center the text */
// // }

// // #points-earned, #tries-left {
// //     margin-right: 20px;
// // }



// // /*****************************
// //             GRID 
// // *****************************/

// // #game-grid {/* targeting the full container/the outer wrapper holding all the grid squares */
// //     display: flex; /* to arrange cells in the grid*/
// //     flex-wrap: wrap; /* to arrange cells in the grid*/
// //     width: 600px; /*sets grid size - fixed width for 12 columns so grid has stability depending on screen size */
// //     margin: 0 auto; /* to center the grid on the page & fixes left alignment issue*/

// // }

// // #game-grid div { /* targeting each individual box inside the grid */
// //     width: calc(100% / 12); /* makes every cell exactly 50px wide (600 divided by 12) */
// //     height: 50px;  /* keeps height 50px for 4 rows - not sure why height in px works but height in % doesn't */
// //     border: 1px solid lightblue; /* for cell outlines */
// // }

// // #game-grid div.cybertruck {
// //     background-image: url("../images/cybertruck.jpg");
// //     background-size: 100% 100%; /* stretch to fill cell - I'm ok if image is distorted - wanted it to be on purpose so car looks more cartoony */
// //     /* Can use background-size: cover too to fill without the distortion */
// //     background-repeat: no-repeat; /*to show one image*/
// //     background-position: center; /*to center the in the cell*/
// // }



// // /*****************************
// //  FOOTER STYLES
// // *****************************/
// // footer {
// //     display: flex;
// //     justify-content: right;
// //     gap: 15px;
// //     /* margin-top: 12px; */
// // }

// // #play-again, #back-to-home-screen {
// //     margin-top: 12px;
// // }

// // // --------------------------------------------------

// // JS
// // CAR NINJA GAME JS

// // The code in the app adheres to coding conventions covered in lessons, 
// // like using plural names for arrays.

// // Render the game in the browser using the DOM manipulation techniques 
// // demonstrated in lecture.

// // The game is coded using proper indentation.

// // !! MAIN FOCUS IS ON MVP AND GETTING GAMEPLAY SCREEN TO WORK

// // console.log('JS LINKED AND WORKING');

// // /*------------------------- Temporary Code to Have Gameplay Screen As Active Until I'm able to create code that moves from one screen to the next-------------------*/

// // //CREATING GAMEPLAY SCREEN WITH GRID
// // const gameplayScreen = document.getElementById('gameplay-screen'); // Find gameplay screen

// // gameplayScreen.classList.add('active'); // Show gameplay screen - as active (as opposed to hidden)

// // // Creating gameGrid
// // /* Using tools/example Tristan showed in class*/
// // const gameGrid = document.querySelector("#game-grid");//grabbing the grid in html
// // const width = 12; // columns - width usually refers to how many columns are in each row. 12 columns * 12 rows = 144 squares total
// // const height = 4; // rows
// // const cellCount = width * height; //12 * 4 = 48 --currently creating a game with 12 across and 4 high -- subject to change later
// // const cells = []; //creating an empty array that is meant to store each cell of the grid as I create them in a loop.
// // const cell = document.createElement("div");
// // let score = 0; //creating score variable
// // let car = document.createElement('img'); //defining car in global scope

// // function createGrid() {
// //         for (let i = 0; i < cellCount; i++) {
// //                 const cell = document.createElement("div");
// //                 cells.push(cell); // Store <div> elements, not numbers
// //                 gameGrid.appendChild(cell);
// //         }
// // }
// // createGrid();

// // // ------------------------------

// // //CREATING ADDING AND REMOVING CYBERTRUCK
// // function addCyberTruck(cellNumber) {
// //     cells[cellNumber].classList.add("cybertruck");
// // }
// // // addCybertruck(7);
// // // ------

// // function removeCyberTruck() {
// //     cells[cybertruckPosition].classList.remove("cybertruck");
// // }

// // // ------------------------------

// // //CREATING SPAWN CAR SECTION
// // // SPAWN CAR Section
// // // spawnCar is showing up in between cells and not hitting cells - Need to figure out why not working
// // function spawnCar() { //Declaring a function called spawnCar that will run code to add a car image to the grid when called
// //     const randomCellPick = Math.floor(Math.random() * cells.length); //storing a random # to pick a grid cell
// //     //Math.random()built in function generates decimal number and then it's multiplied by 48 //don't totally get it but it's working
// //     const cell = cells[randomCellPick];
// //     if (!cell.querySelector('img')) { // Check if cell is empty with no image so it can put an image in there
// //         const car = document.createElement('img'); //creates a new img html element
// //         car.src = '../images/cybertruck.jpg'; //setting image source
// //         car.alt = 'Cybertruck Car'; //setting alt text for accessibility and screen readers
// //         car.style.width = '100%'; //newly created car is styled with the width of 100% of the cell
// //         car.style.height = '100%'; //newly created car is styled with the height of 100% of the cell
// //         car.classList.add('car'); // Ensure CSS positioning
// //         cell.appendChild(car); //adds car as child of cell
// //         car.addEventListener('click', () => {
// //             score++;
// //             updateScore();
// //             car.remove(); //remove the car once it is clicked
// //         })
        
// //         setTimeout(()=>{
// //             car.remove();
// //         }, 3000); //removes car from grid after 3 seconds if not clicked
// //     }
// // }
// // setInterval(spawnCar, 1000); // Spawn car every 1 second
// // //setInterval is a function that repeatedly calls a function at a set interval.

// // //create click event where click on car and number generates for score
// // //create click event where click on a cell that doesn't have points, and number generates for score

// // // ------------------------------

// // //ADDING CLICK-TO-SCORE FUNCTIONALITY
// // const scoreDisplay = document.getElementById("points-earned"); //selecting and creating a variable for the score display element

// // function updateScore() { //updates the score
// //     scoreDisplay.textContent = `Score: ${score}`;
// // }

// // ------------------------------
// // ------------------------------

// // ADDING COUNTDOWN TIMER FUNCTIONALITY, SO CODE DOESN'T GO ON INDEFINITELY
// // getting help from chatgpt, deepseek, and grok big time for this one

// // let gameTimer; // creating gameTimer for the 15-second timeout
// // let timeLeft = 15; //starting time for the 15-second timeout
// // let countdownInterval; //for live countdown display turning red in last 3 seconds

// // const startButton = document.getElementById('start-game');
// // startButton.addEventListener('click', restartGame);

// // function startGameTimer() {
// //     const countdownDisplay = document.getElementById('countdown-timer'); //selecting element
// //     timeLeft = 15; //setting game time to 15 seconds - resetting time
// //     countdownDisplay.textContent = `Time Left: ${timeLeft}`;
  
// //     // Countdown that updates every second
// //     countdownInterval = setInterval(() => {
// //       timeLeft--;
// //       countdownDisplay.textContent = `Time Left: ${timeLeft}`;

// //       if(timeLeft <= 3) {
// //         countdownDisplay.classList.add("low-time");
// //       } else {
// //         countdownDisplay.classList.remove("low-time");
// //       }

// //       if (timeLeft <= 0) {
// //         clearInterval(countdownInterval);
// //       }
// //     }, 1000);
  
// //     // After 15 seconds, end the game
// //     gameTimer = setTimeout(() => {
// //       triggerGameOver();
// //     }, 15000);
// //   }
  
// //   function triggerGameOver() {
// //     clearInterval(countdownInterval);
// //     clearTimeout(gameTimer);
// //   }

// //   function restartGame () {
// //     spawnLoop = setInterval(spawnCar, 1000);
// //     startGameTimer();
// //   }


// //   function restartGame() {
// //     // reset score, lives, etc.
// //     startCountdown(() => {
// //       spawnLoop = setInterval(spawnCar, 1000);
// //       startGameTimer(); // this line starts the timer
// //     });
// //   }

// //   startCountdown(() => {
// //     spawnLoop = setInterval(spawnCar, 1000);
// //     startGameTimer();  //this line starts the timer
// //   });

// // // ------------------------------
// // // ------------------------------

// //THE DIFFERENT SECTIONED OFF SECTIONS


// /*-------------------------------- Constants --------------------------------*/
// //for creating a new element and saving it in memory
// //e.g. const clickToAddParagraphButton = document.createElement('button')





// /*-------------------------------- Variables --------------------------------*/

// // let pointsEarned = '';

// // Store score/lives in variables (score, lives).






// /*------------------------ Cached Element References ------------------------*/
// //Things I want to select so I can do something with them.
// //e.g. const button = document.querySelector('button');
// //e.g. const title = document.querySelector ('h1');

// //button to start game
// //button to adjust game speed
// //button for fun facts --randomized
// //selecting points earned area (might not be a button but something else)
// //click on cars to create getting points (can you create a car as a button? Or an image?)
// /*adjust-game-speed
// pause-game
// leave-game
// play-again
// back-to-home-screen
// starter-screen
// instructions-screen
// gameplay-screen
// gameover-screen
// fun-facts
// get-your-car
// swords
// level-up
// */

// // const startGameButton = document.querySelector('#start-game');
// // const instructionsButton = document.querySelector('#instructions');
// // const gameGrid = document.querySelector('#game-grid');
// // const score = document.querySelector('#points-earned');
// // const lives = document.querySelector('#tries-left');

// // const screens = {
// //   start: document.querySelector('#start-screen'),
// //   instructions: document.querySelector('#instructions-screen'),
// //   gameplay: document.querySelector('#gameplay-screen'),
// //   gameover: document.querySelector('#gameover-screen')
// // };





// /*-------------------------------- Functions --------------------------------*/
// //What it should do... e.g. text in the title should update
// //e.g. function updateTitle(){
//         // title.textContent = "Updated"}; 

// //Create a function that connects to a different page to start the game
// //Create a function that randomizes fun facts
// //Create a function to add points earned
// //Create a function that gives you instructions when you click on the Basic Instructions button

// // USE THIS:
// // updateScore() and updateLives() functions






// /*----------------------------- Event Listeners -----------------------------*/
// //e.g. button.addEventListener('click', updateTitle); //when you click on the button, it will update the title

// //listen for clicks to create instructions
// //listen for clicks to start game //Do they all have to be separate event listeners?
// //listen for click to adjust game speed







// //The part showing starting and ending game
// //The part showing the "playing of the game/gameplay"
// //Make subfunction categories - like button functions/ ninja functions/ word bubble functions/ sound functions


// /*----------------------------- GAME CODE AS OF MAY 11TH 2025 / HTML CSS JS -----------------------------*/
// /*----------------------------- GAME CODE AS OF MAY 11TH 2025 / HTML CSS JS -----------------------------*/

// //HTML
// // <!-- CAR NINJA GAME HTML -->

// // <!-- Instructions about how to play the game are included in your app. -->
// // <!-- Include win/loss logic and render win/loss messages in HTML. The game you chose must have a win/lose condition. -->
// // <!-- All images on the site have alt text. -->
// // <!-- No text is placed on top of an image in a way that makes the text inaccessible. -->
// // <!-- The game is coded using proper indentation. -->

// // <!-- First create the screen/grid where cars move and have start button there.
// // Then if have time create the other screens.
// // Create the grid.
// // Then create a start game button, an instructions button, a pause button, 
// // an end game button, and also a place where points can be earned

// // Also, created a data area where I can put car comments 
// // and also audio sounds and funny comments. -->

 
// // <!DOCTYPE html>
// // <html lang="en"><!-- Defines the webpage in the english language. -->


// // <head>
// //     <meta charset="UTF-8">
// //     <meta name="viewport" content="width=device-width, initial-scale=1.0">
// //     <title>Car Ninja</title> <!-- Title of game to be displayed in browser tab -->
// //     <meta property="og:title" content="Car Ninja"><!-- Added this line so that Car Ninja title shows up in the browser tab / It wasn't showing up prior to this.-->
// //     <script defer src="./js/app.js"></script> <!-- Link to my JS file -->
// //     <script defer src="./js/data.js"></script> <!-- Link to my data.js file -->
// //     <!-- <link rel="stylesheet" href="./css/reset.css">  --> <!-- Link to Meyers CSS reset - will implement this as soon as I have more time to do styles-->
// //     <link rel="stylesheet" href="./css/style.css"> <!-- Link to my CSS file -->
// // </head>


// // <body>

// //     <!-- HEADER holds the game's title / Wanted to use Semantic Elements in HTML for better visibility & SEO on search engines. -->
// //     <header class="header">
// //         <h1>Car Ninja Game!</h1>
// //     </header>


// //     <h2 id ="gameplay-screen-title" class="screen-title">Time to Ninja Chop - Gameplay Screen</h2>

     
// //     <!-- Using Nav Bar for buttons at the top instead of div - better navigation for all & easier readbility for SEO/other coders-->
// //     <nav>
// //         <button id="start-game" class="buttons">Start Game</button>
// //         <button id="instructions" class="buttons">Instructions</button>
        
// //         <!-- the ability to choose a different game speed each time-->
// //         <button id="adjust-game-speed" class="buttons">Adjust Game Speed</button>

// //         <!-- Also have a button to click on if you want to pause game or leave/start over -->
// //         <button id="pause-game" class="buttons">Pause Game</button>

// //         <!-- Also have a button to click on if you want to pause game or leave/start over -->
// //         <button id="leave-game" class="buttons">Leave Game</button>
// //     </nav>



// //     <!-- MAIN GAME SCREENS - houses the game's 4 screens of the Starter Screen, the Instructions Screen, the Gameplay Screen, and the GameOver Screen -->
// //     <main>

// //         <!-- STARTER SCREEN -- chose to do section instead of div for each screen for better SEO & readibility -->
// //         <section id="starter-screen" class="screens">
// //             <button id="get-your-car" class="buttons">Get Your Car</button><!-- the ability to choose different cars each time play -->
// //             <button id="swords" class="buttons">Sword, Stars, or Nunchucks</button><!-- the ability to choose different weapons each time play -->
// //             <button id="level-up" class="buttons">Level Up!</button><!-- the ability to level up with different missions after a certain amount of points -->
// //             <h2>Welcome to Car Ninja</h2>
// //             <h3>Ready to Ninja Chop Some Cars?!!!</h3>
// //             <p>Click "Start Game" to begin or read more about the game by clicking "Instructions" to learn how to
// //                 play!</p>
// //         </section>


// //         <!-- INSTRUCTIONS SCREEN -->
// //         <section id="instructions-screen" class="screens hidden">
// //             <h2>Instructions</h2>
// //             <p><strong>Your challenge if you choose to accept it...</strong></p>
// //             <ol>
// //                 <li>Click cars to score points. Don't you wanna get slow drivers, bad drivers, and cybertrucks off the road?</li>
// //                 <li>Avoid potholes to keep lives. If you click on a pothole, you lose a life!</li>
// //                 <li>Score 10+ points in 30 seconds to win!</li>
// //             </ol>
// //         </section>


// //         <!-- GAMEPLAY SCREEN -->
// //         <section id="gameplay-screen" class="screens">

// //             <!-- SCORE DISPLAY - recommended to use span because inline and because it's dynamic text-->
// //             <div class="score-display"><!-- Using class instead of id for reusability, in case create another screen with points earned. -->
// //                 <span id="points-earned">Score: 0</span><!-- Using an id name that makes sense to me for easier referencing -->
// //                 <span id="tries-left">Lives: 3</span><!-- Using an id name that makes sense to me for easier referencing -->
// //                 <span id="countdown-timer">Time Left: 15</span>
// //             </div>

// //             <!-- GAME-GRID -->
// //             <div id="game-grid">
// //                 <!-- <img src="https://images.autotrader.com/scaler/408/306/hn/c/03775bd69037404893e710eea5872111.jpg"
// //                     width="100" height="100" alt="Car Name Of Image Here">
// //                 <img src="https://media.istockphoto.com/id/174662203/photo/pot-hole.jpg?s=612x612&w=0&k=20&c=HhFYQD5qAJItGzYWJJQ72nxBR8iidL7Np2g82dfvnoM="
// //                     width="100" height="100" alt="Pothole Image Here"> -->
// //             </div>
// //             <!-- Create more car image/images -->
// //             <!-- Create potholes/bombs you shouldn't click -->
// //             <!-- have a 'ready...3 2 1... go'section -->
// //         </section>


// //         <!-- GAMEOVER SCREEN... have Bill Paxton saying "Game Over Man! Game Over! Why don't we put her in charge?" -->
// //         <section id="gameover-screen" class="screens">
// //             <button id="fun-facts" class="buttons">Fun Facts</button>
// //         </section>

// //     </main>

    

// //     <!-- FOOTER  -->
// //     <footer>
// //         <button id="play-again" class="buttons">Play Again!</button>
// //         <button id="back-to-home-screen" class="buttons">Back To Home Screen</button>
// //         <!-- <button id="ninja-ads" class="buttons">Ads?! Ninja Chop Them!</button> -->
// //         <!-- create funny ads that pop up and then you ninja chop them randomly whether in the game or outside the game. -->
// //     </footer>

// // </body>

// // </html>

// // -------------------

// //CSS

// /* CAR NINJA GAME CSS */

// /* CSS Flexbox and/or Grid is used for page layout design. */

// /* Colors used on the site have appropriate contrast that meet the 
// WCAG 2.0 level AA standard. */

// /* The game is coded using proper indentation. */

// /*ADDTL INFO FOR HIDING ELEMENTS - TO BE DELETED BEFORE SUBMISSION

// What Does display: none Mean?

// Definition: display: none in CSS hides an element completely from the page, removing it from the 
// layout as if it doesn’t exist. It’s not visible, and it takes up no space (unlike visibility: hidden, 
// which hides but keeps space).

// Use in Your Game: You’d use display: none to hide screens (e.g., <div id="gameplay-screen">) or content 
// (e.g., instructions) initially, then use JavaScript to set display: block to show them when needed 
// (e.g., when clicking “Play Game” or “Instructions”, user stories #1–2).

// Example Context: Apply display: none to <div id="gameplay-screen"> in CSS so it’s hidden until the game starts,
//  controlled by JavaScript. */


// /*******************************
//   RESETS & GLOBAL STYLES IN BODY
// // ********************************/
// // * {
// //     box-sizing: border-box;
// // }

// // body {
// //     background-color: lightgrey;
// // }



// // /*****************************
// //   HEADER STYLES
// // *****************************/
// // header h1 { /* chose header h1 to differentiate between other headers on other screens */
// //     color: cornflowerblue;/* originally using this color and might come back to color: rgb(39, 39, 231); */
// //     -webkit-text-stroke: 1px black; /* Black outline around letters */
// //     text-align: center;
// //     margin-bottom: 5px;
// // }

// // h2 {
// //     margin-top: 0; 
// //     /* removes all space above */
// //     margin-bottom: .8px;
// //     color: cornflowerblue;
// //     -webkit-text-stroke: 1px black;
// //     text-align: center;
// //     margin-bottom: 11px;
// // }



// // /*****************************
// //  NAVIGATION BAR STYLES
// // *****************************/
// // nav {
// //     display: flex;
// //     justify-content: space-evenly;
// // }



// // /*****************************
// //   BUTTON STYLES
// // *****************************/

// // /* ALL BUTTONS */
// // .buttons {
// //     /* dark blue with light blue border */
// //     background-color: cornflowerblue;
// // }

// // /* START GAME BUTTON & INSTRUCTIONS BUTTONS */
// // #start-game, #instructions {
// //     background-color: yellow;
// // }

// // /* BACK TO HOME SCREEN BUTTON */
// // #play-again, #back-to-home-screen {
// //     background-color: yellow;
// // }



// // /*******************************
// //   HIDING SCREENS
// // ********************************/
// // .screens {
// //     display: none;
// // }

// // .active { 
// //     /* Any element with class="active" will be visible on the screen. And the class="active" is done in JS */
// //     display: block;
// // }



// // /*****************************
// //   SCREEN-SPECIFIC STYLES
// // *****************************/

// // /* Styling Of Different Screens below */
// // #starter-screen h2, #instructions-screen h2 {
// //     color: cornflowerblue;/* originally using this color and might come back to color: rgb(39, 39, 231); */
// //     -webkit-text-stroke: 1px black; /* Black outline around letters */
// //     text-align: left;
// // }

// // /* #gameplay-screen-title {} */


// // /* DOUBLE CHECK THIS STYLING BELOW WITH RESETING MARGIN AND MAKE SURE IT'S CORRECT */
// // #instructions-screen p,
// // #instructions-screen ol {
// // margin: 0;/* Resets top/bottom margins */
// //  }


// // #instructions-screen p {
// //     font-size: 12px;
// //     margin-top: 0;
// //     color: black;
// // }

// // #instructions-screen

// // ol {
// //     font-size: 12px;
// //     font-weight: semi-bold;
// // }

// // /* Trying to add thin black border around images... and not currently working*/
// // #game-grid img {
// //     border: 5px black;
// // }



// // /*****************************
// //   SCORE & LIVES STYLES
// // *****************************/

// // .score-display {
// //     color: white;
// //     font-size: 24px;
// //     font-family: Arial, sans-serif;
// //     background: rgba(0, 0, 0, 0.5);
// //     padding: 10px;
// //     border-radius: 5px;
// //     margin-top: 10px;
// //     margin-bottom: 20px; /* Space between score and game grid */
// //     text-align: center; /* Optional: Center the text */
// // }

// // #points-earned, #tries-left {
// //     margin-right: 20px;
// // }



// // /*****************************
// //             GRID 
// // *****************************/

// // #game-grid {/* targeting the full container/the outer wrapper holding all the grid squares */
// //     display: flex; /* to arrange cells in the grid*/
// //     flex-wrap: wrap; /* to arrange cells in the grid*/
// //     width: 600px; /*sets grid size - fixed width for 12 columns so grid has stability depending on screen size */
// //     margin: 0 auto; /* to center the grid on the page & fixes left alignment issue*/

// // }

// // #game-grid div { /* targeting each individual box inside the grid */
// //     width: calc(100% / 12); /* makes every cell exactly 50px wide (600 divided by 12) */
// //     height: 50px;  /* keeps height 50px for 4 rows - not sure why height in px works but height in % doesn't */
// //     border: 1px solid lightblue; /* for cell outlines - could also use rgb(143, 199, 218) */
// // }

// // #game-grid div.cybertruck {
// //     background-image: url("../images/cybertruck.jpg");
// //     background-size: 100% 100%; /* stretch to fill cell - I'm ok if image is distorted - wanted it to be on purpose so car looks more cartoony */
// //     /* Can use background-size: cover too to fill without the distortion */
// //     background-repeat: no-repeat; /*to show one image*/
// //     background-position: center; /*to center the in the cell*/
// // }



// // /*****************************
// //  FOOTER STYLES
// // *****************************/
// // footer {
// //     display: flex;
// //     justify-content: right;
// //     gap: 15px;
// //     /* margin-top: 12px; */
// // }

// // #play-again, #back-to-home-screen {
// //     margin-top: 12px;
// // }

// // -------------------

// //JS
// // CAR NINJA GAME JS

// //The code in the app adheres to coding conventions covered in lessons, 
// // like using plural names for arrays.

// // Render the game in the browser using the DOM manipulation techniques 
// // demonstrated in lecture.

// // The game is coded using proper indentation.

// //!! MAIN FOCUS IS ON MVP AND GETTING GAMEPLAY SCREEN TO WORK

// console.log('JS LINKED AND WORKING');

// /*
// ✅ Create grid first in HTML CSS & JS - so have game's playing field needed for cars and potholes
// Set Up Variables and Displays for score/lives/displays: ✅ Set up score, ✅ lives, and displays to track and show the game’s state.

// ✅ Set up these variables already:
// let score, let lives, const gameGrid, const width, const height, const cellCount, const cells, const cell,
// const gameplayScreen, const startButton, let gameTimer, let timeLeft, let countdownInterval,
// const scoreDisplay, const countdownDisplay


// Code the Start Game Button Functionality
// Code the Score Functionality
// Code the Lives Functionality
// Code the Timer Functionality
// Code the Car Spawning Functionality
// Code the game Over-Functionality
// Code the pothole spawning functionality
// Code the win/loss conditions
// Code for 3 Round Functionality


// create click event where click on car and number generates for score
// create click event where click on a cell that doesn't have points, and number generates for score
// */

// /* ------ADDTL VARIABLES ADDED TO THE TOP THAT I WAS MISSING ----------*/
// // const livesDisplay = document.getElementById('tries-left');
// // const countdownDisplay = document.getElementById('countdown-timer');
// // const gameOverScreen = document.getElementById('gameover-screen');


// // /*-------- Temporary Code to Have For Gameplay Screen As Active Until I'm able to create code that moves from one screen to the next-----*/

// // //CREATING GRID
// // //CREATING gameplayScreen WITH gameGrid - finding and then making it active
// // const gameplayScreen = document.getElementById('gameplay-screen'); // Find gameplay screen
// // gameplayScreen.classList.add('active'); // Show gameplay screen - as active (as opposed to hidden)


// // // Creating gameGrid
// // /* Using tools/example Tristan showed in class*/
// // const gameGrid = document.querySelector("#game-grid");//grabbing the grid in html
// // const width = 12; // columns - width usually refers to how many columns are in each row. 12 columns * 12 rows = 144 squares total
// // const height = 4; // rows
// // const cellCount = width * height; //12 * 4 = 48 --currently creating a game with 12 across and 4 high -- subject to change later
// // const cells = []; //creating an empty array that is meant to store each cell of the grid as I create them in a loop.
// // const cell = document.createElement("div"); //creating the cells
// // let score = 0; //creating score variable for tracking player's points
// // let lives = 3; // creating lives variable for tracking player's lives (3 total)
// // let car = document.createElement('img'); //defining car in global scope

// // function createGrid() {
// //         for (let i = 0; i < cellCount; i++) {
// //                 const cell = document.createElement("div");
// //                 cells.push(cell); // Store <div> elements, not numbers
// //                 gameGrid.appendChild(cell);
// //         }
// // }
// // createGrid();

// // // ------------------------------

// // //CREATING START BUTTON FUNCTIONALITY
// // const startButton = document.getElementById("start-game");
// // startButton.addEventListener('click', startGame);

// // function startGame() {
// //     //reset game state
// //     score = 0;
// //     lives = 3;
// //     updateScore();//Do I need to create an additional function for this?
// //     updateLives();//this isn't defined yet - //Do I need to create an additional function for this?
// //     //start timer
// //     startGameTimer();
// //     //start spawning cars
// //     spawnLoop = setInterval(spawnCar, 1000);//spawning cars every second
// // }

// // // ------------------------------

// // //PART OF CAR SPAWNING FUNCTIONALITY
// // //CREATING ADDING AND REMOVING CYBERTRUCK
// // function addCyberTruck(cellNumber) {
// //     cells[cellNumber].classList.add("cybertruck");
// // }
// // // addCybertruck(7);
// // // ------

// // function removeCyberTruck() {
// //     cells[cybertruckPosition].classList.remove("cybertruck");
// // }

// // // ------------------------------

// // //CREATING SPAWN CAR SECTION
// // // SPAWN CAR Section
// // // spawnCar is showing up in between cells and not hitting cells - Need to figure out why not working
// // function spawnCar() { //Declaring a function called spawnCar that will run code to add a car image to the grid when called
// //     const randomCellPick = Math.floor(Math.random() * cells.length); //storing a random # to pick a grid cell
// //     //Math.random()built in function generates decimal number and then it's multiplied by 48 //don't totally get it but it's working
// //     const cell = cells[randomCellPick];
// //     if (!cell.querySelector('img')) { // Check if cell is empty with no image so it can put an image in there
// //         const car = document.createElement('img'); //creates a new img html element
// //         car.src = '../images/cybertruck.jpg'; //setting image source
// //         car.alt = 'Cybertruck Car'; //setting alt text for accessibility and screen readers
// //         car.style.width = '100%'; //newly created car is styled with the width of 100% of the cell
// //         car.style.height = '100%'; //newly created car is styled with the height of 100% of the cell
// //         car.classList.add('car'); // Ensure CSS positioning
// //         cell.appendChild(car); //adds car as child of cell
// //         car.addEventListener('click', () => {
// //             score++;
// //             updateScore();
// //             car.remove(); //remove the car once it is clicked
// //         })
        
// //         setTimeout(()=>{
// //             car.remove();
// //         }, 3000); //removes car from grid after 3 seconds if not clicked
// //     }
// // }

// // // setInterval(spawnCar, 1000); // Spawn car every 1 second//! Commented out setInterval so that it doesn't immediately spawn cars immediately before game starts
// // //setInterval is a function that repeatedly calls a function at a set interval.


// // // ------------------------------

// // //ADDING CLICK-TO-SCORE FUNCTIONALITY
// // const scoreDisplay = document.getElementById("points-earned"); //selecting and creating a variable for the score display element

// // function updateScore() { //updates the score
// //     scoreDisplay.textContent = `Score: ${score}`;
// // }

// // // ------------------------------
// // // ------------------------------

// // //ADDING COUNTDOWN TIMER FUNCTIONALITY, SO CODE DOESN'T GO ON INDEFINITELY
// // //getting help from chatgpt, deepseek, and grok big time for this one

// // let gameTimer; // creating gameTimer for the 15-second timeout
// // let timeLeft = 15; //starting time for the 15-second timeout
// // let countdownInterval; //for live countdown display turning red in last 3 seconds

// // // const startButton = document.getElementById('start-game');//already declared
// // startButton.addEventListener('click', restartGame);

// // function startGameTimer() {
// //     const countdownDisplay = document.getElementById('countdown-timer'); //selecting element
// //     timeLeft = 15; //setting game time to 15 seconds - resetting time
// //     countdownDisplay.textContent = `Time Left: ${timeLeft}`;
  
// //     // Countdown that updates every second
// //     countdownInterval = setInterval(() => {
// //       timeLeft--;
// //       countdownDisplay.textContent = `Time Left: ${timeLeft}`;

// //       if(timeLeft <= 3) {
// //         countdownDisplay.classList.add("low-time");
// //       } else {
// //         countdownDisplay.classList.remove("low-time");
// //       }

// //       if (timeLeft <= 0) {
// //         clearInterval(countdownInterval);
// //       }
// //     }, 1000);
  
// //     // After 15 seconds, end the game
// //     gameTimer = setTimeout(() => {
// //       triggerGameOver();
// //     }, 15000);
// //   }
  
// //   function triggerGameOver() {
// //     clearInterval(countdownInterval);
// //     clearTimeout(gameTimer);
// //     clearInterval(spawnLoop); //stops spawning cars
// //   }

// //   function restartGame () {
// //     spawnLoop = setInterval(spawnCar, 1000);
// //     startGameTimer();
// //   }


// //   function restartGame() {
//     // reset score, lives, etc.
// //     startCountdown(() => {
// //       spawnLoop = setInterval(spawnCar, 1000);
// //       startGameTimer(); // this line starts the timer
// //     });
// //   }

// //   startCountdown(() => {
// //     spawnLoop = setInterval(spawnCar, 1000);
// //     startGameTimer();  //this line starts the timer
// //   });

// // ------------------------------
// // ------------------------------



















// /*-------------------------------- Constants --------------------------------*/



// /*-------------------------------- Variables --------------------------------*/



// /*------------------------ Cached Element References ------------------------*/
// //Things I want to select so I can do something with them.
// //e.g. const button = document.querySelector('button');
// //e.g. const title = document.querySelector ('h1');

// //button to start game
// //button to adjust game speed
// //button for fun facts --randomized
// //selecting points earned area (might not be a button but something else)
// //click on cars to create getting points (can you create a car as a button? Or an image?)
// /*adjust-game-speed
// pause-game
// leave-game
// play-again
// back-to-home-screen
// starter-screen
// instructions-screen
// gameplay-screen
// gameover-screen
// fun-facts
// get-your-car
// swords
// level-up
// */

// // const startGameButton = document.querySelector('#start-game');
// // const instructionsButton = document.querySelector('#instructions');
// // const gameGrid = document.querySelector('#game-grid');
// // const score = document.querySelector('#points-earned');
// // const lives = document.querySelector('#tries-left');

// // const screens = {
// //   start: document.querySelector('#start-screen'),
// //   instructions: document.querySelector('#instructions-screen'),
// //   gameplay: document.querySelector('#gameplay-screen'),
// //   gameover: document.querySelector('#gameover-screen')
// // };


// /*-------------------------------- Functions --------------------------------*/
// //What it should do... e.g. text in the title should update
// //e.g. function updateTitle(){
//         // title.textContent = "Updated"}; 

// //Create a function that connects to a different page to start the game
// //Create a function that randomizes fun facts
// //Create a function to add points earned
// //Create a function that gives you instructions when you click on the Basic Instructions button

// // USE THIS:
// // updateScore() and updateLives() functions


// /*----------------------------- Event Listeners -----------------------------*/
// //e.g. button.addEventListener('click', updateTitle); //when you click on the button, it will update the title

// //listen for clicks to create instructions
// //listen for clicks to start game //Do they all have to be separate event listeners?
// //listen for click to adjust game speed







// //The part showing starting and ending game
// //The part showing the "playing of the game/gameplay"
// //Make subfunction categories - like button functions/ ninja functions/ word bubble functions/ sound functions




