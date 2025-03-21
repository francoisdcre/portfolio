document.addEventListener("DOMContentLoaded", function() {
    const menu = document.querySelector('.menu');
    const hamburger = document.querySelector('.hamburger');
    const nav = document.querySelector('nav');
    const navLinks = document.querySelectorAll('nav ul li a');

    // Initialisation du background de .menu
    menu.style.backgroundColor = "var(--background-color-secondary)";

    // Pour chaque lien, on ajoute la classe ml16 et on encapsule chaque lettre dans un <span class="letter">
    navLinks.forEach(link => {
        link.classList.add("ml16");
        link.innerHTML = link.textContent.replace(/\S/g, "<span class='letter'>$&</span>");
    });

    // Fonction qui lance l'animation des lettres avec anime.js
    function animateNavText() {
        anime.timeline({ loop: false })
        .add({
            targets: '.ml16 .letter',
            translateY: [-100, 0],
            easing: "easeOutExpo",
            duration: 1400,
            opacity: [0, 1],
            delay: (el, i) => 30 * i
        });
    }

    hamburger.addEventListener('click', function() {
        if (nav.style.top === "0px") {
            // Masquer la navbar
            nav.style.top = "-100dvh";
            hamburger.classList.remove("is-active");
            menu.style.backgroundColor = "var(--background-color-secondary)";
            nav.classList.remove("active");
        } else {
            // Afficher la navbar et déclencher l'animation
            nav.style.top = "0px";
            hamburger.classList.add("is-active");
            menu.style.backgroundColor = "var(--background-color)";
            nav.classList.add("active");
            animateNavText();
        }
    });
});
