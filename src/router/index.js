import { createRouter, createWebHashHistory } from "vue-router";
const home = () => import("../components/Home.vue");
const about = () => import("../components/About.vue");
const settings = () => import("../components/Settings.vue");
const funcbasic = () => import("../components/BasicFunctions.vue");

const routes = [
  {
    path: "/",
    redirect: "/home",
  },
  {
    path: "/home",
    name: "home",
    component: home,
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
    path: "/func/basic",
    name: "func/basic",
    component: funcbasic,
  },
];

export default createRouter({
  history: createWebHashHistory(),
  routes: routes,
});
