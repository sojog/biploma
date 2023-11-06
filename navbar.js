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
  