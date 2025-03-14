// Wrap every letter in a span
var textWrapper = document.querySelector('.ml11 .letters');
textWrapper.innerHTML = textWrapper.textContent.replace(/([^\x00-\x80]|\w)/g, "<span class='letter'>$&</span>");

// Attendre 5 secondes avant de lancer l'animation
setTimeout(() => {
    anime.timeline()
    .add({
        targets: '.ml11 .line',
        scaleY: [0,1],
        opacity: [0.5,1],
        easing: "easeOutExpo",
        duration: 700
    })
    .add({
        targets: '.ml11 .line',
        translateX: [0, document.querySelector('.ml11 .letters').getBoundingClientRect().width + 10],
        easing: "easeOutExpo",
        duration: 700,
        delay: 100
    })
    .add({
        targets: '.ml11 .letter',
        opacity: [0,1],  // ⚡️ Rendre les lettres visibles progressivement
        easing: "easeOutExpo",
        duration: 600,
        offset: '-=775',
        delay: (el, i) => 34 * (i+1)
    })
    .add({
        targets: '.ml11 .line', // 🎯 Fait disparaître la ligne avec fondu
        opacity: [1, 0], 
        easing: "easeOutExpo",
        duration: 600,
        delay: 500,
        complete: function(anim) {
            document.querySelector('.ml11 .line').style.display = "none"; // Cache complètement après le fondu
        }
    });
}, 3000); // ⏳ Attendre 5 secondes avant de démarrer l'animation
