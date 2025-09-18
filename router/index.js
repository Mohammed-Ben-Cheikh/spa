import { loadPage } from "../utils/utils.js";

const router = [
  { path: "/login", name: "login", component: () => loadPage("login") },
  {
    path: "/",
    name: "dashboard",
    component: () => loadPage("dashboard"),
  },
  {
    path: "/patients",
    name: "patients",
    component: () => loadPage("patients"),
  },
  {
    path: "/appointments",
    name: "appointments",
    component: () => loadPage("appointments"),
  },
  {
    path: "/finances",
    name: "finances",
    component: () => loadPage("finances"),
  },
];

export default router;
