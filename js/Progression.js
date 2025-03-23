document.addEventListener('DOMContentLoaded', function() {
    // Sélection des éléments
    const progressIndicator = document.querySelector('.progress-indicator');
    const sectionDots = document.querySelectorAll('.section-dot');
    const sections = document.querySelectorAll('section, header');

    // Fonction pour mettre à jour la barre de progression
    function updateProgressBar() {
        // Calculer la progression totale du scroll
        const scrollTop = window.scrollY;
        const docHeight = document.body.offsetHeight - window.innerHeight;
        const scrollProgress = (scrollTop / docHeight) * 100;
        
        // Mettre à jour la hauteur de l'indicateur de progression
        progressIndicator.style.height = `${scrollProgress}%`;
        
        // Déterminer la section active
        let currentSectionId = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            
            if (scrollTop >= sectionTop - window.innerHeight / 3 && 
                scrollTop < sectionTop + sectionHeight - window.innerHeight / 3) {
                currentSectionId = section.id;
            }
        });
        
        // Mettre à jour l'état actif des points
        sectionDots.forEach(dot => {
            const dotSection = dot.getAttribute('data-section');
            if (dotSection === currentSectionId) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    }
    
    // Ajouter l'événement de défilement
    window.addEventListener('scroll', updateProgressBar);
    
    // Initialiser la barre de progression
    updateProgressBar();
    
    // Ajouter un défilement fluide lors du clic sur les points
    sectionDots.forEach(dot => {
        dot.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            window.scrollTo({
                top: targetSection.offsetTop,
                behavior: 'smooth'
            });
        });
    });
});
