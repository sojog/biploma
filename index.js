
//Wrapper section
//This is the main javascript file for the wrapper

window.onscroll = function () {
    scrollRotate();
};

function scrollRotate() {
    let image1 = document.getElementById("reload1");
    let image2 = document.getElementById("reload2");
    let image3 = document.getElementById("reload3");
    let rotation = window.scrollY / 70;
image1.style.transform =
    "translate(-50%, -50%) rotate(" + -rotation + "deg)";
image2.style.transform =
    "translate(-50%, -50%) rotate(" + rotation * 2 + "deg)";
image3.style.transform =
    "translate(-50%, -50%) rotate(" + -rotation * 3 + "deg)";
}


// Particle JS
// This is the main javascript file for the particle background

let particles = [];

function setup() {
  let canvas = createCanvas(windowWidth, windowHeight); // Set the height to match the viewport
  canvas.parent('particle-container'); // This will attach the canvas to your div
  let particlesLength = Math.min(windowWidth / 10, 100); // Adjust the density of the particles here
  for (let i = 0; i < particlesLength; i++) {
    particles.push(new Particle());
  }
}


  function windowResized() {
    resizeCanvas(windowWidth, windowHeight); // Resize the canvas when the window is resized
}

  
function draw() {
  background(21, 8, 50);
  particles.forEach((p, index) => {
    p.update();
    p.draw();
    p.checkParticles(particles.slice(index));
  });
}

class Particle {
  constructor() {
    this.pos = createVector(random(width), random(height));
    this.vel = createVector(random(-0.5, 0.5), random(-0.3, 0.3));
    this.size = 10;
  }

  update() {
    this.pos.add(this.vel);
    this.edges();
  }

  draw() {
    noStroke();
    fill('rgba(255, 255, 211, 0.9)');
    circle(this.pos.x, this.pos.y, this.size);
  }

  edges() {
    if (this.pos.x < 0 || this.pos.x > width) {
      this.vel.x *= -1;
    }

    if (this.pos.y < 0 || this.pos.y > height) {
      this.vel.y *= -1;
    }
  }

  checkParticles(particles) {
    particles.forEach(particle => {
      const d = dist(this.pos.x, this.pos.y, particle.pos.x, particle.pos.y);
      if (d < 120) {
        stroke('rgba(255,255,255,0.5)');
        line(this.pos.x, this.pos.y, particle.pos.x, particle.pos.y);
      }
    });
  }
}