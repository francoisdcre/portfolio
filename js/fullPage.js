let aboutAnimated = false;
let journeyAnimated = false;
let skillsAnimated = false;
let projectsAnimated = false;
let contactAnimated = false;
var myFullpage = new fullpage("#fullpage", {
  anchors: ["home", "about", "journey", "skills", "projects", "contact"],
  menu: "#menu",
  navigation: true,
  navigationTooltips: [
    "Home",
    "About",
    "Journey",
    "Skills",
    "Projects",
    "Contact",
  ],
  slidesNavigation: true,
  scrollingSpeed: "1000",
  fitToSectionDelay: "600",
  easingcss3: "cubic-bezier(0.78, 0, 0.22, 1)",
  loopBottom: true,
  loopTop: true,
  scrollOverflow: false,
  controlArrows: false,
  lazyLoading: false,
  // Get your license at https://alvarotrigo.com/fullPage/pricing/
  licenseKey: "YOUR_LICENSE_KEY_HERE",
  afterLoad: function (origin, destination, direction) {
    const nav = document.getElementById("menu");

    if (destination.anchor === "home") {
      nav.classList.add("opacity-0");
      nav.classList.remove("opacity-100");
    } else {
      nav.classList.add("opacity-100");
      nav.classList.remove("opacity-0");
    }

    if (destination.anchor === "about" && !aboutAnimated) {
      // animate characters in about section
      aboutAnimated = true;

      // Animate title
      gsap.to(".about h1", {
        opacity: 1,
        x: 0,
        duration: 0.6,
        ease: "power3.out",
      });

      gsap.to(splitAbout.words, {
        y: 0,
        opacity: 1,
        rotation: 0,
        duration: 0.4,
        ease: "back",
        stagger: 0.15,
        delay: 0.2,
      });

      gsap.to(cherryBlossoms, {
        x: 0, // décalage gauche
        y: 0,
        rotation: 0,
        duration: 1,
        ease: "power4.out",
      });
    }

    // Journey section animation trigger
    if (destination.anchor === "journey" && !journeyAnimated) {
      journeyAnimated = true;
      if (typeof window.animateJourneySection === "function") {
        window.animateJourneySection();
      }
    }

    // Skills section animation trigger
    if (destination.anchor === "skills" && !skillsAnimated) {
      skillsAnimated = true;
      if (typeof window.animateSkillsSection === "function") {
        window.animateSkillsSection();
      }
    }

    // Projects section animation trigger
    if (destination.anchor === "projects" && !projectsAnimated) {
      projectsAnimated = true;

      // Callback pour animer les cards une fois qu'elles sont chargées
      window.projectsCardsLoaded = function () {
        if (typeof window.animateProjectsSection === "function") {
          window.animateProjectsSection();
        }
      };

      // Si les cards sont déjà chargées, animer immédiatement
      if (document.querySelectorAll(".project-card").length > 0) {
        if (typeof window.animateProjectsSection === "function") {
          window.animateProjectsSection();
        }
      }
    }

    // Contact section animation trigger
    if (destination.anchor === "contact" && !contactAnimated) {
      contactAnimated = true;
      if (typeof window.animateContactSection === "function") {
        window.animateContactSection();
      }
    }
  },
});
