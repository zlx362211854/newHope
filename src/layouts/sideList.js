export const sideList = [
  {
    name: '标签',
    path: '/tags',
    children: [
      {
        name: '发起申请',
        path: '/tags/process',
      },
      {
        name: '申请列表',
        path: '/tags/list',
      },
      {
        name: '待审列表',
        path: '/tags/auditList',
      }
    ],
  },
  {
    name: '文件管理',
    path: '/fileManager',
    children: [
      {
        name: '所有',
        path: '/fileManager/all',
      },
    ],
  },
  {
    name: '组织管理',
    path: '/orgs',
    children: [
      {
        name: '新建',
        path: '/orgs/create',
      },
      {
        name: '所有组织',
        path: '/orgs/all',
      },
    ],
  },
  {
    name: '设置',
    path: '/setting',
    children: [
      {
        name: '用户',
        path: '/setting/user',
      },
    ],
  }
];