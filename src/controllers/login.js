import { isPasswordSet, login, setPassword } from "../utils/auth.js";

const form = document.getElementById("login-form");
const title = document.getElementById("login-title");
const passwordEl = document.getElementById("password");
const confirmField = document.getElementById("confirm-field");
const confirmEl = document.getElementById("confirm");
const submitBtn = document.getElementById("submit-btn");
const errorEl = document.getElementById("error");
const hintEl = document.getElementById("hint");

let setupMode = !isPasswordSet();

function renderMode() {
  if (setupMode) {
    title.textContent = "Créer votre mot de passe";
    submitBtn.textContent = "Enregistrer";
    confirmField.style.display = "block";
    hintEl.textContent =
      "Première utilisation: créez un mot de passe pour sécuriser l'application.";
  } else {
    title.textContent = "Authentification";
    submitBtn.textContent = "Se connecter";
    confirmField.style.display = "none";
    hintEl.textContent =
      "Entrez votre mot de passe pour accéder à l'application.";
  }
}

renderMode();

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  errorEl.style.display = "none";
  const pwd = passwordEl.value.trim();
  try {
    if (setupMode) {
      const confirm = confirmEl.value.trim();
      if (pwd.length < 4) throw new Error("Mot de passe trop court (min 4).");
      if (pwd !== confirm)
        throw new Error("Les mots de passe ne correspondent pas.");
      await setPassword(pwd);
      // switch to normal mode and redirect
      setupMode = false;
      // after setup, redirect to home
      window.history.pushState({}, "", "/");
      window.dispatchEvent(new PopStateEvent("popstate"));
    } else {
      const ok = await login(pwd);
      if (!ok) throw new Error("Mot de passe incorrect.");
      window.history.pushState({}, "", "/");
      window.dispatchEvent(new PopStateEvent("popstate"));
    }
  } catch (err) {
    errorEl.textContent = err.message || String(err);
    errorEl.style.display = "block";
  }
});
