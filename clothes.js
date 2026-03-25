class Cloth {
  constructor(x, y, img, index) {
  this.x = x;
  this.y = y;
  this.img = img;
  this.size = 120;

  this.dragging = false;
  this.offsetX = 0;
  this.offsetY = 0;

  if (index === 0) this.weight = 200;
  else if (index === 1) this.weight = 300;
  else if (index === 2) this.weight = 400;
  else if (index === 3) this.weight = 100;
  }

  update() {
  if (this.dragging) {
    this.x = mouseX + this.offsetX;
    this.y = mouseY + this.offsetY;
  }
}

  display() {
    imageMode(CENTER);
    image(this.img, this.x, this.y, this.size, this.size);
  }

  pressed(mx, my) {
  let half = this.size / 2;

  if (
    mx > this.x - half &&
    mx < this.x + half &&
    my > this.y - half &&
    my < this.y + half
  ) {
    this.dragging = true;

    this.offsetX = this.x - mx;
    this.offsetY = this.y - my;
  }
}

  released() {
    this.dragging = false;
  }
}