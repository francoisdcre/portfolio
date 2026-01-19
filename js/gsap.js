// split all elements with the class "split" into words and characters
let split = SplitText.create(".split", { type: "words, chars" });
// split text about section
let splitAbout = SplitText.create(".split-about", {
  type: "words, chars",
});

// Set initial state for about section words (hidden)
gsap.set(splitAbout.words, {
  y: -40,
  opacity: 0,
  rotation: "random(-80, 80)",
});

// now animate the characters in a staggered fashion
gsap.from(split.chars, {
  x: 150,
  opacity: 0,
  duration: 0.7,
  ease: "power4",
  stagger: 0.04,
});

// Animation on background elements

const leftDeco = document.querySelector(
  'div > img[src="assets/img/backgroundLeft.webp"]',
);

const rightDeco = document.querySelector(
  'div > img[src="assets/img/backgroundRight.webp"]',
);

// Slide horizontal au chargement
gsap.from(leftDeco, {
  x: -300,
  duration: 1,
  ease: "power4.out",
});

gsap.from(rightDeco, {
  x: 300,
  duration: 1,
  ease: "power4.out",
});

// Animation cherry blossoms about section

const cherryBlossoms = document.querySelector(
  'div > img[src="assets/img/CherryBlossomIa.webp"]',
);

gsap.set(cherryBlossoms, {
  x: 1000,
  y: 1000,
  rotation: -80,
});
