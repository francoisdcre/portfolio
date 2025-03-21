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
    y: 200,
    duration: 1,
    ease: 'power2.out',
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
        ease: 'power2.out',
        delay: index * 0.2
    });
});
