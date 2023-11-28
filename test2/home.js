// Particle background
let particles = [];

function setup() {
  let canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent(document.querySelector('.particle-container'));
  let particlesLength = Math.min(windowWidth / 3, 160);
  for (let i = 0; i < particlesLength; i++) {
    particles.push(new Particle());
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function draw() {
  background(0, 0, 10);
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
    let d = dir.mag();
    if (d < 50) {
      dir.setMag(0.9);
      this.vel.lerp(dir, 0.6);
    }
  }
}

// Define toTopScrollFunction outside the IIFE
function toTopScrollFunction() {
  let mybutton = document.getElementById("toTopBtn");
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
      mybutton.style.display = "block";
  } else {
      mybutton.style.display = "none";
  }
}

// Single window.onscroll event handler
window.onscroll = function() {
  toTopScrollFunction();
  scrollRotate();
};

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
      const existingLines = document.querySelectorAll('.connection-line');
      existingLines.forEach(line => line.remove());

      const sections = document.querySelectorAll('.certiblock-schools, .certiblock-organisations, .certiblock-individuals');
      sections.forEach(section => section.classList.remove('visible'));

      const target = this.getAttribute('data-target');
      const targetSection = document.getElementById(target) || document.querySelector('.' + target);
      targetSection.classList.add('visible');

      if (!targetSection.querySelector('.connection-line')) {
        const line = document.createElement('div');
        line.className = 'connection-line';
        line.style.position = 'absolute';
        line.style.top = this.offsetTop + this.offsetHeight + 'px';
        line.style.left = this.offsetLeft + (this.offsetWidth / 2) + 'px';
        line.style.width = '2px';
        line.style.height = (targetSection.offsetTop - this.offsetTop - this.offsetHeight) + 'px';
        line.style.backgroundColor = 'var(--color-accent-gold)';
        document.body.appendChild(line);
      }
    });
  });
});


// Reveal phone number
function revealNumber(event, element) {
  if (!element.classList.contains('revealed')) {
      event.preventDefault();
      element.classList.add('revealed');
  }
}

// To Top arrow
(function() {
  var css = `
      #toTopBtn {
          position: fixed;
          bottom: 20px;
          right: 30px;
          z-index: 99;
          font-size: 22px;
          font-weight: bold;
          border: none;
          outline: none;
          background-color: rgba(0, 0, 0, 0.5);
          color: var(--color-accent-gold);
          cursor: pointer;
          padding: 5px 12px 5px 12px;
          border-radius: 10px;
          display: none;
          border: var(--color-accent-gold) solid 1px;
      }
      #toTopBtn:hover {
          background-color: rgba(0, 0, 0, 0.8);
      }
  `;


  var styleSheet = document.createElement("style");
  styleSheet.type = "text/css";
  styleSheet.innerText = css;
  document.head.appendChild(styleSheet);

  var button = document.createElement("button");
  button.id = "toTopBtn";
  button.title = "Go to top";
  button.innerHTML = "↑";
  document.body.appendChild(button);

  button.onclick = function() {
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
  };
});


