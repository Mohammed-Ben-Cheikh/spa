export async function loadPage(pageName) {
  const response = await fetch(`/views/page/${pageName}.html`);
  const html = await response.text();

  const parser = new DOMParser();
  const doc = parser.parseFromString(html, "text/html");

  return doc.getElementById("root").innerHTML;
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
