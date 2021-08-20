import Home from '@/views/Home.vue';
import { createRouter, createWebHashHistory,RouteRecordRaw } from 'vue-router'
const routes:RouteRecordRaw[] = [
    {
        path:"/",
        component:Home
    },
    {
      path:"/study",
      component:()=>import("@/views/study/index.vue")
  }
];
const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router;