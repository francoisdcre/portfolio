// Remplacez par votre token GitHub valide
const token = '';

document.addEventListener("DOMContentLoaded", () => {
  fetchRepos();
  document.querySelectorAll('.repo-title[data-json]').forEach(div => {
    div.addEventListener('click', () => loadLocalProject(div.dataset.json));
  });
});

async function fetchRepos() {
  try {
    const response = await fetch(
      'https://api.github.com/user/repos?visibility=public&affiliation=owner&sort=updated',
      {
        headers: {
          Authorization: `token ${token}`
        }
      }
    );
    if (!response.ok) {
      throw new Error(`Erreur lors de la récupération des repos: ${response.status}`);
    }
    const repos = await response.json();
    displayRepos(repos);
  } catch (error) {
    console.error("Erreur dans fetchRepos():", error);
  }
}

function displayRepos(repos) {
  const container = document.querySelector('.git-repo');
  if (!container) return;

  repos.forEach(repo => {
    const repoDiv = document.createElement('div');
    repoDiv.className = 'repo-title';
    repoDiv.innerHTML = `<h1>${repo.name}</h1>`;
    repoDiv.addEventListener('click', () => loadReadme(repo.owner.login, repo.name));
    container.appendChild(repoDiv);
    container.appendChild(document.createElement('hr'));
  });

  // Lancement de l’animation GSAP **après** l’injection
  gsap.registerPlugin(ScrollTrigger);

  // Après avoir ajouté tous les .repo-title au DOM :
  gsap.utils.toArray(".repo-title").forEach(el => {
    gsap.from(el, {
      scrollTrigger: {
        trigger: el,
        start: "top 80%",
        toggleActions: "play none none reverse"
      },
      x: -300,
      opacity: 0,
      duration: 0.2,
      ease: "power.out"
    });
  });  
}

async function loadReadme(owner, repoName) {
  const url = `https://api.github.com/repos/${owner}/${repoName}/readme`;
  const readmeContainer = document.querySelector('.repo-readme');

  try {
    const response = await fetch(url, {
      headers: {
        Authorization: `token ${token}`,
        Accept: 'application/vnd.github.v3.raw'
      }
    });

    // === GESTION DU CAS « PAS DE README » ===
    if (response.status === 404) {
      readmeContainer.classList.add("readme");
      readmeContainer.innerHTML = `<p class="error">Aucun README disponible pour <strong>${repoName}</strong>.</p>`;
      return;
    }

    if (!response.ok) {
      throw new Error(`Erreur lors de la récupération du README: ${response.status}`);
    }

    let content = await response.text();
    if (content.trim().startsWith('{')) {
      const json = JSON.parse(content);
      content = json.content && json.encoding === 'base64'
        ? atob(json.content)
        : '';
    }

    const html = marked.parse(content);
    readmeContainer.classList.add("readme");
    readmeContainer.innerHTML = `
      <div class="top-box">
        <h1>${repoName}</h1>
        <div class="icon">
          <img src="assets/icon/minimize.png" alt="Minimize">
          <img src="assets/icon/copy.png" alt="Copy">
          <img src="assets/icon/close-window.png" alt="Close" id="close-readme-btn">
        </div>
      </div>
      <button id="close-readme-text-btn">Fermer le README</button>
      <div class="readme-content">${html}</div>
    `;

    const closeReadme = () => {
      readmeContainer.innerHTML = '';
      readmeContainer.classList.remove("readme");
    };
    document.getElementById('close-readme-btn')?.addEventListener('click', closeReadme);
    document.getElementById('close-readme-text-btn')?.addEventListener('click', closeReadme);

  } catch (err) {
    console.error(err);
    readmeContainer.classList.add("readme");
    readmeContainer.innerHTML = `<p class="error">Erreur : impossible de charger le README.</p>`;
  }
}

async function loadLocalProject(jsonPath) {
  const readmeContainer = document.querySelector('.repo-readme');
  try {
    const resp = await fetch(jsonPath);
    if (!resp.ok) throw new Error(`Fichier JSON introuvable (${resp.status})`);
    const data = await resp.json();

    readmeContainer.classList.add('readme');
    readmeContainer.innerHTML = `
      <div class="top-box">
        <h1>${data.titre}</h1>
        <div class="icon">
          <img src="assets/icon/minimize.png" alt="Minimize">
          <img src="assets/icon/copy.png" alt="Copy">
          <img src="assets/icon/close-window.png" id="close-readme-btn" alt="Close">
        </div>
      </div>
      <button id="close-readme-text-btn">Fermer le README</button>
      <div class="readme-content">
        <h1 align='center'>${data.titre}</h1>
        <p><a href="${data.lien}" target="_blank">Visiter le site</a></p>
        <p>${data.description}</p>
        <h2>Technologies</h2>
        <ul>${data.technologie.map(t => `<li>${t}</li>`).join('')}</ul>
        <h2>Compétences acquises</h2>
        <ul>${data.competences_acquises.map(c => `<li>${c}</li>`).join('')}</ul>
        <h2>Galerie</h2>
        <div class="images">
          ${data.images.map(i => `<img src="${i.src}" alt="${i.alt}">`).join('')}
        </div>
      </div>
    `;

    const close = () => {
      readmeContainer.innerHTML = '';
      readmeContainer.classList.remove('readme');
    };
    document.getElementById('close-readme-btn').addEventListener('click', close);
    document.getElementById('close-readme-text-btn').addEventListener('click', close);
  } catch (e) {
    readmeContainer.classList.add('readme');
    readmeContainer.innerHTML = `<p class="error">Erreur : ${e.message}</p>`;
  }
}
