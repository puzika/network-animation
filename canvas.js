'use strict';

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
const particlesArray = [];

canvas.height = window.innerHeight;
canvas.width = window.innerWidth;

window.addEventListener('resize', () => {
   canvas.width = window.innerWidth;
   canvas.height = window.innerHeight;
})

//get mouse position

const mouse = {
   x: null,
   y: null,
   radius: (canvas.height / 80) * (canvas.width / 80),
};

class Particle {
   constructor(x, y, dx, dy, size, color) {
      this.x = x;
      this.y = y;
      this.dx = dx;
      this.dy = dy;
      this.size = size;
      this.color = color;
   }

   draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
      ctx.fillStyle = this.color;
      ctx.fill();
   }

   update() {
      if (this.x > canvas.width || this.x < 0) this.dx = -this.dx;
      if (this.y > canvas.height || this.y < 0) this.dy = -this.dy;

      this.x += this.dx;
      this.y += this.dy;

      this.draw();
   }
}

function init() {
   const numberOfParticle = (canvas.width * canvas.height) / 5000;

   for (let i = 0; i < numberOfParticle; i++) {
      const size = Math.random() * 5 + 1;
      const x = (Math.random() * (innerWidth - size * 2) + size * 2);
      const y = (Math.random() * (innerHeight - size * 2) + size * 2);
      const dx = Math.random() * 4 - 2;
      const dy = Math.random() * 4 - 2;
      const color = 'rgb(66, 148, 255)';

      const p = new Particle(x, y, dx, dy, size, color);
      particlesArray.push(p);
   }
}

function connect() {
   for (let i = 0; i < particlesArray.length; i++) {
      for (let j = i + 1; j < particlesArray.length; j++) {
         let dist = Math.sqrt((particlesArray[i].x - particlesArray[j].x) ** 2 + (particlesArray[i].y - particlesArray[j].y) ** 2);

         if (dist < (canvas.width * canvas.height) / 10000) {
            const opacity = 1 - dist / 100;
            ctx.strokeStyle = `rgba(66, 148, 255, ${opacity})`;
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.moveTo(particlesArray[i].x, particlesArray[i].y);
            ctx.lineTo(particlesArray[j].x, particlesArray[j].y);
            ctx.stroke();
         }
      }
   }
}

function animate() {
   requestAnimationFrame(animate);
   ctx.clearRect(0, 0, canvas.width, canvas.height);

   for (let i = 0; i < particlesArray.length; i++) particlesArray[i].update();

   connect();
}

init();
animate();