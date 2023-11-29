document.addEventListener("DOMContentLoaded", function () {
    const studentLoginForm = document.getElementById('student-login-form');
    const professorLoginForm = document.getElementById('professor-login-form');
    const studentLoginMessage = document.getElementById('student-login-message');
    const professorLoginMessage = document.getElementById('professor-login-message');

    // Bază de date fictivă cu utilizatori
    const usersDatabase = {
        students: [
            { email: 'student@example.com', password: 'parola123' },
            // Adaugă alți studenți aici
        ],
        professors: [
            { email: 'professor@example.com', password: 'parola456' },
            // Adaugă alți profesori aici
        ],
    };

    // Adaugă un eveniment de submit pe formularul de autentificare pentru studenți
    studentLoginForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const studentEmail = document.getElementById('student-email').value;
        const studentPassword = document.getElementById('student-password').value;

        // Caută studentul în baza de date
        const student = usersDatabase.students.find(user => user.email === studentEmail && user.password === studentPassword);

        if (student) {
            studentLoginMessage.textContent = 'Autentificare reușită pentru studenți!';
            // Poți redirecționa studentul către pagina sa sau face alte acțiuni aici
        } else {
            studentLoginMessage.textContent = 'Autentificare eșuată pentru studenți. Verifică adresa de email și parola.';
        }
    });

    // Adaugă un eveniment de submit pe formularul de autentificare pentru profesori
    professorLoginForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const professorEmail = document.getElementById('professor-email').value;
        const professorPassword = document.getElementById('professor-password').value;

        const professor = usersDatabase.professors.find(user => user.email === professorEmail && user.password === professorPassword);

        if (professor) {
            professorLoginMessage.textContent = 'Autentificare reușită pentru profesori!';
            // Poți redirecționa profesorul către pagina sa sau face alte acțiuni aici
        } else {
            professorLoginMessage.textContent = 'Autentificare eșuată pentru profesori. Verifică adresa de email și parola.';
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
});
    function toggleContent() {
        var hiddenContent = document.getElementById("hidden-content");
        hiddenContent.style.display = (hiddenContent.style.display === "none" || hiddenContent.style.display === "") ? "block" : "none";
    }
    
    document.getElementById("contact-form").addEventListener("submit", function (event) {
        event.preventDefault();
        alert("Formular trimis!");
    });

    function getAnswer(element) {
        // Găsirea elementului răspuns corespunzător întrebării
        let answer = element.nextElementSibling;
    
        // Toggle pentru afișarea/ascunderea răspunsului
        if (answer.style.display === "none") {
            answer.style.display = "block";
        } else {
            answer.style.display = "none";
        }
    }
    const isCanvasSupported = function () {
        var elem = document.createElement('canvas');
        return !!(elem.getContext && elem.getContext('2d'));
    };

    const setupRAF = function () {
        var lastTime = 0;
        var vendors = ['ms', 'moz', 'webkit', 'o'];
        for (var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
            window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
            window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame'] || window[vendors[x] + 'CancelRequestAnimationFrame'];
        }

        if (!window.requestAnimationFrame) {
            window.requestAnimationFrame = function (callback, element) {
                var currTime = new Date().getTime();
                var timeToCall = Math.max(0, 16 - (currTime - lastTime));
                var id = window.setTimeout(function () { callback(currTime + timeToCall); }, timeToCall);
                lastTime = currTime + timeToCall;
                return id;
            };
        }

        if (!window.cancelAnimationFrame) {
            window.cancelAnimationFrame = function (id) {
                clearTimeout(id);
            };
        }
    };

  