let help = "Press f to toggle fullscreen";
var song;
let soundButton;
let muted = false;
let gameState = 'beginning';
let myImage; // Laundry game image
let myImage2; // instructions image
let myImage3; // game image
let myImage4; // lose image
let myImage5; // win image
let beginning;
let instructions;
let game;
let loseScreen; // shows after losing
let winScreen; // shows after winning
let wonGame = false;
let homeButton; //home button
let howIcon; // how button in gameState
let resetIcon; // reset button in gameState
let muteIcon; // mute icon
let unmuteIcon; //unmute icon
let basket; //purple basket
let basketForLater; // pink basket (for stashing clothes)
let clothesSheet; // random clothes when clicking the purple basket
let clothesLine; // clothing line to hang the clothes

// ===== PRELOAD =====
function preload() {

  //backgrounds
  myImage = loadImage('Laundry.png');
  myImage2 = loadImage('instructions.png');
  myImage3 = loadImage ('game.png');
  myImage4 = loadImage ('loseScreen.png')
  myImage5 = loadImage ('winScreen.png')

  //icons
  homeIcon = loadImage('homeIcon.png'); 
  howIcon = loadImage('howIcon.png'); 
  resetIcon = loadImage ('resetIcon.png');
  muteIcon = loadImage ('muteIcon.png');
  unmuteIcon = loadImage ('unmuteIcon.png');

  // game overlays
  basket = loadImage ('basket.png')
  basketForLater = loadImage ('forLater.png');
  clothesSheet = loadImage ('clothesSheet.png');

  // music background
  song = loadSound ('backgroundMusic.mp3');
}

// ====== SET UP ======
function setup() {
  console.log(song);
  createCanvas(windowWidth, windowHeight); //set canvas size to screen
  beginning = new Beginning(myImage);
  instructions = new Instructions(myImage2);
  game = new Game(myImage3, howIcon, resetIcon, basket, basketForLater, clothesSheet);
  loseScreen = new LoseScreen(myImage4, resetIcon);
  winScreen = new WinScreen(myImage5, resetIcon);

  clothesLine = []; //clothes array

  let startX = width / 2 - 200;  // start of the clothesline
  let y = height/ 2;
  let maxSlots = 10; // 10 clothes only on the line
  let spacing = 80;

  for (let i = 0; i < 10; i++) { // 10 slots in the clothes line
  clothesLine.push(createVector(startX + i * 80, y));
}

  homeButton = new Button({ // home button to show up consistent in different states.
  img: homeIcon,
  x: width - 200,
  y: 150,
  size: 110
});

  soundButton = new Button({ // sound button to show up consistent in different states.
  img: unmuteIcon,
  x: width - 200,
  y: 150,
  size: 110
});

}


// ====== SCREEN RESIZE AND FULL SCREEN ======
function windowResized(){
  resizeCanvas(windowWidth, windowHeight);
}

function toggleFullscreen() {
  let fs = fullscreen(); // current state
  fullscreen(!fs); // press f to full screen and to go back
}


// ====== DRAW FUNCTION =======
function draw() {
  background(220);

  // states
  if (gameState === 'beginning') {
    beginning.display();
    beginning.text();

  } else if (gameState === 'instruction') {
    instructions.display();
    instructions.text();
    instructions.box();

  } else if (gameState === 'game') {
    game.display();

    if (game && game.basketForLaterButton){
      let startX = game.basketForLaterButton.x - 200; //fixing clothesline just above the for later basket
      let spacing = 80
    for (let i = 0; i < clothesLine.length; i++) {
     clothesLine[i].x = startX + i * spacing;
  }
}

    // lose condition -- if the player goes beyond 60seconds, the player will lose the game.
    if (game.timer >= 60) {
      wonGame = false;
      gameState = 'loseScreen';
    }

  } else if (gameState === 'loseScreen') { // lose screen shows up if the player loses
    loseScreen.display();
  }
  else if (gameState === 'winScreen') { // win screen shows up if the player wins
    winScreen.display();
  }

  soundButton.img = muted ? muteIcon : unmuteIcon; // sound button icon 
   soundButton.x = width - 1360; // keep position consistent
   soundButton.y = 165;
   soundButton.display(); // display sound button on top of every game state

   homeButton.x = width - 1300; // homebutton consistent positioning
   homeButton.y = 165; 
   homeButton.display(); // display home button on the bottom part of the screen of every game state
  }


// ===== KEY PRESSED AND KEYCODES =====
function keyPressed() {

  if (key === 'f' || key === 'F') {  // f to fullscreen
    toggleFullscreen(); 
  }

  if (keyCode === ENTER) {  // change gamestate from beginning to instruction by pressing enter
    if (gameState === 'beginning') {
      gameState = 'instruction';
    }
  }
}

// ===== MOUSE PRESSED ===== //

function mousePressed() {
  
  if (!song.isPlaying()) { // play bg music
    song.loop();
  }

  if (gameState === 'winScreen') { // win screen reset button
  if (winScreen.resetButton.isClicked(mouseX, mouseY)) {
    game.timer = 0; //reset timer
    game.clothes = []; // reset array of clothes
    wonGame = false;
    gameState = 'game';
    return;
  }
}

  if (gameState === 'loseScreen') { // lose screen reset button
  if (loseScreen.resetButton.isClicked(mouseX, mouseY)) {
    game.timer = 0;
    game.clothes = [];
    wonGame = false;
    gameState = 'game';
    return;
  }
}

  if (homeButton.isClicked(mouseX, mouseY)) {  
  // Home button in every game state
  game.timer = 0;
  game.clothes = [];
  wonGame = false;
  gameState = 'beginning';
  return;
}

  if (gameState === 'instruction') { // click anywhere to continue to game from instructions
    gameState = 'game';
    return;
  }


  // ------------- GAME STATE BUTTONS --------------
  if (gameState === 'game') {

    if (game.howButton.isClicked(mouseX, mouseY)) { // intruction button to know how to play
      gameState = 'instruction';
      return;
    }

    if (game.resetButton.isClicked(mouseX, mouseY)) { // reset button to reset the game
      game.timer = 0; //reset timer
      game.clothes = []; //reset pile of clothes
      return;
    }

    // dragging the clothes
    let grabbed = false; // to prevent grabbing multiple clothes at a time
    for (let i = game.clothes.length - 1; i >= 0; i--) { // ensures the player grabs the top most cloth
      let c = game.clothes[i];

      if ( // mouse direction if clicked
        mouseX > c.x - c.size / 2 &&
        mouseX < c.x + c.size / 2 &&
        mouseY > c.y - c.size / 2 &&
        mouseY < c.y + c.size / 2
      ) {

        c.pressed(mouseX, mouseY);

        // bring to front
        game.clothes.splice(i, 1);
        game.clothes.push(c);

        grabbed = true;
        break;
      }
    }

    // clicking the purple basket to spawn clothes
    if (!grabbed && game.basketButton.isClicked(mouseX, mouseY)) { //checks if the mouse click is inside the basket button
      let choice = random(game.clothesImages);

      let newCloth = new Cloth( //the clothing will spawn because of this
        game.basketButton.x,
        game.basketButton.y,
        choice.img,
        choice.row
      );

      game.clothes.push(newCloth); 
      return;
    }


  // click sound button to mute and unmute 
  if (soundButton.isClicked(mouseX, mouseY)) {
    muted = !muted;

    if (muted) {
      song.setVolume(0);
    } else {
      song.setVolume(1);
    }

    return;
  }
}
}


// ===== MOUSE RELEASE AFTER DRAGGING ===== //

function mouseReleased() {
  let spacing = 80;   // gaps in between the clothes
  let maxSlots = 10; // maximum slots for the clothesline

  for (let c of game.clothes) { //loop that does the command in every clothes
    c.released();

    // finging closest point on the line 
    let closest = null;
    let minDist = 9999;

    for (let p of clothesLine) {
      let d = dist(c.x, c.y, p.x, p.y);

      if (d < minDist) {
        minDist = d;
        closest = p;
      }
    }

    // if the clothes are close, it will snap onto the clothesline
    if (minDist < 80) {

      // count how many are already placed
      let placed = game.clothes.filter(cl => cl.onLine).length;

      if (!c.onLine && placed < maxSlots) {

        let startX = clothesLine[0].x;

        c.x = startX + placed * spacing;
        c.y = closest.y - c.size / 2;

        c.onLine = true;
      }

    } else {
      c.onLine = false;
    }
  }
}
