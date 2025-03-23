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

    // Fonction pour ouvrir la navbar
    function openNav() {
        nav.style.top = "0px";
        hamburger.classList.add("is-active");
        menu.style.backgroundColor = "var(--background-color)";
        nav.classList.add("active");
        document.body.style.overflow = "hidden"; // Empêche le scroll
        animateNavText();
    }

    // Fonction pour fermer la navbar
    function closeNav() {
        nav.style.top = "-150%";
        hamburger.classList.remove("is-active");
        menu.style.backgroundColor = "var(--background-color-secondary)";
        nav.classList.remove("active");
        document.body.style.overflow = ""; // Réactive le scroll
    }

    // Clic sur le hamburger
    hamburger.addEventListener('click', function() {
        if (nav.classList.contains("active")) {
            closeNav();
        } else {
            openNav();
        }
    });

    // Clic sur un lien => fermeture du menu
    navLinks.forEach(link => {
        link.addEventListener("click", () => {
            closeNav();
        });
    });
});
