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

// Set initial state for about title
gsap.set(".about h1", {
  opacity: 0,
  x: -50,
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

// ============================================
// JOURNEY SECTION ANIMATIONS
// ============================================

// Set initial states for journey elements
gsap.set(".journey-title", { opacity: 0, y: -30 });
gsap.set(".journey-subtitle", { opacity: 0, y: -20 });
gsap.set(".timeline-line", { scaleY: 0, transformOrigin: "top center" });
gsap.set(".timeline-dot", { scale: 0, opacity: 0 });
gsap.set(".timeline-card", {
  opacity: 0,
  x: (i) => (i % 2 === 0 ? -100 : 100),
});
gsap.set(".journey-deco", { opacity: 0, x: 200, rotation: 15 });
gsap.set(".particle", { opacity: 0, scale: 0 });

// Function to animate Journey section (call this when section becomes active)
function animateJourneySection() {
  const tl = gsap.timeline();

  // Animate title and subtitle
  tl.to(".journey-title", {
    opacity: 1,
    y: 0,
    duration: 0.6,
    ease: "power3.out",
  })
    .to(
      ".journey-subtitle",
      {
        opacity: 1,
        y: 0,
        duration: 0.4,
        ease: "power3.out",
      },
      "-=0.3",
    )
    // Animate the timeline line growing
    .to(
      ".timeline-line",
      {
        scaleY: 1,
        duration: 1.2,
        ease: "power2.inOut",
      },
      "-=0.2",
    )
    // Animate dots appearing with glow pulse
    .to(
      ".timeline-dot",
      {
        scale: 1,
        opacity: 1,
        duration: 0.4,
        stagger: 0.15,
        ease: "back.out(2)",
      },
      "-=0.8",
    )
    // Animate cards sliding in from alternating sides
    .to(
      ".timeline-card",
      {
        opacity: 1,
        x: 0,
        duration: 0.6,
        stagger: 0.2,
        ease: "power3.out",
      },
      "-=0.6",
    )
    // Animate decorative image
    .to(
      ".journey-deco",
      {
        opacity: 1,
        x: 0,
        rotation: 0,
        duration: 1,
        ease: "power2.out",
      },
      "-=0.8",
    )
    // Animate particles
    .to(
      ".particle",
      {
        opacity: 0.6,
        scale: 1,
        duration: 0.5,
        stagger: 0.1,
        ease: "power2.out",
      },
      "-=0.5",
    );

  // Continuous floating animation for particles
  gsap.to(".particle", {
    y: "random(-20, 20)",
    x: "random(-10, 10)",
    duration: "random(2, 4)",
    repeat: -1,
    yoyo: true,
    ease: "sine.inOut",
    stagger: {
      each: 0.5,
      from: "random",
    },
  });
}

// Export or make available globally
window.animateJourneySection = animateJourneySection;

// ============================================
// SKILLS SECTION ANIMATIONS
// ============================================

// Set initial state for SVG paths (hidden)
gsap.set(".skillsPath", {
  strokeDasharray: 1000,
  strokeDashoffset: 1000,
});

// Set initial states for skills elements
gsap.set(".skills h1", { opacity: 0, x: -50 });
gsap.set(".skills .group", { opacity: 0, scale: 0.8, y: 30 });

// Function to animate Skills section
function animateSkillsSection() {
  const tl = gsap.timeline();

  // Animate title
  tl.to(".skills h1", {
    opacity: 1,
    x: 0,
    duration: 0.6,
    ease: "power3.out",
  })
    // Animate SVG drawing
    .to(
      ".skillsPath",
      {
        strokeDashoffset: 0,
        duration: 2.5,
        ease: "power1.inOut",
      },
      "-=0.3",
    )
    // Animate skill cards with stagger
    .to(
      ".skills .group",
      {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 0.5,
        stagger: {
          amount: 0.8,
          from: "start",
        },
        ease: "back.out(1.4)",
      },
      "-=2",
    );
}

// Export function globally
window.animateSkillsSection = animateSkillsSection;

// ============================================
// PROJECTS SECTION ANIMATIONS
// ============================================

// Set initial states for projects elements (sauf les cards qui sont dynamiques)
gsap.set(".projects-title", { opacity: 0, y: -30 });
gsap.set(".projects-subtitle", { opacity: 0, y: -20 });
gsap.set(".projects a[href='project.html']", { opacity: 0, scale: 0.8 });
gsap.set(".projects .absolute.right-0.bottom-0", {
  opacity: 0,
  x: 200,
  rotation: 15,
});

// Function to animate Projects section
function animateProjectsSection() {
  const tl = gsap.timeline();

  // Animate title and subtitle
  tl.to(".projects-title", {
    opacity: 1,
    y: 0,
    duration: 0.6,
    ease: "power3.out",
  })
    .to(
      ".projects-subtitle",
      {
        opacity: 1,
        y: 0,
        duration: 0.4,
        ease: "power3.out",
      },
      "-=0.3",
    )
    // Animate project cards with stagger
    .to(
      ".project-card",
      {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.15,
        ease: "back.out(1.4)",
      },
      "-=0.2",
    )
    // Animate button
    .to(
      ".projects a[href='project.html']",
      {
        opacity: 1,
        scale: 1,
        duration: 0.5,
        ease: "back.out(1.7)",
      },
      "-=0.4",
    )
    // Animate decorative branch
    .to(
      ".projects .absolute.right-0.bottom-0",
      {
        opacity: 1,
        x: 0,
        rotation: 0,
        duration: 1,
        ease: "power2.out",
      },
      "-=0.8",
    );
}

// Export function globally
window.animateProjectsSection = animateProjectsSection;

// ============================================
// CONTACT SECTION ANIMATIONS
// ============================================

// Set initial states for contact elements
gsap.set(".contact-title", { opacity: 0, y: -30 });
gsap.set(".contact input, .contact textarea", { opacity: 0, x: -30 });
gsap.set(".contact button", { opacity: 0, scale: 0.8 });
gsap.set(".contact .absolute.left-0.top-0", {
  opacity: 0,
  x: -200,
  rotation: -15,
});
gsap.set(".contact .absolute.right-0.bottom-0", {
  opacity: 0,
  x: 200,
  rotation: 15,
});

// Function to animate Contact section
function animateContactSection() {
  const tl = gsap.timeline();

  // Animate title
  tl.to(".contact-title", {
    opacity: 1,
    y: 0,
    duration: 0.6,
    ease: "power3.out",
  })
    // Animate form fields with stagger
    .to(
      ".contact input, .contact textarea",
      {
        opacity: 1,
        x: 0,
        duration: 0.5,
        stagger: 0.1,
        ease: "power3.out",
      },
      "-=0.3",
    )
    // Animate submit button
    .to(
      ".contact button",
      {
        opacity: 1,
        scale: 1,
        duration: 0.5,
        ease: "back.out(1.7)",
      },
      "-=0.2",
    )
    // Animate decorative branches
    .to(
      ".contact .absolute.left-0.top-0",
      {
        opacity: 1,
        x: 0,
        rotation: 0,
        duration: 1,
        ease: "power2.out",
      },
      "-=0.8",
    )
    .to(
      ".contact .absolute.right-0.bottom-0",
      {
        opacity: 1,
        x: 0,
        rotation: 0,
        duration: 1,
        ease: "power2.out",
      },
      "-=0.9",
    );
}

// Export function globally
window.animateContactSection = animateContactSection;
