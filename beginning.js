class Beginning {
  constructor(img) {
    this.img = img;
  }
  
  display() {
    if (!this.img) return;

    imageMode(CENTER);

    // scale the image to fit screen while keeping aspect ratio
    let scaleFactor = min(width / this.img.width, height / this.img.height);
    let drawW = this.img.width * scaleFactor;
    let drawH = this.img.height * scaleFactor;

    image(this.img, width / 2, height / 2, drawW, drawH);
  }

  text() { // Press enter to play text
   let alpha = map(sin(frameCount * 0.09), -1, 1, 50, 255); // alpha oscillates between 50 and 255
    fill(252, 204, 84, alpha);
    textAlign(CENTER);
    textSize(18);
    text(" [PRESS ENTER TO PLAY ]", width / 2, height / 6);
   }
}
