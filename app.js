import router from "./router/index.js";
import { loadFile, loadPage, unloadFiles } from "./utils/utils.js";

const root = document.getElementById("root");

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
  unloadFiles();
  const route = router.find((r) => r.path === pathname);
  if (!route) {
    await loadFile("/views/assets/css/404.css", "css");
    root.innerHTML = await loadPage("404");
    return;
  }
  const html = await route.component();
  root.innerHTML = html;
  loadFile(`/views/css/${route.name}.css`, "css");
  loadFile(`/controllers/${route.name}.js`, "js");
}
