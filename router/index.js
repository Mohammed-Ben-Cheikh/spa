const router = [
  {
    path: "/",
    name: "home",
    component: await import("../views/page/home.js"),
    // meta: {
    //   title: "Accueil",
    // },
  },
  {
    path: "/help",
    name: "help",
    component: await import("../views/page/help.js"),
    // meta: {
    //   title: "Accueil",
    // },
  },
  {
    path: "/contact",
    name: "contact",
    component: await import("../views/page/contact.js"),
    // meta: {
    //   title: "Accueil",
    // },
  },
];

export default router;
