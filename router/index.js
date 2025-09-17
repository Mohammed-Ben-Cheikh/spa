import { loadPage } from "../utils/utils.js";

const router = [
  { path: "/", name: "home", component: () => loadPage("home") },
  { path: "/about", name: "about", component: () => loadPage("about") },
  { path: "/contact", name: "contact", component: () => loadPage("contact") },
];

export default router;
