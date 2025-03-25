document.addEventListener("DOMContentLoaded", function () {
    const buttons = document.querySelectorAll(".filter-btn");
    const boxes = document.querySelectorAll(".competence-box");

    const categoryCount = {
        all: boxes.length,
        "front-end": 0,
        "back-end": 0,
        outils: 0,
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
        const toShow = Array.from(boxes).filter(box => 
            (filter === "all" || box.getAttribute("data-category") === filter)
        );
        
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
