const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: "",
        component: () => import("src/pages/company/CeoPage1.vue"),
      },
      {
        path: "ceo1",
        component: () => import("src/pages/company/CeoPage1.vue"),
      },
      {
        path: "ceo2",
        component: () => import("src/pages/company/CeoPage2.vue"),
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
