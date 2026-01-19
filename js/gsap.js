// split all elements with the class "split" into words and characters
let split = SplitText.create(".split", { type: "words, chars" });

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
  x: -200, // décalage gauche
  duration: 1,
  ease: "power4.out",
});

gsap.from(rightDeco, {
  x: 200, // décalage droite
  duration: 1,
  ease: "power4.out",
});
