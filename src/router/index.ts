import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
const routes: RouteRecordRaw[] = [
  {
    path: "/study",
    component: () => import("@/views/study/index.vue")
  },
  {
    path: "/review-normal",
    component: () => import("@/views/review-normal/index.vue")
  },
  {
    path: "/review-formal",
    component: () => import("@/views/review-formal/index.vue")
  },
  {
    path: "/words-today",
    component: () => import("@/views/words-today/index.vue")
  },
  {
    path: "/words-all",
    component: () => import("@/views/words-all/index.vue")
  },
];
const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router;