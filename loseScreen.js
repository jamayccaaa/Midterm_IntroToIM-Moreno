class LoseScreen {
  constructor(img,resetIcon) {
    this.img = img;

    this.buttonSetting = {
      padding: 185,
      size: 130
    };

    this.resetButton = new Button({ 
      img: resetIcon || null,
      x: 0,
      y: 0,
      size: this.buttonSetting.size
    });
  }

  display() {
    if (!this.img) return;

    imageMode(CENTER); // 'try again' image

    let scale = min(width / this.img.width, height / this.img.height);
    let w = this.img.width * scale;
    let h = this.img.height * scale;

    image(this.img, width / 2, height / 2, w, h);

   let baseX = this.buttonSetting.padding;
   let baseY = height - this.buttonSetting.padding;

   // position reset button
   this.resetButton.x = baseX + this.buttonSetting.size / 0.75;
   this.resetButton.y = baseY - this.buttonSetting.size / -7;

   // display reset button
   this.resetButton.display();
   }
  }
