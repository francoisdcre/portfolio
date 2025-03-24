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
        
        // Trouver les éléments à cacher et à montrer
        const toHide = Array.from(boxes).filter(box => 
            !(filter === "all" || box.getAttribute("data-category") === filter)
        );
        
        const toShow = Array.from(boxes).filter(box => 
            (filter === "all" || box.getAttribute("data-category") === filter)
        );

        // Animation en deux étapes
        const tl = gsap.timeline({
            onComplete: () => { isAnimating = false; }
        });

        // Étape 1: Masquer les éléments avec animation
        if (toHide.length > 0) {
            tl.to(toHide, {
                scale: 0.8,
                opacity: 0,
                y: 20,
                duration: 0.3,
                stagger: 0.05,
                ease: "power2.out",
                onComplete: () => {
                    toHide.forEach(box => box.style.display = "none");
                }
            });
        }

        // Étape 2: Afficher les éléments avec animation
        if (toShow.length > 0) {
            // D'abord s'assurer qu'ils sont visibles dans le DOM
            toShow.forEach(box => {
                if (box.style.display === "none") {
                    box.style.display = "flex";
                    gsap.set(box, { opacity: 0, scale: 0.8, y: 20 });
                }
            });

            // Animation des éléments à montrer
            tl.to(toShow, {
                scale: 1,
                opacity: 1, 
                y: 0,
                duration: 0.4,
                stagger: 0.08,
                ease: "back.out(1.2)",
                clearProps: "all" // Pour éviter les styles inline qui pourraient causer des problèmes
            }, toHide.length > 0 ? "-=0.1" : 0); // Chevaucher légèrement avec l'animation précédente
        }
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
