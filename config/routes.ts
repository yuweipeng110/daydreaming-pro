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
        path: '/test2',
        name: 'test2',
        component: './test/test2',
      },
      {
        path: '/test3',
        name: 'test3',
        component: './test/test3',
      },
      {
        path: '/test4',
        name: 'test4',
        component: './test/test4',
      },
      {
        path: '/test5',
        name: 'test5',
        component: './test/test5',
      },
      {
        path: '/rankList',
        name: 'userIntegralRankList',
        component: './statistics/userIntegralRankList',
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
                path: '/store',
                name: '门店管理',
                icon: 'dashboard',
                component: './store',
                authority: ['admin'],
              },
              {
                path: '/user',
                name: '用户管理',
                icon: 'form',
                component: './user',
              },
              {
                path: '/player',
                name: '玩家管理',
                icon: 'user',
                component: './player',
              },
              {
                path: '/script',
                name: '剧本管理',
                icon: 'profile',
                component: './script',
              },
              {
                path: '/desk',
                name: '桌台管理',
                icon: 'smile',
                component: './desk',
              },
              {
                path: '/order',
                name: '订单管理',
                icon: 'table',
                component: './order',
              },
              {
                path: '/promotions',
                name: '活动管理',
                icon: 'hdd',
                component: './promotions',
              },
              {
                path: '/orderHistoryList',
                name: '订单历史记录',
                icon: 'HistoryOutlined',
                component: './order/OrderHistoryList',
              },
              {
                path: '/UserIntegralRank',
                name: '用户排行',
                icon: 'ContactsOutlined',
                component: './account/UserIntegralRankList',
              },
              {
                path: '/RevenueList',
                name: '营收记录',
                icon: 'RedEnvelopeOutlined',
                component: './account/RevenueList',
                authority: ['admin'],
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
