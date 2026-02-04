// Gestion du formulaire de contact avec EmailJS
document.addEventListener("DOMContentLoaded", function () {
  const contactForm = document.getElementById("contact-form");

  if (contactForm) {
    contactForm.addEventListener("submit", function (event) {
      event.preventDefault(); // Empêcher le rechargement de la page

      // Récupérer le bouton de soumission
      const submitButton = contactForm.querySelector('button[type="submit"]');
      const submitButtonText = submitButton.querySelector("span");
      const originalText = submitButtonText.textContent;

      // Désactiver le bouton et afficher un message de chargement
      submitButton.disabled = true;
      submitButtonText.textContent = "Envoi en cours...";

      // Envoyer l'email avec EmailJS
      // IMPORTANT: Remplacez 'YOUR_SERVICE_ID' par votre vrai Service ID EmailJS
      emailjs.sendForm("service_29jvgic", "template_7xuquvd", contactForm).then(
        function (response) {
          console.log("SUCCESS!", response.status, response.text);

          // Message de succès
          submitButtonText.textContent = "Envoyé !";
          submitButton.style.backgroundColor = "rgba(34, 197, 94, 0.3)"; // Vert

          // Réinitialiser le formulaire
          contactForm.reset();

          // Restaurer le bouton après 3 secondes
          setTimeout(function () {
            submitButton.disabled = false;
            submitButtonText.textContent = originalText;
            submitButton.style.backgroundColor = "";
          }, 3000);
        },
        function (error) {
          console.error("FAILED...", error);

          // Message d'erreur
          submitButtonText.textContent = "Erreur d'envoi";
          submitButton.style.backgroundColor = "rgba(239, 68, 68, 0.3)"; // Rouge

          // Restaurer le bouton après 3 secondes
          setTimeout(function () {
            submitButton.disabled = false;
            submitButtonText.textContent = originalText;
            submitButton.style.backgroundColor = "";
          }, 3000);
        },
      );
    });
  }
});
