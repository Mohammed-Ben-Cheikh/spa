import router from "./src/router/index.js";
import { loadFile, loadPage, unloadFiles } from "./src/utils/utils.js";

const root = document.getElementById("root");

const navItems = router
  .map((e) => `<li><a href="${e.path}">${e.name}</a></li>`)
  .join("");
const layoutModule = await import(`/src/views/page/layout.js`);
const layoutHTML = layoutModule.default();

root.innerHTML = layoutHTML;

const navUl = document.getElementById("nav-ul");
navUl.innerHTML = navItems;

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
  const route = router.find((r) => r.path === pathname);
  if (!route) {
    await loadFile("/views/assets/css/404.css", "css");
    content.innerHTML = await loadPage("404");
    return;
  }
  const html = await route.component;
  content.innerHTML = html;
  loadFile(`/src/views/css/${route.name}.css`, "css");
  loadFile(`/src/controllers/${route.name}.js`, "js");
}
