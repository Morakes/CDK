import type { Router } from 'vue-router';
import { getAuthority, login, getToken } from '@/utils/auth';

export const createRouterGuard = (router: Router) => {
  router.beforeEach(async (to, from, next) => {
    // 获取当前路由是否带有token
    const qsToken = getToken(to.fullPath);
    // 获取当前角色权限
    const auth = getAuthority();
    // 判断当前路由是否存在
    const isRouterExist = router.hasRoute(to.name!);
    next();
    // if (!auth) {
    //   try {
    //     await login();
    //   } catch (err) {
    //     console.log(err);
    //   }
    //   if (!isRouterExist) {
    //     next({ ...from, replace: true });
    //   } else {
    //     if (qsToken) {
    //       // 清除路由参数token
    //       next({ path: to.path });
    //     } else {
    //       next();
    //     }
    //   }
    // } else {
    //   if (!isRouterExist) {
    //     next({ ...from, replace: true });
    //   } else {
    //     if (qsToken) {
    //       // 清除路由参数token
    //       next({ path: to.path });
    //     } else {
    //       next();
    //     }
    //   }
    // }
  });
};
