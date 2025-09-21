import { isAuthenticated, logout } from "../utils/auth.js";

const logoutBtn = document.getElementById("logout-btn");

function render() {
  const authed = isAuthenticated();
  if (logoutBtn) logoutBtn.style.display = authed ? "inline-block" : "none";
}

render();

if (logoutBtn) {
  logoutBtn.addEventListener("click", () => {
    logout();
    window.history.pushState({}, "", "/login");
    window.dispatchEvent(new PopStateEvent("popstate"));
  });
}

// Re-render on back/forward navigation
window.addEventListener("popstate", render);
