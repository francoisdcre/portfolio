// Fonction pour obtenir l'icône Font Awesome selon le langage
function getLanguageIcon(language) {
  const icons = {
    JavaScript: "fa-brands fa-js",
    TypeScript: "fa-brands fa-js",
    Python: "fa-brands fa-python",
    Java: "fa-brands fa-java",
    PHP: "fa-brands fa-php",
    HTML: "fa-brands fa-html5",
    CSS: "fa-brands fa-css3-alt",
    Ruby: "fa-solid fa-gem",
    Go: "fa-brands fa-golang",
    Rust: "fa-brands fa-rust",
    Swift: "fa-brands fa-swift",
    "C++": "fa-solid fa-code",
    C: "fa-solid fa-code",
    "C#": "fa-solid fa-code",
    Kotlin: "fa-brands fa-android",
    Vue: "fa-brands fa-vuejs",
    React: "fa-brands fa-react",
    Angular: "fa-brands fa-angular",
    Node: "fa-brands fa-node-js",
    Dart: "fa-solid fa-code",
  };

  return icons[language] || "fa-solid fa-code";
}

async function getRepos(username) {
  const res = await fetch(`https://api.github.com/users/${username}/repos`);
  const repos = await res.json();

  return repos.map((repo) => ({
    name: repo.name,
    url: repo.html_url,
    mainLanguage: repo.language,
    pushedAt: repo.pushed_at,
  }));
}

async function displayThreeRepos() {
  try {
    const repos = await getRepos("francoisdcre");

    // Trier par date de dernière modification (les plus récents en premier)
    const sortedRepos = repos.sort(
      (a, b) => new Date(b.pushedAt) - new Date(a.pushedAt),
    );

    // Prendre les 3 premiers
    const topThree = sortedRepos.slice(0, 3);

    // Récupérer le conteneur
    const container = document.getElementById("repos");
    if (!container) return;

    // Vider le conteneur
    container.innerHTML = "";

    // Créer les cartes pour chaque projet
    topThree.forEach((repo) => {
      const card = document.createElement("a");
      card.href = repo.url;
      card.target = "_blank";
      card.className =
        "project-card group relative overflow-hidden bg-white/15 backdrop-blur-sm rounded-md p-3 md:p-8 flex flex-col items-center justify-center gap-2 md:gap-3 cursor-pointer transition-all duration-500 hover:bg-white/25 hover:-translate-y-2 aspect-square w-[180px] md:w-[200px] xl:w-[300px]";

      const languageIcon = getLanguageIcon(repo.mainLanguage);

      card.innerHTML = `
        <div class="absolute inset-0 bg-gradient-to-br from-white/0 to-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        <h3 class="text-sm md:text-xl font-bold relative z-10 group-hover:scale-105 transition-transform duration-300 text-center leading-tight">${repo.name}</h3>
        <div class="flex items-center gap-1.5 md:gap-2 relative z-10">
          <i class="${languageIcon} text-xs md:text-sm opacity-70"></i>
          <span class="text-xs md:text-sm opacity-70">${repo.mainLanguage || "N/A"}</span>
        </div>
      `;

      container.appendChild(card);
    });

    // Appliquer l'état initial GSAP sur les cards après leur création
    gsap.set(".project-card", { opacity: 0, scale: 0.8, y: 40 });

    // Déclencher l'animation si on est sur la section projects
    if (window.projectsCardsLoaded) {
      window.projectsCardsLoaded();
    }
  } catch (error) {
    console.error("Erreur lors de la récupération des repos:", error);
  }
}

// Charger les repos au chargement de la page
document.addEventListener("DOMContentLoaded", displayThreeRepos);
