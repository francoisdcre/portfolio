<?php

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require '../assets/lib/PHPMailer-6.9.3/src/Exception.php';
require '../assets/lib/PHPMailer-6.9.3/src/PHPMailer.php';
require '../assets/lib/PHPMailer-6.9.3/src/SMTP.php';

// Récupération des variables d'environnement
$env = parse_ini_file(__DIR__ . '/../../.env');
$recaptchaSecret = $env['RECAPTCHA_SECRET'] ?? null;
$password = $env['EMAIL_PASSWORD'] ?? null;

// Vérification de reCAPTCHA
$recaptchaResponse = $_POST['g-recaptcha-response'] ?? '';
$remoteIp = $_SERVER['REMOTE_ADDR'];

$verifyUrl = 'https://www.google.com/recaptcha/api/siteverify';
$data = [
    'secret'   => $recaptchaSecret,
    'response' => $recaptchaResponse,
    'remoteip' => $remoteIp
];

$options = [
    'http' => [
        'header'  => "Content-type: application/x-www-form-urlencoded\r\n",
        'method'  => 'POST',
        'content' => http_build_query($data)
    ]
];

$context  = stream_context_create($options);
$result = file_get_contents($verifyUrl, false, $context);
$responseData = json_decode($result);

if (!$responseData || !$responseData->success) {
    echo "La vérification reCAPTCHA a échoué. Veuillez réessayer.";
    exit;
}

$mail = new PHPMailer(true);

try {
    // Configuration du serveur
    $mail->isSMTP();                                            
    $mail->Host       = 'francois-dancre.fr';   // Spécifiez le serveur SMTP
    $mail->SMTPAuth   = true;                                   
    $mail->Username   = 'formulaire@francois-dancre.fr';  // Votre adresse e-mail
    $mail->Password   = $password;           // Votre mot de passe
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;    // Ou PHPMailer::ENCRYPTION_STARTTLS selon les exigences
    $mail->Port       = 465;                            // Ou 587 si vous utilisez TLS

    // Expéditeur et destinataire
    $mail->setFrom('formulaire@francois-dancre.fr', 'Formulaire de contact Portfolio');
    $mail->addAddress('contact@francois-dancre.fr', 'Contact François'); 

    // Contenu du mail
    $mail->isHTML(true);                                  
    $nom = htmlspecialchars($_POST['name']);
    $email = htmlspecialchars($_POST['email']);
    $sujet = htmlspecialchars($_POST['subject']);
    $message = htmlspecialchars($_POST['message']);

    // Personnaliser le contenu du mail
    $mail->Subject = $sujet;
    $mail->Body    = "<p>De: $nom ($email)</p><p>Message: $message</p>";
    $mail->AltBody = "De: $nom ($email)\n\nMessage: $message";


    $mail->send();
    echo 'Le message a été envoyé avec succès';
} catch (Exception $e) {
    echo "Le message n'a pas pu être envoyé. Erreur: {$mail->ErrorInfo}";
}
