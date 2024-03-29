import { Request, Response } from 'express';

const waitTime = (time: number = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};

async function getFakeCaptcha(req: Request, res: Response) {
  await waitTime(2000);
  return res.json('captcha-xxx');
}

// 代码中会兼容本地 service mock 以及部署站点的静态数据
export default {
  // 支持值为 Object 和 Array
  'GET /api/currentUser': {
    name: 'Serati Ma',
    avatar: 'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png',
    userid: '00000001',
    email: 'antdesign@alipay.com',
    signature: '海纳百川，有容乃大',
    title: '交互专家',
    group: '蚂蚁集团－某某某事业群－某某平台部－某某技术部－UED',
    tags: [
      {
        key: '0',
        label: '很有想法的',
      },
      {
        key: '1',
        label: '专注设计',
      },
      {
        key: '2',
        label: '辣~',
      },
      {
        key: '3',
        label: '大长腿',
      },
      {
        key: '4',
        label: '川妹子',
      },
      {
        key: '5',
        label: '海纳百川',
      },
    ],
    notifyCount: 12,
    unreadCount: 11,
    country: 'China',
    geographic: {
      province: {
        label: '浙江省',
        key: '330000',
      },
      city: {
        label: '杭州市',
        key: '330100',
      },
    },
    address: '西湖区工专路 77 号',
    phone: '0752-268888888',
  },
  // GET POST 可省略
  'GET /api/users': [
    {
      key: '1',
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park',
    },
    {
      key: '2',
      name: 'Jim Green',
      age: 42,
      address: 'London No. 1 Lake Park',
    },
    {
      key: '3',
      name: 'Joe Black',
      age: 32,
      address: 'Sidney No. 1 Lake Park',
    },
  ],
  'POST /api/login/account': async (req: Request, res: Response) => {
    const { password, userName, type } = req.body;
    await waitTime(2000);
    if (password === 'ant.design' && userName === 'admin') {
      res.send({
        status: 'ok',
        type,
        currentAuthority: 'admin',
      });
      return;
    }
    if (password === 'ant.design' && userName === 'user') {
      res.send({
        status: 'ok',
        type,
        currentAuthority: 'user',
      });
      return;
    }
    if (type === 'mobile') {
      res.send({
        status: 'ok',
        type,
        currentAuthority: 'admin',
      });
      return;
    }

    res.send({
      status: 'error',
      type,
      currentAuthority: 'guest',
    });
  },
  'POST /api/register': (req: Request, res: Response) => {
    res.send({ status: 'ok', currentAuthority: 'user' });
  },
  'GET /api/500': (req: Request, res: Response) => {
    res.status(500).send({
      timestamp: 1513932555104,
      status: 500,
      error: 'error',
      message: 'error',
      path: '/base/category/list',
    });
  },
  'GET /api/404': (req: Request, res: Response) => {
    res.status(404).send({
      timestamp: 1513932643431,
      status: 404,
      error: 'Not Found',
      message: 'No message available',
      path: '/base/category/list/2121212',
    });
  },
  'GET /api/403': (req: Request, res: Response) => {
    res.status(403).send({
      timestamp: 1513932555104,
      status: 403,
      error: 'Unauthorized',
      message: 'Unauthorized',
      path: '/base/category/list',
    });
  },
  'GET /api/401': (req: Request, res: Response) => {
    res.status(401).send({
      timestamp: 1513932555104,
      status: 401,
      error: 'Unauthorized',
      message: 'Unauthorized',
      path: '/base/category/list',
    });
  },

  'GET  /api/login/captcha': getFakeCaptcha,

  // {
  //    storeId: 1
  //    phone: 1
  //    pageSize: 1000
  // }
  // 支持值为 Object 和 Array
  'GET /app/user/get-player-list': {
    "code": 10200,
    "msg": "\u6210\u529f",
    "data": [
      {
        "id": 1053,
        "role": 3,
        "storeId": 1,
        "nickname": "xxx",
        "sex": 1,
        "phone": "xxx",
        "birthday": "2021-03-05",
        "killerRanking": 0,
        "killerIntegral": 0,
        "killerTitle": "",
        "detectiveRanking": 0,
        "detectiveIntegral": 0,
        "detectiveTitle": "",
        "peopleRanking": 0,
        "peopleIntegral": 0,
        "peopleTitle": "",
        "totalRanking": 0,
        "totalIntegral": 0,
        "totalTitle": "",
        "activeIntegral": 0,
        "remark": "xxx",
        "otime": "2021-03-07 11:33:08",
        "accountBalance": "2.00",
        "voucherBalance": "0.00"
      },
      {
        "id": 1052,
        "role": 3,
        "storeId": 1,
        "nickname": "zzz",
        "sex": 0,
        "phone": "zzz",
        "birthday": "2021-03-07",
        "killerRanking": 0,
        "killerIntegral": 0,
        "killerTitle": "",
        "detectiveRanking": 0,
        "detectiveIntegral": 0,
        "detectiveTitle": "",
        "peopleRanking": 0,
        "peopleIntegral": 0,
        "peopleTitle": "",
        "totalRanking": 0,
        "totalIntegral": 0,
        "totalTitle": "",
        "activeIntegral": 0,
        "remark": "zzz",
        "otime": "2021-03-06 00:18:50",
        "accountBalance": "33.00",
        "voucherBalance": "0.00"
      },
      {
        "id": 1051,
        "role": 3,
        "storeId": 1,
        "nickname": "6666",
        "sex": 0,
        "phone": "66666",
        "birthday": "2021-02-01",
        "killerRanking": 0,
        "killerIntegral": 0,
        "killerTitle": "",
        "detectiveRanking": 0,
        "detectiveIntegral": 0,
        "detectiveTitle": "",
        "peopleRanking": 0,
        "peopleIntegral": 0,
        "peopleTitle": "",
        "totalRanking": 0,
        "totalIntegral": 0,
        "totalTitle": "",
        "activeIntegral": 0,
        "remark": "6666666",
        "otime": "2021-02-08 22:23:10",
        "accountBalance": "1632.00",
        "voucherBalance": "0.00"
      },
      {
        "id": 13,
        "role": 3,
        "storeId": 1,
        "nickname": "\u6d4b\u8bd5\u7528\u62373",
        "sex": 1,
        "phone": "4213213",
        "birthday": "2021-01-01",
        "killerRanking": 0,
        "killerIntegral": 0,
        "killerTitle": "",
        "detectiveRanking": 0,
        "detectiveIntegral": 0,
        "detectiveTitle": "",
        "peopleRanking": 0,
        "peopleIntegral": 0,
        "peopleTitle": "",
        "totalRanking": 0,
        "totalIntegral": 0,
        "totalTitle": "",
        "activeIntegral": 0,
        "remark": "44",
        "otime": "2020-12-29 07:07:41",
        "accountBalance": "785.00",
        "voucherBalance": "40.00"
      },
      {
        "id": 7,
        "role": 3,
        "storeId": 1,
        "nickname": "\u6d4b\u8bd5\u7528\u62371",
        "sex": 1,
        "phone": "15598479000",
        "birthday": "2013-02-28",
        "killerRanking": 0,
        "killerIntegral": 0,
        "killerTitle": "",
        "detectiveRanking": 0,
        "detectiveIntegral": 0,
        "detectiveTitle": "",
        "peopleRanking": 0,
        "peopleIntegral": 0,
        "peopleTitle": "",
        "totalRanking": 0,
        "totalIntegral": 0,
        "totalTitle": "",
        "activeIntegral": 0,
        "remark": "",
        "otime": "2020-10-23 17:06:46",
        "accountBalance": "110.00",
        "voucherBalance": "0.00"
      },
      {
        "id": 6,
        "role": 3,
        "storeId": 1,
        "nickname": "\u6d4b\u8bd5\u7528\u62372",
        "sex": 0,
        "phone": "15598476380",
        "birthday": "",
        "killerRanking": 0,
        "killerIntegral": 0,
        "killerTitle": "",
        "detectiveRanking": 0,
        "detectiveIntegral": 0,
        "detectiveTitle": "",
        "peopleRanking": 0,
        "peopleIntegral": 0,
        "peopleTitle": "",
        "totalRanking": 0,
        "totalIntegral": 0,
        "totalTitle": "",
        "activeIntegral": 0,
        "remark": "tt",
        "otime": "2020-10-23 16:54:17",
        "accountBalance": "4504.00",
        "voucherBalance": "500.00"
      },
      {
        "id": 1049,
        "role": 3,
        "storeId": 1,
        "nickname": "\u6840\u9a9c",
        "sex": 0,
        "phone": "13051143911",
        "birthday": "",
        "killerRanking": 1,
        "killerIntegral": 2,
        "killerTitle": "\u4e1c\u8eb2\u897f\u85cf",
        "detectiveRanking": 0,
        "detectiveIntegral": 0,
        "detectiveTitle": "",
        "peopleRanking": 1,
        "peopleIntegral": 1,
        "peopleTitle": "",
        "totalRanking": 6,
        "totalIntegral": 3,
        "totalTitle": "\u521d\u5b66\u4e4d\u7ec3",
        "activeIntegral": 0,
        "remark": "",
        "otime": "2020-08-31 14:12:06",
        "accountBalance": "116.00",
        "voucherBalance": "0.00"
      },
      {
        "id": 1048,
        "role": 3,
        "storeId": 1,
        "nickname": "\u8bb0\u513f\u5976\u5976",
        "sex": 0,
        "phone": "13552845958",
        "birthday": "",
        "killerRanking": 0,
        "killerIntegral": 0,
        "killerTitle": "",
        "detectiveRanking": 0,
        "detectiveIntegral": 0,
        "detectiveTitle": "",
        "peopleRanking": 2,
        "peopleIntegral": 1,
        "peopleTitle": "",
        "totalRanking": 121,
        "totalIntegral": 1,
        "totalTitle": "",
        "activeIntegral": 0,
        "remark": "",
        "otime": "2020-08-30 21:30:44",
        "accountBalance": "22.00",
        "voucherBalance": "0.00"
      },
      {
        "id": 1047,
        "role": 3,
        "storeId": 1,
        "nickname": "\u8001\u5f20",
        "sex": 0,
        "phone": "15501269538",
        "birthday": "",
        "killerRanking": 0,
        "killerIntegral": 0,
        "killerTitle": "",
        "detectiveRanking": 0,
        "detectiveIntegral": 0,
        "detectiveTitle": "",
        "peopleRanking": 3,
        "peopleIntegral": 1,
        "peopleTitle": "",
        "totalRanking": 122,
        "totalIntegral": 1,
        "totalTitle": "",
        "activeIntegral": 0,
        "remark": "",
        "otime": "2020-08-30 21:30:18",
        "accountBalance": "0.00",
        "voucherBalance": "0.00"
      },
      {
        "id": 1046,
        "role": 3,
        "storeId": 1,
        "nickname": "\u5173\u5173",
        "sex": 0,
        "phone": "13260431319",
        "birthday": "",
        "killerRanking": 0,
        "killerIntegral": 0,
        "killerTitle": "",
        "detectiveRanking": 1,
        "detectiveIntegral": 1,
        "detectiveTitle": "",
        "peopleRanking": 4,
        "peopleIntegral": 1,
        "peopleTitle": "",
        "totalRanking": 34,
        "totalIntegral": 2,
        "totalTitle": "",
        "activeIntegral": 0,
        "remark": "",
        "otime": "2020-08-30 21:29:56",
        "accountBalance": "66.00",
        "voucherBalance": "0.00"
      }
    ],
    "time": "2021-03-11 23:36:51",
    "pageCount": 33,
    "total": 325
  },

  'GET /app/user/get-user-list': {
    "code": 10200,
    "msg": "\u6210\u529f",
    "data": [
      {
        "id": 1,
        "role": 1,
        "storeId": 1,
        "nickname": "\u9a6c\u745e",
        "sex": 0,
        "phone": "",
        "birthday": "",
        "killerRanking": 0,
        "killerIntegral": 0,
        "killerTitle": "",
        "detectiveRanking": 0,
        "detectiveIntegral": 0,
        "detectiveTitle": "",
        "peopleRanking": 0,
        "peopleIntegral": 0,
        "peopleTitle": "",
        "totalRanking": 0,
        "totalIntegral": 0,
        "totalTitle": "",
        "activeIntegral": 0,
        "remark": "",
        "otime": "2020-09-13 19:49:32",
        "accountBalance": "0.00",
        "voucherBalance": "0.00"
      },
      {
        "id": 2,
        "role": 2,
        "storeId": 1,
        "nickname": "\u5feb\u4e50\u96be\u627e",
        "sex": 0,
        "phone": "",
        "birthday": "",
        "killerRanking": 0,
        "killerIntegral": 0,
        "killerTitle": "",
        "detectiveRanking": 0,
        "detectiveIntegral": 0,
        "detectiveTitle": "",
        "peopleRanking": 0,
        "peopleIntegral": 0,
        "peopleTitle": "",
        "totalRanking": 0,
        "totalIntegral": 0,
        "totalTitle": "",
        "activeIntegral": 0,
        "remark": "",
        "otime": "2020-09-13 19:50:48",
        "accountBalance": "0.00",
        "voucherBalance": "0.00"
      }
    ],
    "time": "2021-03-11 23:35:24",
    "pageCount": 1,
    "total": 2
  },

  // 支持值为 Object 和 Array
  'POST /app/user/add-player': {
    code: 10505,
    msg: 'success',
    time: '2020-01-01 00:00:00',
    data: { phoneExists: false },
  },

  // 支持值为 Object 和 Array
  'POST /app/user/edit-player': {
    code: 10200,
    msg: 'success',
    time: '2020-01-01 00:00:00',
    data: { phoneExists: true },
  },
};
