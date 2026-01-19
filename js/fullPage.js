var myFullpage = new fullpage("#fullpage", {
  anchors: ["home", "about"],
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
});
