const loginForm = document.getElementById('login-form');
const loginMessage = document.getElementById('login-message');

// Defining a database
const usersDatabase = [
    { email: 'student@example.com', password: 'password123' },
    // Adding users
];

// Adding a submit function on the form
loginForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Search the user in the database
    const user = usersDatabase.find(user => user.email === email && user.password === password);

    if (user) {
        loginMessage.textContent = 'Login successful!';
        // Poți redirecționa utilizatorul către pagina sa de student sau face alte acțiuni aici
    } else {
        loginMessage.textContent = 'Login failed. Please verify your login credentials';
    }
});
document.addEventListener("DOMContentLoaded", function () {
  const backgroundLink = document.getElementById("background-link");

  backgroundLink.addEventListener("click", function (event) {
      event.preventDefault();
      window.location.href = backgroundLink.href;
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