const particlesArray = [];

class Particle {
  constructor(brid,canvas, hue) {
    this.x = brid.x;
    this.y = brid.y;
    this.size = Math.random() * 7 + 3;
    this.speedY = (Math.random() * 1) -0.5;
    this.color = `hsla(${hue}, 100%, 50%, 0.8)`;
    this.ctx = canvas.getContext("2d");
  }

  update(gamespeed) {           
    this.x -= gamespeed
    this.y += this.speedY; 
  }
  
  draw() {
    this.ctx.fillStyle = this.color;
    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, this.size, 0 , Math.PI * 2);
    this.ctx.fill();
  }
}

export default function handleParticles(brid, canvas, gamespeed, hue) {
  particlesArray.unshift(new Particle(brid, canvas, hue));
  for(let i = 0; i < particlesArray.length;i++) {
    particlesArray[i].update(gamespeed);
    particlesArray[i].draw();
  }

  if (particlesArray.length > 200) {
    for(let i = 0; i < 20; i ++ ) {
      particlesArray.pop(particlesArray[i]);
    }
  }
}