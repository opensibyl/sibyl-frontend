import { createRouter, createWebHashHistory } from "vue-router";
const about = () => import("../components/About.vue");
const settings = () => import("../components/Settings.vue");
const funcbasic = () => import("../components/FuncFileQuery.vue");

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
    component: funcbasic,
  },
];

export default createRouter({
  history: createWebHashHistory(),
  routes: routes,
});
