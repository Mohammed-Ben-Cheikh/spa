import { loadFile, unloadFiles } from "./models/utils.js";
import router from "./router/index.js";

const root = document.getElementById("root");
const navUl = document.getElementById("nav-ul");

router.forEach((e) => {
  let li = document.createElement("li");
  li.innerHTML = `<a href="${e.path}">${e.name}</a>`;
  navUl.appendChild(li);
});

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
    root.innerHTML = "<h1>404 Not Found</h1>";
    return;
  }
  await loadFile(`/views/assets/css/${route.name}.css`, "css");
  await loadFile(`/controllers/${route.name}.js`, "js");
  const html = await route.component();
  root.innerHTML = html;
}
