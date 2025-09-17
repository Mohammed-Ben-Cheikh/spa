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

function updateContent(pathname) {
  const route = router.find((r) => r.path === pathname);
  if (route) {
    const cssPath = `/views/assets/css/${route.name}.css`;
    const jsPath = `/views/assets/js/${route.name}.js`;
    loadFile(cssPath, "css");
    loadFile(jsPath, "js");

    root.innerHTML = route.component.default;
  } else {
    root.innerHTML = "<h1>404 Not Found</h1>";
  }
}

function loadFile(url, type) {
  if (type === "js") {
    const existingScript = Array.from(document.scripts).find(
      (s) => s.src === window.location.origin + url
    );
    if (existingScript) return Promise.resolve();
  } else if (type === "css") {
    const existingLink = Array.from(document.querySelectorAll("link")).find(
      (l) => l.href === window.location.origin + url
    );
    if (existingLink) return Promise.resolve();
  }

  let el;
  return new Promise((resolve, reject) => {
    if (type === "js") {
      el = document.createElement("script");
      el.src = url;
      el.defer = true;
      el.type = "module";
    } else if (type === "css") {
      el = document.createElement("link");
      el.href = url;
      el.rel = "stylesheet";
    } else {
      reject(new Error("Type must be 'css' or 'js'"));
      return;
    }

    el.onload = resolve;
    el.onerror = () => reject(new Error(`Failed to load ${url}`));

    if (type === "js") document.body.appendChild(el);
    else document.head.appendChild(el);
  });
}
