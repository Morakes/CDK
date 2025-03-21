import { RouteRecordRaw } from 'vue-router';

export const basicRoutes: RouteRecordRaw[] = [
  {
    path: '/system',
    name: '/system',
    redirect: '/system/menus',
    meta: {
      icon: 'SettingOutlined',
      title: '系统管理',
    },
    children: [
      {
        path: '/system/menus',
        name: '/system/menus',
        component: () => import('@/views/system/menus'),
        meta: {
          title: '菜单管理',
          hideBreadcrumb: false,
          hideMenu: false,
          icon: 'MenuOutlined',
        },
      },
      {
        path: '/system/roles',
        name: '/system/roles',
        component: () => import('@/views/system/roles'),
        meta: {
          title: '角色管理',
          hideBreadcrumb: false,
          hideMenu: false,
          icon: 'UserAddOutlined',
        },
      },
      {
        path: '/system/account',
        name: '/system/account',
        component: () => import('@/views/system/account'),
        meta: {
          title: '账号管理',
          hideBreadcrumb: false,
          hideMenu: false,
          icon: 'MailOutlined',
        },
      },
    ],
  },
  {
    path: '/permission',
    name: '/permission',
    meta: {
      title: '权限管理',
      icon: 'LockOutlined',
    },
    children: [
      {
        path: '/permission/btn',
        name: '/permission/btn',
        component: () => import('@/views/permission/btn'),
        meta: {
          title: '按钮权限',
          hideBreadcrumb: false,
          hideMenu: false,
          icon: 'LockOutlined',
        },
      },
      {
        path: '/permission/page',
        name: '/permission/page',
        component: () => import('@/views/permission/page'),
        meta: {
          title: '页面权限',
          hideBreadcrumb: false,
          hideMenu: false,
          icon: 'LockOutlined',
        },
      },
    ],
  },
  {
    path: '/game',
    name: '/game',
    redirect: '/game/game-cdk',
    children: [
      {
        path: '/game/game-cdk',
        name: '/game/game-cdk',
        component: () => import('@/views/game-cdk/game-cdk/GameCdk.vue'),
        meta: {
          icon: 'SettingOutlined',
          title: '游戏列表',
        },
      },
    ],
    meta: {
      title: '游戏管理',
      icon: 'GameOutlined',
    },
  },
];
