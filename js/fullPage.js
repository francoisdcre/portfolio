let aboutAnimated = false;
var myFullpage = new fullpage("#fullpage", {
  anchors: ["home", "about"],
  menu: "#menu",
  navigation: true,
  navigationTooltips: ["Home", "About"],
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
      gsap.to(splitAbout.words, {
        y: 0,
        opacity: 1,
        rotation: 0,
        duration: 0.7,
        ease: "back",
        stagger: 0.15,
      });

      gsap.to(cherryBlossoms, {
        x: 0, // décalage gauche
        y: 0,
        rotation: 0,
        duration: 1,
        ease: "power4.out",
      });
    }
  },
});
