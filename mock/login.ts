export default {
  'POST /app/signin/login-check': {
    code: '10200',
    msg: 'ok',
    time: '2020-01-01 00:00:00',
    data: {
      userToken: '1234567890',
      id: 1,
      role: 1,
      nickname: '隋总',
      storeId: 1,
      avatar: 'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png',
    },
  },
  'POST /app/signin/login-token-check': {
    code: '10200',
    msg: 'or',
    time: '2020-01-01 00:00:00',
    data: {
      id: 1,
      role: 1,
      nickname: '隋总',
      storeId: 1,
      avatar: 'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png',
    },
  },
};
