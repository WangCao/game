class Bird {
  constructor(canvas) {
    this.x = 150;
    this.y = 200;
    this.vy = 0; // 垂直速度
    this.width = 20;
    this.height = 20;
    this.weight = 1;
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
  }

  update(spacePressed, angle) {
    let curve = Math.sin(angle) * 20;
    if (this.y > this.canvas.height - this.height * 3 + curve) {
      this.y = this.canvas.height - this.height * 3 + curve;
      this.vy = 0;
    }else {
      this.vy += this.weight;
      this.vy *= 0.9;
      this.y += this.vy;
    }

    if(this.y < 0 + this.height) {
      this.y = 0 + this.height;
      this.vy = 0;
    }

    if (spacePressed && this.y > this.height * 3) {
      this.flap();
    } 
  }

  draw() {
    this.ctx.fillStyle = 'red';
    this.ctx.fillRect(this.x, this.y, this.width, this.height);
  }

  flap() {
    this.vy -= 2;
  }
}

export default Bird;
