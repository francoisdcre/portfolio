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
        if (letter === ' ') {
        span.innerHTML = '&nbsp;';
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
        start: "top 60%",
        toggleActions: "play none none reverse"
    },
    y: 300,
    opacity: 0,
    duration: 1,
    ease: "power.out"
});

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
            start: "top 60%",
            toggleActions: "play none none reverse"
        }
    }
);

// Veille

gsap.from('.veille-intro', {
    scrollTrigger: {
        trigger: '#veille',
        start: 'top 60%',
        toggleActions: 'play none none reverse',
    },
    y: 50,
    opacity: 0,
    duration: 0.8,
    ease: 'power2.out',
    clearProps: 'all'
});

gsap.from('.framework-card', {
    scrollTrigger: {
        trigger: '.framework-timeline',
        start: 'top 70%',
        toggleActions: 'play none none reverse',
    },
    opacity: 0,
    stagger: 0.1,
    duration: 0.7,
    ease: 'back.out(1.2)',
    clearProps: 'transform,opacity,scale' // Permet aux hovers de fonctionner une fois l'animation terminée
});

gsap.from('.source-item', {
    scrollTrigger: {
        trigger: '.veille-sources',
        start: 'top 75%',
        toggleActions: 'play none none reverse',
    },
    scale: 0.8,
    opacity: 0,
    stagger: 0.15,
    duration: 0.6,
    ease: 'power1.out',
    clearProps: 'transform,opacity,scale' // Permet aux hovers de fonctionner une fois l'animation terminée
});

gsap.utils.toArray('.comparison-card').forEach((card, i) => {
    gsap.from(card, {
        scrollTrigger: {
            trigger: card,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
        },
        x: i % 2 === 0 ? -50 : 50,
        opacity: 0,
        duration: 0.8,
        delay: i * 0.2,
        ease: 'power2.out',
        clearProps: 'transform,opacity,x' // Permet aux hovers de fonctionner une fois l'animation terminée
    });
});

gsap.utils.toArray('.comparison-table tbody tr').forEach((row, i) => {
    gsap.from(row, {
        scrollTrigger: {
            trigger: row.closest('.comparison-card'),
            start: 'top 75%',
            toggleActions: 'play none none reverse',
        },
        opacity: 0,
        y: 20,
        duration: 0.4,
        delay: i * 0.1 + 0.4,
        ease: 'power1.out',
        clearProps: 'transform,opacity,y' // Permet aux hovers de fonctionner une fois l'animation terminée
    });
});

gsap.from('.veille-conclusion', {
    scrollTrigger: {
        trigger: '.veille-conclusion',
        start: 'top 80%',
        toggleActions: 'play none none reverse',
    },
    y: 40,
    opacity: 0,
    duration: 0.9,
    ease: 'power2.out',
    clearProps: 'all'
});

// Contact

gsap.from('.contact-intro', {
    scrollTrigger: {
        trigger: '#contact',
        start: 'top 70%',
        toggleActions: 'play none none reverse',
    },
    y: 40,
    opacity: 0,
    duration: 0.8,
    ease: 'power2.out',
    clearProps: 'all'
});

gsap.from('.contact-form-card', {
    scrollTrigger: {
        trigger: '.contact-form-wrapper',
        start: 'top 75%',
        toggleActions: 'play none none reverse',
    },
    scale: 0.9,
    opacity: 0,
    duration: 0.8,
    ease: 'back.out(1.4)',
    clearProps: 'transform,opacity,scale'
});

// Animation séquentielle des éléments du formulaire
gsap.utils.toArray('.form-group').forEach((group, i) => {
    gsap.from(group, {
        scrollTrigger: {
            trigger: '.contact-form-card',
            start: 'top 70%',
            toggleActions: 'play none none reverse',
        },
        opacity: 0,
        x: i % 2 === 0 ? -20 : 20,
        duration: 0.6,
        delay: 0.3 + (i * 0.15),
        ease: 'power2.out',
        clearProps: 'all'
    });
});

// Animation spéciale pour le bouton d'envoi
gsap.from('.submit-btn', {
    scrollTrigger: {
        trigger: '.contact-form-card',
        start: 'top 70%',
        toggleActions: 'play none none reverse',
    },
    opacity: 0,
    y: 20,
    scale: 0.8,
    duration: 0.7,
    delay: 0.9,
    ease: 'elastic.out(1, 0.5)',
    clearProps: 'transform,opacity,scale'
});

// Animation pour l'icône du bouton d'envoi
gsap.to('.submit-btn i', {
    scrollTrigger: {
        trigger: '.contact-form-card',
        start: 'top 70%',
        toggleActions: 'play none none none',
    },
    x: 5,
    duration: 0.5,
    delay: 1.3,
    repeat: 1,
    yoyo: true,
    ease: 'power2.inOut'
});
