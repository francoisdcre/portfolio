gsap.registerPlugin(ScrollTrigger);

// Box about animé

gsap.from('.box', {
    scrollTrigger: {
        trigger: '#about',
        start: 'top 20%',
        toggleActions: 'play none none reverse',
    },
    opacity: 0,
    stagger: 0.1,
    y: 300,
    duration: 1,
    ease: 'power.out',
});

// Texte animé

const animatedTexts = document.querySelectorAll('.animated-text');

animatedTexts.forEach((el, index) => {
    const letters = el.textContent.split('');
    el.innerHTML = '';

    letters.forEach(letter => {
        const span = document.createElement('span');
        // Gestion des espaces
        if (letter === ' ') {
        span.innerHTML = '&nbsp;'; // espace insécable
        } else {
        span.textContent = letter;
        }
        span.style.display = 'inline-block';
        el.appendChild(span);
    });

    gsap.from(el.querySelectorAll('span'), {
        scrollTrigger: {
            trigger: el,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
        },
        y: 50,
        opacity: 0,
        stagger: 0.03,
        duration: 0.6,
        ease: 'power.out',
        delay: index * 0.2
    });
});

// Parcours

// Animation de la section Parcours
gsap.from('.timeline-header', {
    scrollTrigger: {
        trigger: '#parcours',
        start: 'top 20%',
        toggleActions: 'play none none reverse',
    },
    opacity: 0,
    y: 50,
    duration: 0.8,
    ease: 'power.out',
});

// Animation pour les éléments de la timeline
gsap.utils.toArray('.timeline-item').forEach((item, i) => {
    const direction = item.classList.contains('left') ? -1 : 1;
    
    gsap.from(item, {
        scrollTrigger: {
            trigger: item,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
        },
        opacity: 0,
        x: 50 * direction,
        duration: 0.8,
        ease: 'power.out',
        delay: i * 0.2
    });
});

// Animation pour les cercles de la timeline
gsap.from('.timeline-item::after', {
    scrollTrigger: {
        trigger: '.timeline',
        start: 'top 70%',
        toggleActions: 'play none none reverse',
    },
    scale: 0,
    stagger: 0.2,
    duration: 0.6,
    ease: 'back.out(1.7)',
});

// Compétences

gsap.from(".hero", {
    scrollTrigger: {
        trigger: "#competences",
        start: "top 20%",
      toggleActions: "play none none reverse" // Se joue une seule fois
    },
    y: 300,
    opacity: 0,
    duration: 1,
    ease: "power.out"
});

// Animation en cascade pour .competence-box
gsap.fromTo(".competence-box",{
        opacity: 0,
        y: 50
    },
    {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: "power.out",
        stagger: 0.2,
        scrollTrigger: {
            trigger: "#competences",
            start: "top 20%",
            toggleActions: "play none none reverse"
        }
    }
);