<?php
header('Content-Type: application/json');

$env = parse_ini_file(__DIR__ . '/../../.env');
$token = $env['GITHUB_TOKEN'] ?? null;

if (!$token) {
  http_response_code(500);
  echo json_encode(['error' => 'Token manquant']);
  exit;
}

// Détermine l'action : 'repos' ou 'readme'
$action = $_GET['action'] ?? null;
$username = $_GET['username'] ?? 'octocat';
$repo = $_GET['repo'] ?? null;

$url = '';
if ($action === 'repos') {
  $url = "https://api.github.com/user/repos?visibility=public&affiliation=owner&sort=updated";
} elseif ($action === 'readme' && $repo) {
  $url = "https://api.github.com/repos/$username/$repo/readme";
} else {
  http_response_code(400);
  echo json_encode(['error' => 'Paramètres invalides']);
  exit;
}

$ch = curl_init($url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_HTTPHEADER, [
  "Authorization: Bearer $token",
  "User-Agent: MonAppWeb" // obligatoire pour GitHub API
]);
$response = curl_exec($ch);
curl_close($ch);

echo $response;
