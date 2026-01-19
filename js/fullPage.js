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
  },
});
