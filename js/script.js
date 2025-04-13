document.addEventListener("DOMContentLoaded", function () {
    document.body.style.overflow = "hidden";

    setTimeout(function () {
        let welcomeScreen = document.getElementById("welcome-screen");

        welcomeScreen.style.transform = "translateY(-100%)";
        welcomeScreen.style.opacity = "0";

        setTimeout(() => {
            welcomeScreen.style.display = "none";
            document.getElementById("main-content").style.display = "flex";

            document.body.style.overflow = "";
        }, 1000);
    }, 1000);
});
