import Mock from 'mockjs';

const data = [
  {
    name: '系统管理',
    icon: 'SettingOutlined',
    path: '/system',
    sign: 'system',
    order: '1',
    status: '开启',
    type: '菜单',
    children: [
      {
        name: '菜单管理',
        icon: 'MenuOutlined',
        path: '/system/menu',
        sign: 'system:menu',
        order: '1',
        status: '开启',
        type: '菜单',
      },
      {
        name: '角色管理',
        icon: 'UserOutlined',
        path: '/system/role',
        sign: 'system:role',
        order: '1',
        status: '开启',
        type: '菜单',
      },
      {
        name: '账号管理',
        icon: 'UserOutlined',
        path: '/system/account',
        sign: 'system:account',
        order: '1',
        status: '开启',
        type: '菜单',
      },
    ],
  },
];

Mock.mock('/mock/get-menu', 'get', data);
