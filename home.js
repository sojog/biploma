// Particle background
let particles = [];

function setup() {
  let canvas = createCanvas(windowWidth, windowHeight); // Set the height to match the viewport
  canvas.parent(document.querySelector('.particle-container'));
  let particlesLength = Math.min(windowWidth / 3, 160); // Adjust the density of the particles here
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
    this.vel = createVector(random(-0.1, 0.1), random(-0.3, 0.3));
    this.size = 10;
  }

  update() {
    this.attractToMouse();
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
  attractToMouse() {
    let mouse = createVector(mouseX, mouseY);
    let dir = p5.Vector.sub(mouse, this.pos);
    let d = dir.mag(); // Get the distance to the mouse

    if (d < 50) { // Check if the distance is less than 50 pixels
      dir.setMag(0.9); // Set speed
      this.vel.lerp(dir, 0.6); // Adjust velocity towards the mouse
    }
  }
}

//Wrapper section

window.onscroll = function () {
    scrollRotate();
};

function scrollRotate() {
    let image1 = document.getElementById("reload1");
    let image2 = document.getElementById("reload2");
    let image3 = document.getElementById("reload3");
    let rotation = window.scrollY / 30;
image1.style.transform =
    "translate(-50%, -50%) rotate(" + -rotation + "deg)";
image2.style.transform =
    "translate(-50%, -50%) rotate(" + rotation * 2 + "deg)";
image3.style.transform =
    "translate(-50%, -50%) rotate(" + -rotation * 3 + "deg)";
}




// JavaScript to toggle the menu
function toggleMenu() {
  var menuIcon = document.querySelector('.menu-icon');
  var navbarLinks = document.querySelector('.navbar-links');
  menuIcon.classList.toggle('change');
  navbarLinks.classList.toggle('change');
}

// Close the menu when a link is clicked (for mobile view)
document.querySelectorAll('.navbar-links a').forEach(link => {
  link.addEventListener('click', () => {
    if (window.innerWidth <= 768) {
      toggleMenu();
    }
  });
});


// Wait for the DOM to load
document.addEventListener('DOMContentLoaded', function () {
  const optionLinks = document.querySelectorAll('.option-link');

  optionLinks.forEach(link => {
    link.addEventListener('click', function () {
      // Remove any existing lines from the document
      const existingLines = document.querySelectorAll('.connection-line');
      existingLines.forEach(line => line.remove());

      // Hide all sections
      const sections = document.querySelectorAll('.certiblock-schools, .certiblock-organisations, .certiblock-individuals');
      sections.forEach(section => section.classList.remove('visible'));

      // Show the clicked section
      const target = this.getAttribute('data-target');
      const targetSection = document.getElementById(target) || document.querySelector('.' + target);
      targetSection.classList.add('visible');

      // Add a line connecting the link to the section if it is not already visible
      if (!targetSection.querySelector('.connection-line')) {
        const line = document.createElement('div');
        line.className = 'connection-line';
        line.style.position = 'absolute';
        line.style.top = this.offsetTop + this.offsetHeight + 'px'; // Position at the bottom of the link
        line.style.left = this.offsetLeft + (this.offsetWidth / 2) + 'px'; // Center horizontally
        line.style.width = '2px'; // Line thickness
        line.style.height = (targetSection.offsetTop - this.offsetTop - this.offsetHeight) + 'px'; // Line height
        line.style.backgroundColor = 'var(--color-accent-gold)'; // Line color
        document.body.appendChild(line); // Add the line to the body
      }
    });
  });
});

