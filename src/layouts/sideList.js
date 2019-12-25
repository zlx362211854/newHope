export const sideList = (role) => {
  const isSuperAdmin = role === 'super_admin'
  const isAdmin = role === 'admin'
  return [
    {
      name: '标签',
      path: '/tags',
      icon: 'tags',
      show: true,
      children: [
        {
          name: '发起申请',
          path: '/tags/process',
          show: true,
        },
        {
          name: '申请列表',
          path: '/tags/list',
          show: true,
        },
        {
          name: '待审列表',
          path: '/tags/auditList',
          show: isAdmin,
        }
      ],
    },
    {
      name: '文件管理',
      path: '/fileManager',
      icon: 'file',
      show: true,
      children: [
        {
          name: '所有',
          path: '/fileManager/all',
          show: true,
        },
      ],
    },
    {
      name: '组织管理',
      path: '/orgs',
      icon: 'solution',
      show: isSuperAdmin,
      children: [
        {
          name: '新建',
          path: '/orgs/create',
          show: isSuperAdmin,
        },
        {
          name: '所有组织',
          path: '/orgs/all',
          show: isSuperAdmin,
        },
      ],
    },
    {
      name: '设置',
      path: '/setting',
      icon: 'setting',
      show: true,
      children: [
        {
          name: '用户',
          path: '/setting/user',
          show: true,
        },
      ],
    }
  ]
}