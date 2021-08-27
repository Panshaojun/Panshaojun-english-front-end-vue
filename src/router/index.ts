import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
const routes: RouteRecordRaw[] = [
  {
    path: "/study",
    component: () => import("@/views/study/index.vue")
  },
  {
    path: "/review",
    component: () => import("@/views/review/index.vue")
  },
  {
    path: "/review-today",
    component: () => import("@/views/review-today/index.vue")
  },
  {
    path: "/review-all",
    component: () => import("@/views/review-all/index.vue")
  },
];
const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router;