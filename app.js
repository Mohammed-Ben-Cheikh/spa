import router from "./src/router/index.js";
import { isAuthenticated, isPasswordSet } from "./src/utils/auth.js";
import { loadFile, loadPage, unloadFiles } from "./src/utils/utils.js";

const root = document.getElementById("root");

function buildNav() {
  return router
    .filter((e) => e.path !== "/login")
    .map(
      (e) =>
        `<li class="sidebar-item"><a href="${e.path}"><img src="${e.svg}" alt="${e.name}">${e.name}</a></li>`
    )
    .join("");
}
const layoutModule = await import(`/src/views/page/layout.js`);
const layoutHTML = layoutModule.default();

root.innerHTML = layoutHTML;

const navUl = document.getElementById("nav-ul");
navUl.innerHTML = buildNav();

// Load layout controller (for logout button and header behaviors)
await loadFile(`/src/controllers/layout.js`, "js");

// premier rendu
updateContent(window.location.pathname);

document.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const path = link.getAttribute("href");
    window.history.pushState({}, "", path);
    updateContent(path);
  });
});

window.addEventListener("popstate", () => {
  updateContent(window.location.pathname);
});

async function updateContent(pathname) {
  const content = document.getElementById("content");
  unloadFiles();

  // Route guard logic
  const authed = isAuthenticated();
  const hasPwd = isPasswordSet();

  if (!hasPwd && pathname !== "/login") {
    pathname = "/login";
    window.history.replaceState({}, "", pathname);
  } else if (hasPwd && !authed && pathname !== "/login") {
    pathname = "/login";
    window.history.replaceState({}, "", pathname);
  } else if (pathname === "/login" && authed) {
    pathname = "/";
    window.history.replaceState({}, "", pathname);
  }

  const route = router.find((r) => r.path === pathname);
  if (!route) {
    try {
      await loadFile("/src/views/css/404.css", "css");
      content.innerHTML = await loadPage("404");
    } catch (error) {
      console.error("Error loading 404 page:", error);
      content.innerHTML = "<h1>Page not found</h1>";
    }
    return;
  }

  try {
    await loadFile(`/src/views/css/${route.name}.css`, "css");
    const html = await route.component;
    content.innerHTML = html;
    await loadFile(`/src/controllers/${route.name}.js`, "js");
  } catch (error) {
    console.error(`Error loading page ${route.name}:`, error);
    content.innerHTML = `<h1>Error loading page</h1><p>${error.message}</p>`;
  }
}
