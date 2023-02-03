import { createRouter, createWebHashHistory } from "vue-router";
const about = () => import("../components/About.vue");
const settings = () => import("../components/Settings.vue");
const filebasic = () => import("../components/PageFileQuery.vue");
const fileReference = () => import("../components/PageFileReference.vue");

const routes = [
  {
    path: "/",
    redirect: "/about",
  },
  {
    path: "/about",
    name: "about",
    component: about,
  },
  {
    path: "/settings",
    name: "settings",
    component: settings,
  },
  {
    path: "/file/basic",
    name: "file/basic",
    component: filebasic,
  },
  {
    path: "/file/reference",
    name: "file/reference",
    component: fileReference,
  },
];

export default createRouter({
  history: createWebHashHistory(),
  routes: routes,
});
