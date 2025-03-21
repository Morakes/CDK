import { App } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';
import Layout from '@/layout/default/Layout.vue';
import { basicRoutes } from './static-routes';
import { createRouterGuard } from './routerGuard';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Layout,
      children: [...basicRoutes],
      redirect: '/system',
    },
    {
      path: '/login',
      name: '/login',
      component: import('@/views/login/Login.vue'),
      meta: {
        title: '登录页',
      },
    },
  ],
});

export default router;

export function setupRouter(app: App) {
  createRouterGuard(router);
  app.use(router);
}
