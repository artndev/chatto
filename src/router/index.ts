// @ts-nocheck
import {
  createRouter,
  createMemoryHistory,
  createWebHistory,
} from "vue-router";
import Home from "../components/Home.vue";
import Random from "../components/Random.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "home",
      component: Home,
    },
    {
      path: "/random",
      name: "random",
      component: Random,
    },
  ],
});

export default router;
