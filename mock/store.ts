export default {
  // 支持值为 Object 和 Array
  'GET /app/user/get-store-list': {
    "code": 10200,
    "msg": "\u6210\u529f",
    "data": [{
      "id": "4",
      "storeName": "\u6d4b\u8bd5\u95e8\u5e97",
      "status": false,
      "phoneNumber": "111",
      "address": "\u6d4b\u8bd5",
      "bossId": "4",
      "bossInfo": {
        "id": "33",
        "userName": "xiaoyuge222",
        "password": "111",
        "realName": "",
        "otime": "2020-09-13 20:34:13"
      }
    }, {
      "id": "3",
      "storeName": "\u7ea2\u65e5\u68a61",
      "status": true,
      "phoneNumber": "15598476380",
      "address": "eeee",
      "bossId": "3",
      "bossInfo": {
        "id": "32",
        "userName": "xiaoyuge",
        "password": "111",
        "realName": "",
        "otime": "2020-09-13 19:55:38"
      }
    }, {
      "id": "2",
      "storeName": "\u767d\u65e5\u68a611",
      "status": false,
      "phoneNumber": "138234234",
      "address": "\u56de\u9f99\u89c2",
      "bossId": "2",
      "bossInfo": {
        "id": "31",
        "userName": "xiaoyu",
        "password": "123",
        "realName": "",
        "otime": "2020-09-13 19:50:48"
      }
    }, {
      "id": "1",
      "storeName": "\u767d\u65e5\u68a6",
      "status": true,
      "phoneNumber": "138181818",
      "address": "111122xxx",
      "bossId": "1",
      "bossInfo": {
        "id": "30",
        "userName": "marui",
        "password": "marui",
        "realName": "",
        "otime": "2020-09-13 19:49:32"
      }
    }],
    "time": "2021-02-21 23:46:21",
    "pageCount": 1,
    "total": 4
  },

  // 支持值为 Object 和 Array
  'POST /app/user/add-store': {
    code: '10200',
    msg: 'success',
    time: '2020-01-01 00:00:00',
    data: [],
  },

  // 支持值为 Object 和 Array
  'POST /app/user/edit-store': {
    code: '10200',
    msg: 'success',
    time: '2020-01-01 00:00:00',
    data: [],
  },
};
