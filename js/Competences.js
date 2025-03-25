// Script de filtrage des compétences
document.addEventListener("DOMContentLoaded", function () {
    const buttons = document.querySelectorAll(".filter-btn");
    const boxes = document.querySelectorAll(".competence-box");

    // Count competences in each category
    const categoryCount = {
        all: boxes.length,
        "front-end": 0,
        "back-end": 0,
        outils: 0,
    };

    // Count items in each category
    boxes.forEach((box) => {
        const category = box.getAttribute("data-category");
        if (categoryCount.hasOwnProperty(category)) {
            categoryCount[category]++;
        }
    });

    // Add count badges to filter buttons
    buttons.forEach((btn) => {
        const filter = btn.getAttribute("data-filter");
        if (categoryCount.hasOwnProperty(filter)) {
            const countSpan = document.createElement("span");
            countSpan.className = "count";
            countSpan.textContent = categoryCount[filter];
            btn.appendChild(countSpan);
        }
    });

    // Variable pour éviter les animations multiples
    let isAnimating = false;
    let isFirstLoad = true;

    buttons.forEach((btn) => {
        btn.addEventListener("click", function () {
            if (isAnimating) return;
            
            const filter = this.getAttribute("data-filter");

            // Mise à jour du bouton actif
            buttons.forEach((b) => b.classList.remove("active"));
            this.classList.add("active");

            // Animation avec GSAP seulement si ce n'est pas le premier chargement
            if (!isFirstLoad) {
                filterWithGSAP(filter);
            } else {
                // Premier chargement: juste afficher les éléments sans animation
                boxes.forEach((box) => {
                    if (filter === "all" || box.getAttribute("data-category") === filter) {
                        box.style.display = "flex";
                    } else {
                        box.style.display = "none";
                    }
                });
                isFirstLoad = false;
            }
        });
    });

    function filterWithGSAP(filter) {
        isAnimating = true;
        
        // Trouver les éléments à montrer après la transition
        const toShow = Array.from(boxes).filter(box => 
            (filter === "all" || box.getAttribute("data-category") === filter)
        );
        
        // Animation en deux phases distinctes
        const tl = gsap.timeline({
            onComplete: () => { isAnimating = false; }
        });

        // Phase 1: Faire disparaître TOUS les éléments
        tl.to(boxes, {
            scale: 0.8,
            opacity: 0,
            y: 20,
            duration: 0.3,
            stagger: 0.03,
            ease: "power2.out",
            onComplete: function() {
                // Masquer tous les éléments
                boxes.forEach(box => {
                    box.style.display = "none";
                });
                
                // Préparer uniquement les éléments qui doivent être affichés
                toShow.forEach(box => {
                    box.style.display = "flex";
                    gsap.set(box, { opacity: 0, scale: 0.8, y: 20 });
                });
            }
        });

        // Phase 2: Faire apparaître uniquement les éléments filtrés
        tl.to(toShow, {
            scale: 1,
            opacity: 1, 
            y: 0,
            duration: 0.4,
            stagger: 0.08,
            ease: "back.out(1.2)",
            clearProps: "all"
        }, "+=0.1"); // Petit délai avant l'apparition pour créer une séparation entre les phases
        
        return tl;
    }

    // Initialiser avec le filtre "all" sans animation au chargement initial
    document.querySelector('.filter-btn[data-filter="all"]').classList.add('active');
    
    // Si l'utilisateur clique sur un filtre avant que l'animation initiale soit terminée,
    // on désactive le mode "premier chargement"
    document.addEventListener('scroll', function() {
        if (isFirstLoad) {
            isFirstLoad = false;
        }
    }, { once: true });
});
