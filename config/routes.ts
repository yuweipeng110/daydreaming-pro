export default [
  {
    path: '/',
    component: '../layouts/BlankLayout',
    routes: [
      {
        path: '/login',
        component: '../layouts/UserLayout',
        routes: [
          {
            name: 'login',
            path: '/login',
            component: './login',
          },
        ],
      },
      {
        path: '/test',
        name: 'test',
        component: './test',
      },
      {
        path: '/test1',
        name: 'test1',
        component: './test/test1',
      },
      {
        path: '/',
        component: '../layouts/SecurityLayout',
        routes: [
          {
            path: '/',
            component: '../layouts/BasicLayout',
            // authority: ['admin', 'user'],
            routes: [
              {
                path: '/',
                redirect: '/welcome',
              },
              {
                path: '/welcome',
                name: 'welcome',
                icon: 'smile',
                component: './Welcome',
              },
              {
                path: '/admin',
                name: 'admin',
                icon: 'crown',
                component: './Admin',
                authority: ['admin'],
                routes: [
                  {
                    path: '/admin/sub-page',
                    name: 'sub-page',
                    icon: 'smile',
                    component: './Welcome',
                    authority: ['admin'],
                  },
                ],
              },
              {
                name: 'list.table-list',
                icon: 'table',
                path: '/list',
                component: './TableList',
              },
              {
                path: '/store',
                name: 'store',
                icon: 'smile',
                component: './store',
              },
              {
                path: '/user',
                name: 'user',
                icon: 'smile',
                component: './user',
              },
              {
                path: '/player',
                name: 'player',
                icon: 'smile',
                component: './player',
              },
              {
                path: '/script',
                name: 'script',
                icon: 'smile',
                component: './script',
              },
              {
                path: '/desk',
                name: 'desk',
                icon: 'smile',
                component: './desk',
              },
              {
                path: '/order',
                name: 'order',
                icon: 'smile',
                component: './order',
              },
              {
                path: '/orderHistoryList',
                name: 'orderHistoryList',
                icon: 'smile',
                component: './order/OrderHistoryList',
              },
              {
                path: '/userIntegralRank',
                name: 'userIntegralRank',
                icon: 'hdd',
                component: './integral/userIntegralRank',
              },
              {
                component: './404',
              },
            ],
          },
          {
            component: './404',
          },
        ],
      },
    ],
  },
  {
    component: './404',
  },
];
