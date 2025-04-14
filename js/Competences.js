document.addEventListener("DOMContentLoaded", function () {
    const buttons = document.querySelectorAll(".filter-btn");
    const boxes = document.querySelectorAll(".competence-box");
    const certificationBoxes = document.querySelectorAll(".competence-box[data-category='certifications']");
    const nonCertificationBoxes = document.querySelectorAll(".competence-box:not([data-category='certifications'])");

    const categoryCount = {
        all: nonCertificationBoxes.length, // Modifier pour ne compter que les éléments non-certification
        "front-end": 0,
        "back-end": 0,
        outils: 0,
        certifications: 0,
    };

    boxes.forEach((box) => {
        const category = box.getAttribute("data-category");
        if (categoryCount.hasOwnProperty(category)) {
            categoryCount[category]++;
        }
    });

    buttons.forEach((btn) => {
        const filter = btn.getAttribute("data-filter");
        if (categoryCount.hasOwnProperty(filter)) {
            const countSpan = document.createElement("span");
            countSpan.className = "count";
            countSpan.textContent = categoryCount[filter];
            btn.appendChild(countSpan);
        }
    });

    let isAnimating = false;
    let isFirstLoad = true;

    // Masquer les certifications au chargement initial
    certificationBoxes.forEach(box => {
        box.style.display = "none";
    });

    buttons.forEach((btn) => {
        btn.addEventListener("click", function () {
            if (isAnimating) return;
            
            const filter = this.getAttribute("data-filter");

            buttons.forEach((b) => b.classList.remove("active"));
            this.classList.add("active");

            if (!isFirstLoad) {
                filterWithGSAP(filter);
            } else {
                boxes.forEach((box) => {
                    const boxCategory = box.getAttribute("data-category");
                    
                    if (filter === "all") {
                        // Pour "all", n'afficher que les non-certifications
                        box.style.display = boxCategory !== "certifications" ? "flex" : "none";
                    } else if (filter === "certifications") {
                        // Pour "certifications", n'afficher que les certifications
                        box.style.display = boxCategory === "certifications" ? "flex" : "none";
                    } else {
                        // Pour les autres filtres, comportement standard
                        box.style.display = filter === boxCategory ? "flex" : "none";
                    }
                });
                isFirstLoad = false;
            }
        });
    });

    function filterWithGSAP(filter) {
        isAnimating = true;
        
        // Adapter la logique de filtrage pour gérer le cas "all" spécialement
        const toShow = Array.from(boxes).filter(box => {
            const boxCategory = box.getAttribute("data-category");
            if (filter === "all") {
                return boxCategory !== "certifications";
            } else {
                return filter === boxCategory;
            }
        });
        
        const tl = gsap.timeline({
            onComplete: () => { isAnimating = false; }
        });

        tl.to(boxes, {
            scale: 0.8,
            opacity: 0,
            y: 20,
            duration: 0.3,
            stagger: 0.03,
            ease: "power2.out",
            onComplete: function() {
                boxes.forEach(box => {
                    box.style.display = "none";
                });
                toShow.forEach(box => {
                    box.style.display = "flex";
                    gsap.set(box, { opacity: 0, scale: 0.8, y: 20 });
                });
            }
        });

        tl.to(toShow, {
            scale: 1,
            opacity: 1, 
            y: 0,
            duration: 0.4,
            stagger: 0.08,
            ease: "back.out(1.2)",
            clearProps: "all"
        }, "+=0.1");
        
        return tl;
    }

    document.querySelector('.filter-btn[data-filter="all"]').classList.add('active');
    document.addEventListener('scroll', function() {
        if (isFirstLoad) {
            isFirstLoad = false;
        }
    }, { once: true });
});
