class Instructions {
  constructor(img) {
    this.img = img;
    this.drawW = 0;
    this.drawH = 0;
  }

  calculateSize() { // so that the image / background wont stretch
    let scaleFactor = min(width / this.img.width, height / this.img.height);
    this.drawW = this.img.width * scaleFactor;
    this.drawH = this.img.height * scaleFactor;
  }

  display() {
    if (!this.img) return;

    this.calculateSize();

    imageMode(CENTER);
    image(this.img, width / 2, height / 2, this.drawW, this.drawH);

    this.box();
    this.text();
  }

  text() {
    let alpha = map(sin(frameCount * 0.09), -1, 1, 50, 255); // oscillate text
    fill(252, 204, 84, alpha);
    textSize(18);
    textAlign(CENTER);
    text("[ CLICK ANYWHERE TO CONTINUE ]", width / 2, height / 6);

    fill('#0A5E79');
    textSize(22);
    textAlign(CENTER);
    textWrap(WORD);
    text(
      `Your goal is simple: hang 10 pieces of clothing on the line without going over the 2000-gram weight limit. Click and drag clothes from the purple basket, then decide whether to hang them on the clothesline or place them on top of the “For Later” basket

Each clothing item has a different weight:
Hoodies — 400g
Pants — 300g
Shirts — 200g
Shorts — 100g

BE CAREFUL when using the “For Later” basket. It can only hold up to 6 items. If you place 6 or more clothes on top of it, you will lose.Keep track of the total weight as you go, and make sure the clothes snap onto the clothesline correctly.

You have 1 minute to finish the game.Think fast, plan your moves, and balance your laundry to win!`,
      width / 2,
      height / 3.3,
      width / 2
    );
  }

  box() { 
    fill(255, 255, 255, 100);
    noStroke();
    rectMode(CENTER);

    // padding of the rectangle around the image
    let paddingX = -180;
    let paddingY = -520;

    // use scaled image size + padding
    rect(width / 2, height / 2, this.drawW + paddingX, this.drawH + paddingY);
  }
}
