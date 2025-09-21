import { loadPage } from "../utils/utils.js";

const router = [
  { path: "/login", name: "login", component: loadPage("login") },
  {
    path: "/",
    name: "patients",
    component: loadPage("patients"),
    svg: `/public/patients.svg`,
  },
  {
    path: "/appointments",
    name: "appointments",
    component: loadPage("appointments"),
    svg: `/public/rendez-vous.svg`,
  },
  {
    path: "/finances",
    name: "finances",
    component: loadPage("finances"),
    svg: `/public/depenses.svg`,
  },
];

export default router;
