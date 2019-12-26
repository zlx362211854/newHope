var path = require('path')
export default {
  treeShaking: true,
  define: {

  },
  routes: [
    {
      path: '/',
      component: '../layouts/index',
    },
    {
      path: '/login',
      component: './login/index',
    },
    {
      path: '/signup',
      component: './signup/index',
    },
    {
      path: '/tags',
      component: '../layouts/index',
      routes: [
        {path: '/tags/process', component: './tags/process'},
        {path: '/tags/list', component: './tags/list'},
        {path: '/tags/auditList', component: './tags/auditList'},
      ],
    },
    {
      path: '/orgs',
      component: '../layouts/index',
      routes: [
        {path: '/orgs/create', component: './orgs/create'},
        {path: '/orgs/all', component: './orgs/all'},
      ],
    },
    {
      path: '/users',
      component: '../layouts/index',
      routes: [
        {path: '/users/all', component: './users/all'}
      ],
    },
    {
      path: '/file',
      component: '../layouts/index',
      routes: [
        {path: '/file/all', component: './file/all'}
      ],
    },
    {
      path: '/setting',
      component: '../layouts/index',
      routes: [
        {path: '/setting/user', component: './setting/user'}
      ],
    },
  ],
  plugins: [
    [
      'umi-plugin-react',
      {
        antd: true,
        dva: true,
        dynamicImport: false,
        title: 'NEWHOPE',
        dll: false,
        routes: {
          exclude: [/components\//],
        },
      },
    ],
  ],
  proxy: {
    "/api": {
      "target": "http://localhost:3060",
      "changeOrigin": true,
      "pathRewrite": {"^/api": ""}
    }
  },
  alias: {
    components: path.join(__dirname, './src/components'),
    request: path.join(__dirname, './src/request'),
    static: path.join(__dirname, './src/static'),
    utils: path.join(__dirname, './src/utils'),
    src: path.join(__dirname, './src'),
  },
  extraBabelPresets: [],
};
