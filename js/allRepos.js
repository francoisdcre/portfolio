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

// Configuration de la pagination
const REPOS_PER_PAGE = 12;
let currentPage = 1;
let allRepos = [];

function createCard(repo) {
  const card = document.createElement("a");
  card.href = repo.url;
  card.target = "_blank";
  card.className =
    "project-card group relative overflow-hidden bg-white/15 backdrop-blur-sm rounded-md p-3 md:p-8 flex flex-col items-center justify-center gap-2 md:gap-3 cursor-pointer transition-all duration-500 hover:bg-white/25 hover:-translate-y-2 aspect-square w-[115px] sm:w-[180px] md:w-[200px] xl:w-[280px]";

  const languageIcon = getLanguageIcon(repo.mainLanguage);

  card.innerHTML = `
    <div class="absolute inset-0 bg-gradient-to-br from-white/0 to-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
    <h3 class="text-sm md:text-xl font-bold relative z-10 group-hover:scale-105 transition-transform duration-300 text-center leading-tight">${repo.name}</h3>
    <div class="flex items-center gap-1.5 md:gap-2 relative z-10">
      <i class="${languageIcon} text-xs md:text-sm opacity-70"></i>
      <span class="text-xs md:text-sm opacity-70">${repo.mainLanguage || "N/A"}</span>
    </div>
  `;

  return card;
}

function displayRepos(page = 1) {
  const container = document.getElementById("repos");
  if (!container) return;

  // Calculer les indices de début et fin
  const startIndex = (page - 1) * REPOS_PER_PAGE;
  const endIndex = startIndex + REPOS_PER_PAGE;
  const reposToDisplay = allRepos.slice(startIndex, endIndex);

  // Vider le conteneur
  container.innerHTML = "";

  // Créer les cartes pour chaque projet
  reposToDisplay.forEach((repo) => {
    const card = createCard(repo);
    container.appendChild(card);
  });

  // Mettre à jour la pagination
  updatePagination(page);
}

function updatePagination(currentPage) {
  const paginationContainer = document.getElementById("pagination");
  if (!paginationContainer) return;

  const totalPages = Math.ceil(allRepos.length / REPOS_PER_PAGE);

  // Vider le conteneur de pagination
  paginationContainer.innerHTML = "";

  // Bouton précédent
  const prevButton = document.createElement("button");
  prevButton.innerHTML = '<i class="fa-solid fa-chevron-left"></i>';
  prevButton.className = `px-4 py-2 rounded-md bg-white/15 backdrop-blur-sm transition-all duration-300 hover:bg-white/25 ${
    currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
  }`;
  prevButton.disabled = currentPage === 1;
  prevButton.onclick = () => {
    if (currentPage > 1) {
      displayRepos(currentPage - 1);
    }
  };
  paginationContainer.appendChild(prevButton);

  // Numéros de page
  for (let i = 1; i <= totalPages; i++) {
    // Afficher uniquement quelques pages autour de la page courante
    if (
      i === 1 ||
      i === totalPages ||
      (i >= currentPage - 1 && i <= currentPage + 1)
    ) {
      const pageButton = document.createElement("button");
      pageButton.textContent = i;
      pageButton.className = `px-4 py-2 rounded-md backdrop-blur-sm transition-all duration-300 ${
        i === currentPage
          ? "bg-white/25 font-bold"
          : "bg-white/15 hover:bg-white/20"
      }`;
      pageButton.onclick = () => displayRepos(i);
      paginationContainer.appendChild(pageButton);
    } else if (i === currentPage - 2 || i === currentPage + 2) {
      // Ajouter des points de suspension
      const dots = document.createElement("span");
      dots.textContent = "...";
      dots.className = "px-2 opacity-70";
      paginationContainer.appendChild(dots);
    }
  }

  // Bouton suivant
  const nextButton = document.createElement("button");
  nextButton.innerHTML = '<i class="fa-solid fa-chevron-right"></i>';
  nextButton.className = `px-4 py-2 rounded-md bg-white/15 backdrop-blur-sm transition-all duration-300 hover:bg-white/25 ${
    currentPage === totalPages ? "opacity-50 cursor-not-allowed" : ""
  }`;
  nextButton.disabled = currentPage === totalPages;
  nextButton.onclick = () => {
    if (currentPage < totalPages) {
      displayRepos(currentPage + 1);
    }
  };
  paginationContainer.appendChild(nextButton);
}

async function loadAllRepos() {
  try {
    const repos = await getRepos("francoisdcre");

    // Trier par date de dernière modification (les plus récents en premier)
    allRepos = repos.sort(
      (a, b) => new Date(b.pushedAt) - new Date(a.pushedAt),
    );

    // Afficher la première page
    displayRepos(1);
  } catch (error) {
    console.error("Erreur lors de la récupération des repos:", error);
  }
}

// Charger les repos au chargement de la page
document.addEventListener("DOMContentLoaded", loadAllRepos);
