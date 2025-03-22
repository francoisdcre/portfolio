// Remplacez par votre token GitHub valide
const token = 'Token GitHub';

document.addEventListener("DOMContentLoaded", () => {
  fetchRepos();
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
  if (!container) {
    console.error("L'élément .git-repo n'a pas été trouvé.");
    return;
  }
  // container.innerHTML = "";
  repos.forEach(repo => {
    const repoDiv = document.createElement('div');
    repoDiv.className = 'repo-title';
    
    const h1 = document.createElement('h1');
    h1.textContent = repo.name;
    repoDiv.appendChild(h1);
    
    // Au clic, charge le README du repo
    repoDiv.addEventListener('click', () => {
      loadReadme(repo.owner.login, repo.name);
    });
    
    container.appendChild(repoDiv);
    container.appendChild(document.createElement('hr'));
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
