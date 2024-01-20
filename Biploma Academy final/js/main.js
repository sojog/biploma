(function ($) {
    "use strict";


    var elevator = new Elevator({
        element: document.getElementById('elevatorBtn'),
      });

// Adăugăm clasa "animated" după încărcarea paginii pentru a declanșa animația
document.addEventListener('DOMContentLoaded', function () {
    const courses = document.querySelectorAll('.course');
    courses.forEach(course => {
        course.classList.add('animated');
    });
});


  $(document).ready(function () {
    var topBar = $(".top-bar");

    $(window).scroll(function () {
      if ($(this).scrollTop() > 50) {
        topBar.addClass("navbar-scroll");
      } else {
        topBar.removeClass("navbar-scroll");
      }
    });
  });


  
})(jQuery);





<script>
new WOW().init();
</script>