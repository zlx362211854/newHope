export const sideList = (role) => {
  const isSuperAdmin = role === 'super_admin'
  const isAdmin = role === 'admin'
  return [
    {
      name: '我的',
      path: '/my',
      key: '/my',
      icon: 'user',
      show: true,
      children: [
        {
          name: '工作台',
          path: '/my/dashboard',
          key: '/my/dashboard',
          show: true,
        }
      ],
    },
    {
      name: '标签',
      path: '/tags',
      key: '/tags',
      icon: 'tags',
      show: true,
      children: [
        {
          name: '发起申请',
          path: '/tags/process',
          key: '/tags/process',
          show: true,
        },
        {
          name: '我发起的',
          path: '/tags/list',
          key: '/tags/list',
          show: true,
        },
        {
          name: '所有标签',
          path: '/tags/auditList',
          key: '/tags/auditList',
          show: isAdmin || isSuperAdmin,
          children: [
            {
              name: '标签详情',
              path: '/tags/auditList/:id'
            }
          ]
        }
      ],
    },
    {
      name: '文件管理',
      path: '/file',
      key: '/file',
      icon: 'file',
      show: true,
      children: [
        {
          name: '所有',
          path: '/file/all',
          key: '/file/all',
          show: true,
        },
      ],
    },
    {
      name: '组织管理',
      path: '/orgs',
      key: '/orgs',
      icon: 'solution',
      show: isSuperAdmin,
      children: [
        {
          name: '新建',
          path: '/orgs/create',
          key: '/orgs/create',
          show: isSuperAdmin,
        },
        {
          name: '所有组织',
          path: '/orgs/all',
          key: '/orgs/all',
          show: isSuperAdmin,
        },
      ],
    },
    {
      name: '用户管理',
      path: '/users',
      key: '/users',
      icon: 'user',
      show: isSuperAdmin,
      children: [
        {
          name: '所有用户',
          path: '/users/all',
          key: '/users/all',
          show: isSuperAdmin,
        },
      ],
    },
    {
      name: '设置',
      path: '/setting',
      key: '/setting',
      icon: 'setting',
      show: true,
      children: [
        {
          name: '用户',
          path: '/setting/user',
          key: '/setting/user',
          show: true,
        },
      ],
    }
  ]
}