# car-ninja-alternate-universe
# car-ninja
Car Ninja Game ---- Ready to ninja chop some cars??!? Have all the cars around you been driving too slowly in the fast lane, lately? And you're done with it?! If so, Car Ninja is for you!

README Requirements:

1. Screenshot/Logo: A screenshot of your app or a logo.

2. Your game's name: Include a description of your game and what it does. Background info about the game and why you chose it is a nice touch.

Game Name: Car Ninja

Description:

Background Info: I chose to create this game because (1) Fruit Ninja is FUN! Who doesn't like to slice random fruit and see it splat everywhere, without the real-life cleanup?! And (2) I wanted to create a game that is similar but with cars because when I drive in the United States, the drivers are horrible and they like to drive slowly in the fast lanes, and also don't abide by driving rules. I thought it would be fun to create a game where you could "slice" a car that's a poor driver (since you can't do it in real life. hehe). I figure this new rendition could be the solution for "road rage". Just play Car Ninja, and you won't want to do crazy things on the real road! lol

3. Getting started: Include a link to your deployed game and any instructions you deem important. This should also contain a link to your planning materials./Use one of these three terminologies "Deployed Game" or "Play at" or "Demo"
Link to deployed game:
Instructions: 
Link to my planning materials:
Excalidraw Proposal Rendering:
User Stories:
Pseudocode:

4. Attributions: This section should include links to any external resources (such as libraries or assets) you used to develop your application that require attribution. You can exclude this section if it does not apply to your application.
General External Resources:
Libraries: 
Assets:
References:

5. Technologies Used: List of the technologies used, for example: HTML, CSS, JavaScript, Google Fonts (is that a technology or just a linked site?), etc.
HTML
CSS
JavaScript

6. Next Steps: Planned future enhancements (stretch goals).
Expanding on the game and creating a full slice rather than just a click
More animations.
More sound effects.
More backdrops including different locations.
A fuller variety of cars.
The ability to be different characters as you play.


7. //If time, add sections including: Features, Screenshot/Images/Visuals Descriptions,MVP Requirements, Early Concept/Ideas, Process aka Build/CodeProcess, Known Issues & Bug Solves, Edge Cases Covered, and also disclaimer since I'm re-creating a game that is already big "Fruit Ninja". Somewhere state that this is educational, for learning class purposes, and is from a ninja-movie-watching-fan!

8. Ahas & Awarenesses from this project while researching code, coding, and fixing bugs

CONSISTENT TEXT - In my data.js section, inside Objects, using consistent text for the "key" in key: value pairs was especially eye opening for me, regarding ease of use later on in coding... Especially in JS iterating over arrays and objects (e.g. forEach, for...loop). Creating consistent text makes code more reusable and easier to maintain.

Example: 

MY INITIAL VERSION:
const carComments = [
    { comment1: "Oh noooo! I was driving to slow!" },//AI is saying I need consistent keys here and to name them all "text"/ask about this
    { comment2: "" },
    { comment3: "" },
    { comment4: "" },
    { comment5: "" } //Took off trailing comment here. Even though comma works with modern JS, doesn't work for older environments.
];

CORRECTED VERSION FOR MORE USEABILITY:
const carComments = [
    { text: "Oh noooo! I was driving to slow!" },//AI is saying I need consistent keys here and to name them all "text"/ask about this
    { text: "" },
    { text: "" },
    { text: "" },
    { text: "" } //Took off trailing comment here. Even though comma works with modern JS, doesn't work for older environments.
];
