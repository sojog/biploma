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
    let d = dir.mag();
    if (d < 50) {
      dir.setMag(0.9);
      this.vel.lerp(dir, 0.6);
    }
  }
}

// Wrapper section
function scrollRotate() {
  let image1 = document.getElementById("reload1");
  let image2 = document.getElementById("reload2");
  let image3 = document.getElementById("reload3");
  let rotation = window.scrollY / 30;

  if (image1 && image2 && image3) {
    let rotation = window.scrollY / 30;
    image1.style.transform = "translate(-50%, -50%) rotate(" + -rotation + "deg)";
    image2.style.transform = "translate(-50%, -50%) rotate(" + rotation * 2 + "deg)";
    image3.style.transform = "translate(-50%, -50%) rotate(" + -rotation * 3 + "deg)";
  }
}
window.addEventListener('scroll', function () {
  scrollRotate();
});

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
        line.style.backgroundColor = 'var(--color-gold)';
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
  var button = document.createElement("button");
  button.id = "toTopBtn";
  button.title = "Go to top";
  button.innerHTML = `
  <svg height="30px" width="30px" viewBox="0 0 330 330">
        <path d="M325.606,229.393l-150.004-150C172.79,76.58,168.974,75,164.996,75c-3.979,0-7.794,1.581-10.607,4.394
            l-149.996,150c-5.858,5.858-5.858,15.355,0,21.213c5.857,5.857,15.355,5.858,21.213,0l139.39-139.393l139.397,139.393
            C307.322,253.536,311.161,255,315,255c3.839,0,7.678-1.464,10.607-4.394C331.464,244.748,331.464,235.251,325.606,229.393z"/>
    </svg>
`;
  document.body.appendChild(button);

  button.onclick = function() {
      document.body.scrollTop = 0; // For Safari
      document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE, and Opera
  };
})();


// Define toTopScrollFunction outside the IIFE
function toTopScrollFunction() {
  var button = document.getElementById("toTopBtn");
  if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
    button.style.display = "inline-block"; // Show the button
    } else {
        button.style.display = "none"; // Hide the button
    }
}

// Single window.onscroll event handler
window.addEventListener('scroll', function() {
  toTopScrollFunction();
});


// Light & Dark theme
let btn = document.querySelector(".darkmode");

btn.addEventListener("click", () => {
  if (btn.innerHTML === `<i class="fas fa-moon"></i>`) {
    btn.innerHTML = `<i class="fas fa-sun"></i>`;
    btn.style.color = "orange";
    btn.style.backgroundColor = "rgb(43, 43, 43)";
    document.body.classList.add("darkmode");
  } else {
    btn.innerHTML = `<i class="fas fa-moon"></i>`;
    btn.style.color = "black";
    btn.style.backgroundColor = "white";
    document.body.classList.remove("darkmode");
  }
});

