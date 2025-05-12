//Below is data for putting funny car insult comments and also congratulatory comments.

//ADDTL REMINDERS AND IDEAS:
//objects have key:valuePairs,
//create a randomization of pulling these comments. Figure out how to do that in JS.

const carComments = [
    { text: "Oh noooo! I was driving to slow!" },//AI is saying I need consistent keys here and to name them all "text"/ask about this
    { text: "Bad cybertruck! Bad!" },
    { text: "What are you doing on the road, cybertruck? You don't fit!" },
    { text: "Slow drivers! Hiiiiya!!!" },
    { text: "Why are you driving slowly in the fast lane?!" } //Took off trailing comment here. Even though comma works with modern JS, doesn't work for older environments.
];

//This!.. is a CYBERTRUCK! CHOP IT! --EASTER EGG DOUG DIMURO CAR GUY

const carClickCommentSounds = [
    {text: "hiyyyyyyyaaaaaaa!"},
    {text: "NINJA CHOP!"},
    {text: "kapow!"},
    {text: "Splat!"},
    {text: "Wham!"},
    {text: "Whack!"},
    {text: "Slice!"},
    {text: "Swoosh!"},
    {text: "Snap!"},
    {text: "Crack!"},
    {text: "Zing!"},
    {text: "Zoom!"},
    {text: "Bam!"},
    {text: "Ping!"},
    {text: "Smack!"},
    {text: "Strike!"},
    {text: "Crush!"},
    {text: "Flash!"},
    {text: "Silence. Target destroyed!"},
    {text: "Zoomf!"},
    {text: "Boomf!"},
    {text: "Chop Chop!"},
]

const congratsComments = [
    { text: "You're technique is very strong!" },
    { text: "You are like the Iron Fist, chopping through cars and saving people from horrible drivers!" },
    { text: "You are like Wolverine, cutting all these cars in half!" },
    { text: "You're doing grrrrreat!" },
    { text: "ALRIIIIGHT, YOU'VE CHOPPED ALL THE CYBERTRUCKS" },
    { text: "CHOPPING THE CAR CHOPPING THE CAR" }//BREAKING THE LAW SONG
];


const gameOverComments = [
    {text: "Gameover, man! Gameover!"}, //from the movie Aliens2. Maybe also add "Why don't you put her in charge?!"
    {text: "Dooooooooooooooode"},
    {text: "Breh, you're not good at this."},
    {text: "Beavis, I'm disappointed in you."},
    {text: "Settle down, Beavis, you lost"},
    {test: "Simmah down now! Simmah down nah!"}
];


const carChoiceNinja = [
{
    name: "Ferrari Ninja",
    speed: 120, //or could do a string "The speed of sound."
    weapons: ["Sword", "Ninja Stars/Throwing Stars", "Nunchucks"],
    locations: ["Rome", "Australia", "Nepal", "Japan", "Underground", "Under water"], //where car typically likes to drive
},

{
    name: "Cybertruck Trashcan",
    speed: 20,
    weapons: "I'm a cybertruck. I look like a big weapon",
    locations: ["Rome", "Australia", "Nepal", "Japan", "Underground", "Under water"], 
}
];
//above create a startGame function within the Object like...
// startGame: function() {
//     console.log("Game started!");
// }

// Access properties
// console.log(carNinja.name); // "Ferrari Ninja"
// carNinja.startGame(); // "Game started!"

/*
INFORMATION ABOUT INCONSISTENT KEYS THAT CAN BE DELETED LATER AFTER I DELVE MORE INTO THIS AND BETTER UNDERSTAND IT:
Why Consistent Keys (e.g., text) Are Recommended

You’re correct that iterating by index lets you access each object (e.g., carComments[0], carComments[1]), but the issue is accessing the comment text inside each object due to inconsistent keys (comment1, comment2, etc.). Here’s why this causes problems and why consistent keys help:
Problem with Inconsistent Keys:
Each object has a different key (comment1, comment2, comment3, etc.), so to get the comment text, you need to know which key to use for each index:
carComments[0].comment1 gets “Oh noooo! I was driving to slow!”

carComments[1].comment2 gets “”, etc.

When iterating, you can’t use a single key to access the text. You’d need logic to match the index to the correct key (e.g., if index === 0, use comment1; if index === 1, use comment2), which is complex and error-prone.

For specific comment selection (e.g., picking “Oh noooo!” for a slow-driving scenario), you must hardcode the key (comment1) and index (0), making your function less flexible.

Why Consistent Keys Help:
Using the same key (e.g., text) for all objects means you can access the comment text with one key, regardless of index:
carComments[0].text, carComments[1].text, etc.

Iteration: In a loop (e.g., index++), you can always use carComments[index].text to get the comment, no extra logic needed.

Specific Selection: To pick a comment (e.g., “Oh noooo!”), use the index (carComments[0].text) or add an id/type property (e.g., { text: "Oh noooo!", type: "slow" }) for clarity, without needing unique keys.

Simpler Functions: A function to display or select comments can assume text as the key, making your code reusable and easier to maintain (user story #24).

Your Concern (No Confusion with Different Keys):
You think different keys (comment1, comment2) help identify comments to avoid confusion, especially for specific functions. However:
Indices Are Enough: The array’s index (0, 1, 2, ...) already identifies each comment uniquely. You can iterate with index++ and select by index (e.g., carComments[0] for “Oh noooo!”).

Unique Keys Add Complexity: Needing to know comment1 vs. comment2 in your function logic is harder than using text and relying on indices or an id property.

Example (no code): If you want “Oh noooo!” for a slow-driving function, check carComments[0].text or add { text: "Oh noooo!", id: "slow" } and filter by id, not comment1.


*/

