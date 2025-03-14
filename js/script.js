document.addEventListener("DOMContentLoaded", function () {
    setTimeout(function () {
        let welcomeScreen = document.getElementById("welcome-screen");

        // Appliquer l'animation vers le haut
        welcomeScreen.style.transform = "translateY(-100%)";
        welcomeScreen.style.opacity = "0"; // Ajouté pour plus de fluidité

        setTimeout(() => {
            welcomeScreen.style.display = "none"; // Cache après l'animation
            document.getElementById("main-content").style.display = "flex";
        }, 1000); // Délai pour la transition
    }, 2000); // Affiché pendant 5 secondes
});
