document.addEventListener("DOMContentLoaded", function () {
    // Bloque le scroll tant que la fenêtre de bienvenue est affichée
    document.body.style.overflow = "hidden";

    setTimeout(function () {
        let welcomeScreen = document.getElementById("welcome-screen");

        // Appliquer l'animation vers le haut
        welcomeScreen.style.transform = "translateY(-100%)";
        welcomeScreen.style.opacity = "0";

        setTimeout(() => {
            welcomeScreen.style.display = "none";
            document.getElementById("main-content").style.display = "flex";

            // Réactive le scroll une fois l'écran de bienvenue terminé
            document.body.style.overflow = "";
        }, 1000); // Temps pour la transition
    }, 3000); // Durée d'affichage initiale
});
