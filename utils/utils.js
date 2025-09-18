import router from "../router/index.js";


export async function loadPage(pageName) {
  const parser = new DOMParser();
  const layout = await fetch(`/views/page/layout.html`);
  const component = await fetch(`/views/page/${pageName}.html`);
  const textLayout = await layout.text();
  const textComponent = await component.text();
  const htmlLayout = parser.parseFromString(textLayout, "text/html");
  const htmlComponent = parser.parseFromString(textComponent, "text/html");
  const htmlComponentContent = htmlComponent.getElementById("root").innerHTML;
  htmlLayout.getElementById("content").innerHTML = htmlComponentContent;
  const navUl = htmlLayout.getElementById("nav-ul");
  router.forEach((e) => {
    let li = document.createElement("li");
    li.innerHTML = `<a href="${e.path}">${e.name}</a>`;
    navUl.appendChild(li);
  });
  console.log(htmlLayout.getElementById("root").innerHTML);
  return htmlLayout.getElementById("root").innerHTML;
}

export function loadFile(url, type) {
  if (type === "js") {
    const existingScript = Array.from(document.scripts).find(
      (s) => s.src === new URL(url, window.location.origin).href
    );
    if (existingScript) return Promise.resolve();
  } else if (type === "css") {
    const existingLink = Array.from(document.querySelectorAll("link")).find(
      (l) => l.href === new URL(url, window.location.origin).href
    );
    if (existingLink) return Promise.resolve();
  }

  return new Promise((resolve, reject) => {
    let el;

    if (type === "js") {
      el = document.createElement("script");
      el.src = url;
      el.defer = true;
      el.type = "module";
      el.setAttribute("data-dynamic", "true");
    } else if (type === "css") {
      el = document.createElement("link");
      el.href = url;
      el.rel = "stylesheet";
      el.setAttribute("data-dynamic", "true");
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

export function unloadFiles() {
  document
    .querySelectorAll("[data-dynamic='true']")
    .forEach((el) => el.remove());
}
