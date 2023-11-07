// Obține elementele HTML cu JavaScript
const loginForm = document.getElementById('login-form');
const loginMessage = document.getElementById('login-message');

// Definim o bază de date fictivă cu utilizatori
const usersDatabase = [
    { email: 'student@example.com', password: 'parola123' },
    // Adaugă alți utilizatori aici
];

// Adaugă un eveniment de submit pe formular
loginForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Caută utilizatorul în baza de date
    const user = usersDatabase.find(user => user.email === email && user.password === password);

    if (user) {
        loginMessage.textContent = 'Autentificare reușită!';
        // Poți redirecționa utilizatorul către pagina sa de student sau face alte acțiuni aici
    } else {
        loginMessage.textContent = 'Autentificare eșuată. Verifică adresa de email și parola.';
    }
});
document.addEventListener("DOMContentLoaded", function () {
  const backgroundLink = document.getElementById("background-link");
  const logoLink = document.getElementById("logo-link");

  backgroundLink.addEventListener("click", function (event) {
      event.preventDefault();
      window.location.href = backgroundLink.href;
  });

  logoLink.addEventListener("click", function (event) {
      event.preventDefault();
      window.location.href = logoLink.href;
  });
});
document.addEventListener("DOMContentLoaded", function () {
    const contactLink = document.querySelector(".menu-item a[href='#contact']");
    const contactFooter = document.getElementById("contact-footer");
  
    contactLink.addEventListener("click", function (event) {
      event.preventDefault();
      contactFooter.scrollIntoView({ behavior: "smooth" });
    });
  });