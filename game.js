// Button
class Button {
  constructor({ img, x, y, size }) {
    this.img = img; // stores the icon image
    this.x = x;
    this.y = y;
    this.size = size;
  }

  display() {
    if (!this.img) return; //if no image is loaded, stop the function

    imageMode(CENTER); //postion and size
    image(this.img, this.x, this.y, this.size, this.size);
  }

  isClicked(mx, my) { //checks if the button is clicked
    let half = (this.size * 0.6) / 2; // hit box

    return (
      mx > this.x - half &&
      mx < this.x + half &&
      my > this.y - half &&
      my < this.y + half
    );
  }
}


// Game
class Game {
  constructor(bg, howIcon, resetIcon, basket, basketForLater, clothesSheet) {
    this.bg = bg;
    this.timer = 0;
    this.clothes = []; // to drag the clothes
    this.clothesImages = []; // array of clothes from clothesSheet

    // spritesheet for different types of clothes
    let cols = 5;
    let rows = 4;
    let w = clothesSheet.width / cols;
    let h = clothesSheet.height / rows;

    // getting the clothes
    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        let img = clothesSheet.get(x * w, y * h, w, h);
        this.clothesImages.push({
          img: img,
          row: y
        });
      }
    }

    // button size and settings
    this.buttonSetting = {
      padding: 185,
      size: 130,
      gap: 5
    };


    this.howButton = new Button({ // how button
      img: howIcon || null,
      x: 0,
      y: 0,
      size: this.buttonSetting.size
    });

    this.resetButton = new Button({ // reset button
      img: resetIcon || null,
      x: 0,
      y: 0,
      size: this.buttonSetting.size
    });

    this.basketButton = new Button({ // basket for clothes
      img: basket,
      x: 0,
      y: 0,
      size: 200
    });

    this.basketForLaterButton = new Button({ // basketForLater for clothes
      img: basketForLater,
      x: 0,
      y: 0,
      size: 160
    });
  }

  display() {
    if (!this.bg) return;

    imageMode(CENTER);

    // background image resize to fit perfectly with the screen
    const scale = min(width / this.bg.width, height / this.bg.height);
    const w = this.bg.width * scale;
    const h = this.bg.height * scale;

    image(this.bg, width / 2, height / 2, w, h); // background

    // display text reminder on the bottom right of the screen
    this.displayText();

    // basket position
    this.basketButton.x = width - 470;
    this.basketButton.y = height - 350;

    // basketForLater position
    this.basketForLaterButton.x = width - 1100;
    this.basketForLaterButton.y = height - 450;

    // draw basket
    this.basketButton.display();
    this.basketForLaterButton.display();

    // draw 6 small slots on the pink basket (visual guide) 
    let slotCount = 6;

    for (let i = 0; i < slotCount; i++) {
      let x = this.basketForLaterButton.x - 50 + i * 20;
      let y = this.basketForLaterButton.y;

     fill(255, 255, 255, 100);
     noStroke();
     ellipse(x, y, 18);
    }

    // draw the clothes
    for (let c of this.clothes) {
      c.update();
      c.display();
    }

    // count how many clothes are inside the pink basket
     let basketCount = 0;

     for (let c of this.clothes) {
      let d = dist(c.x, c.y, this.basketForLaterButton.x, this.basketForLaterButton.y);

      if (d < 80) { 
       basketCount++;
  }
}

    // base position
    let baseX = this.buttonSetting.padding;
    let baseY = height - this.buttonSetting.padding;

    // HOW button (bottom left)
    this.howButton.x = baseX + this.buttonSetting.size / 0.75;
    this.howButton.y = baseY - this.buttonSetting.size / -7;

    // RESET button (next to how)
    this.resetButton.x = this.howButton.x + 70;
    this.resetButton.y = this.howButton.y;

    // display buttons
    this.howButton.display();
    this.resetButton.display();

    // weight system ------------ lose and win state
    this.totalWeight = 0;
    let clothesOnLine = 0;
    
    for (let c of this.clothes) {
      if (c.onLine) {
      this.totalWeight += c.weight;
      clothesOnLine++;
     }
    }

    // lose state, if the weight limit on the clothesline is more than 2000 gram, the player loses
    if (this.totalWeight > 2000) { 
      wonGame = false;
      gameState = 'loseScreen';
    }

    // lose if too many clothes on top of the pink basket
    if (basketCount >= 6) {
      wonGame = false;
      gameState = 'loseScreen';
    }

    // win state, if the weight limit is less than 2000 grams and there are 10 clothes on the line, the player wins
    if (clothesOnLine === 10) {
      wonGame = true;
      gameState = 'winScreen';
    }

    this.updateTimer();
    this.displayTimer();
  }

  // text on the bottom right of the game screen
  displayText() {
    textSize(14);
    textAlign(RIGHT, TOP);
    fill(252, 204, 84);
    stroke(252, 204, 84);
    strokeWeight(1);

    let x = width - 335;
    let y = height - 186;

    text("HANG 10 CLOTHES WITHOUT GOING OVER THE LIMIT!", x, y);
    text("MAKE SURE TO FOLLOW INSTRUCTIONS!", x, y + 25);
  }


  updateTimer() {
    if (frameCount % 60 === 0) {
      this.timer++;
    }
  }

  displayTimer() {
    textSize(30);
    textAlign(RIGHT, TOP);
    fill(252, 204, 84);
    stroke(252, 204, 84);
    strokeWeight(2);

    let minutes = floor(this.timer / 60);
    let seconds = this.timer % 60;
    let displayTime = nf(minutes, 2) + ":" + nf(seconds, 2);

    text(displayTime, width - 335, 150); // timer position
  }
}