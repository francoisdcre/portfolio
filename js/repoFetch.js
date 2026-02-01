async function getRepos(user) {
  const res = await fetch(`https://api.github.com/users/${user}/repos`);
  return res.json();
}

