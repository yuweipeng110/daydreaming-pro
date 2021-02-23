export default {
  // 支持值为 Object 和 Array
  'GET /app/desk/get-desk-list': {
    "code": 10200,
    "msg": "\u6210\u529f",
    "data": [{
      "id": "55",
      "title": "\u6807\u989850",
      "isEnabled": false,
      "storeId": "1",
      "storeName": "\u767d\u65e5\u68a6",
      "otime": "2021-01-11 16:32:02"
    }, {
      "id": "40",
      "title": "\u6807\u989835",
      "isEnabled": true,
      "storeId": "1",
      "storeName": "\u767d\u65e5\u68a6",
      "otime": "2021-01-11 16:32:02"
    }, {
      "id": "39",
      "title": "\u6807\u989834",
      "isEnabled": true,
      "storeId": "1",
      "storeName": "\u767d\u65e5\u68a6",
      "otime": "2021-01-11 16:32:02"
    }, {
      "id": "38",
      "title": "\u6807\u989833",
      "isEnabled": true,
      "storeId": "1",
      "storeName": "\u767d\u65e5\u68a6",
      "otime": "2021-01-11 16:32:02"
    }, {
      "id": "37",
      "title": "\u6807\u989832",
      "isEnabled": true,
      "storeId": "1",
      "storeName": "\u767d\u65e5\u68a6",
      "otime": "2021-01-11 16:32:02"
    }, {
      "id": "36",
      "title": "\u6807\u989831",
      "isEnabled": true,
      "storeId": "1",
      "storeName": "\u767d\u65e5\u68a6",
      "otime": "2021-01-11 16:32:02"
    }, {
      "id": "35",
      "title": "\u6807\u989830",
      "isEnabled": true,
      "storeId": "1",
      "storeName": "\u767d\u65e5\u68a6",
      "otime": "2021-01-11 16:32:02"
    }, {
      "id": "34",
      "title": "\u6807\u989829",
      "isEnabled": true,
      "storeId": "1",
      "storeName": "\u767d\u65e5\u68a6",
      "otime": "2021-01-11 16:32:02"
    }, {
      "id": "33",
      "title": "\u6807\u989828",
      "isEnabled": true,
      "storeId": "1",
      "storeName": "\u767d\u65e5\u68a6",
      "otime": "2021-01-11 16:32:02"
    }, {
      "id": "29",
      "title": "\u6807\u989827",
      "isEnabled": true,
      "storeId": "1",
      "storeName": "\u767d\u65e5\u68a6",
      "otime": "2021-01-11 16:32:02"
    }],
    "time": "2021-02-19 23:48:42",
    "total": 55
  },

  // 支持值为 Object 和 Array
  'POST /app/desk/add-desk': {
    code: '10200',
    msg: 'success',
    time: '2020-01-01 00:00:00',
    data: [],
  },

  // 支持值为 Object 和 Array
  'POST /app/desk/edit-desk': {
    code: '10200',
    msg: 'success',
    time: '2020-01-01 00:00:00',
    data: [],
  },

  // 支持值为 Object 和 Array
  'GET /app/desk/get-desk-order-list': {
    "code": 10200,
    "msg": "\u6210\u529f",
    "data": [{
      "id": "54",
      "title": "\u6807\u989849",
      "isEnabled": true,
      "storeId": "1",
      "storeName": "\u767d\u65e5\u68a6",
      "otime": "2021-01-11 16:32:02",
      "orderInfo": {
        "id": "12",
        "orderNo": "1613900807891",
        "scriptId": "38",
        "scriptInfo": {
          "id": "38",
          "title": "title35",
          "storeId": "1",
          "type": "\u7c7b\u578b35",
          "amount": "1",
          "image": "",
          "costPrice": "35.00",
          "formatPrice": "35.00",
          "description": "\u63cf\u8ff035",
          "applicableNumber": "35",
          "gameTime": "35",
          "isAdapt": false,
          "adaptContent": "",
          "content": "",
          "otime": "2021-01-11 15:30:41"
        },
        "scriptTitle": "title35",
        "storeId": "1",
        "deskId": "54",
        "deskInfo": {
          "id": "54",
          "title": "\u6807\u989849",
          "isEnabled": true,
          "storeId": "1",
          "storeName": "\u767d\u65e5\u68a6",
          "otime": "2021-01-11 16:32:02"
        },
        "hostId": "2",
        "hostInfo": {
          "id": "2",
          "role": "2",
          "storeId": "1",
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
        },
        "receivableMoney": "70.00",
        "realMoney": 0,
        "orderOperatorId": "1",
        "orderOperatorInfo": {
          "id": "1",
          "role": "1",
          "storeId": "1",
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
        "orderTime": "2021-02-21 17:46:47",
        "settlementTime": "0000-00-00 00:00:00",
        "status": "10",
        "statusDescription": "\u8fdb\u884c\u4e2d",
        "remark": "999",
        "otime": "2021-02-21 17:46:47",
        "detailList": [{
          "id": "111",
          "orderId": "12",
          "userId": "2",
          "userInfo": {
            "id": "2",
            "role": "2",
            "storeId": "1",
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
          },
          "unitPrice": "35.00",
          "isPay": "1",
          "discount": "1.00",
          "otime": "2021-02-21 17:46:47"
        }, {
          "id": "112",
          "orderId": "12",
          "userId": "1",
          "userInfo": {
            "id": "1",
            "role": "1",
            "storeId": "1",
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
          "unitPrice": "35.00",
          "isPay": "1",
          "discount": "1.00",
          "otime": "2021-02-21 17:46:47"
        }]
      }
    }, {
      "id": "53",
      "title": "\u6807\u989848",
      "isEnabled": true,
      "storeId": "1",
      "storeName": "\u767d\u65e5\u68a6",
      "otime": "2021-01-11 16:32:02",
      "orderInfo": []
    }, {
      "id": "52",
      "title": "\u6807\u989847",
      "isEnabled": true,
      "storeId": "1",
      "storeName": "\u767d\u65e5\u68a6",
      "otime": "2021-01-11 16:32:02",
      "orderInfo": []
    }, {
      "id": "51",
      "title": "\u6807\u989846",
      "isEnabled": true,
      "storeId": "1",
      "storeName": "\u767d\u65e5\u68a6",
      "otime": "2021-01-11 16:32:02",
      "orderInfo": []
    }, {
      "id": "50",
      "title": "\u6807\u989845",
      "isEnabled": true,
      "storeId": "1",
      "storeName": "\u767d\u65e5\u68a6",
      "otime": "2021-01-11 16:32:02",
      "orderInfo": []
    }, {
      "id": "49",
      "title": "\u6807\u989844",
      "isEnabled": true,
      "storeId": "1",
      "storeName": "\u767d\u65e5\u68a6",
      "otime": "2021-01-11 16:32:02",
      "orderInfo": []
    }, {
      "id": "48",
      "title": "\u6807\u989843",
      "isEnabled": true,
      "storeId": "1",
      "storeName": "\u767d\u65e5\u68a6",
      "otime": "2021-01-11 16:32:02",
      "orderInfo": []
    }, {
      "id": "47",
      "title": "\u6807\u989842",
      "isEnabled": true,
      "storeId": "1",
      "storeName": "\u767d\u65e5\u68a6",
      "otime": "2021-01-11 16:32:02",
      "orderInfo": []
    }, {
      "id": "46",
      "title": "\u6807\u989841",
      "isEnabled": true,
      "storeId": "1",
      "storeName": "\u767d\u65e5\u68a6",
      "otime": "2021-01-11 16:32:02",
      "orderInfo": []
    }, {
      "id": "45",
      "title": "\u6807\u989840",
      "isEnabled": true,
      "storeId": "1",
      "storeName": "\u767d\u65e5\u68a6",
      "otime": "2021-01-11 16:32:02",
      "orderInfo": []
    }, {
      "id": "44",
      "title": "\u6807\u989839",
      "isEnabled": true,
      "storeId": "1",
      "storeName": "\u767d\u65e5\u68a6",
      "otime": "2021-01-11 16:32:02",
      "orderInfo": []
    }, {
      "id": "43",
      "title": "\u6807\u989838",
      "isEnabled": true,
      "storeId": "1",
      "storeName": "\u767d\u65e5\u68a6",
      "otime": "2021-01-11 16:32:02",
      "orderInfo": []
    }, {
      "id": "42",
      "title": "\u6807\u989837",
      "isEnabled": true,
      "storeId": "1",
      "storeName": "\u767d\u65e5\u68a6",
      "otime": "2021-01-11 16:32:02",
      "orderInfo": []
    }, {
      "id": "41",
      "title": "\u6807\u989836",
      "isEnabled": true,
      "storeId": "1",
      "storeName": "\u767d\u65e5\u68a6",
      "otime": "2021-01-11 16:32:02",
      "orderInfo": []
    }, {
      "id": "40",
      "title": "\u6807\u989835",
      "isEnabled": true,
      "storeId": "1",
      "storeName": "\u767d\u65e5\u68a6",
      "otime": "2021-01-11 16:32:02",
      "orderInfo": []
    }, {
      "id": "39",
      "title": "\u6807\u989834",
      "isEnabled": true,
      "storeId": "1",
      "storeName": "\u767d\u65e5\u68a6",
      "otime": "2021-01-11 16:32:02",
      "orderInfo": []
    }, {
      "id": "38",
      "title": "\u6807\u989833",
      "isEnabled": true,
      "storeId": "1",
      "storeName": "\u767d\u65e5\u68a6",
      "otime": "2021-01-11 16:32:02",
      "orderInfo": []
    }, {
      "id": "37",
      "title": "\u6807\u989832",
      "isEnabled": true,
      "storeId": "1",
      "storeName": "\u767d\u65e5\u68a6",
      "otime": "2021-01-11 16:32:02",
      "orderInfo": []
    }, {
      "id": "36",
      "title": "\u6807\u989831",
      "isEnabled": true,
      "storeId": "1",
      "storeName": "\u767d\u65e5\u68a6",
      "otime": "2021-01-11 16:32:02",
      "orderInfo": []
    }, {
      "id": "35",
      "title": "\u6807\u989830",
      "isEnabled": true,
      "storeId": "1",
      "storeName": "\u767d\u65e5\u68a6",
      "otime": "2021-01-11 16:32:02",
      "orderInfo": []
    }, {
      "id": "34",
      "title": "\u6807\u989829",
      "isEnabled": true,
      "storeId": "1",
      "storeName": "\u767d\u65e5\u68a6",
      "otime": "2021-01-11 16:32:02",
      "orderInfo": []
    }, {
      "id": "33",
      "title": "\u6807\u989828",
      "isEnabled": true,
      "storeId": "1",
      "storeName": "\u767d\u65e5\u68a6",
      "otime": "2021-01-11 16:32:02",
      "orderInfo": []
    }, {
      "id": "32",
      "title": "\u6807\u989827",
      "isEnabled": true,
      "storeId": "1",
      "storeName": "\u767d\u65e5\u68a6",
      "otime": "2021-01-11 16:32:02",
      "orderInfo": []
    }, {
      "id": "31",
      "title": "\u6807\u9898260",
      "isEnabled": true,
      "storeId": "1",
      "storeName": "\u767d\u65e5\u68a6",
      "otime": "2021-01-11 16:32:02",
      "orderInfo": []
    }, {
      "id": "30",
      "title": "\u6807\u989825",
      "isEnabled": true,
      "storeId": "1",
      "storeName": "\u767d\u65e5\u68a6",
      "otime": "2021-01-11 16:32:02",
      "orderInfo": []
    }, {
      "id": "29",
      "title": "\u6807\u989824",
      "isEnabled": true,
      "storeId": "1",
      "storeName": "\u767d\u65e5\u68a6",
      "otime": "2021-01-11 16:32:02",
      "orderInfo": []
    }, {
      "id": "28",
      "title": "\u6807\u989823",
      "isEnabled": true,
      "storeId": "1",
      "storeName": "\u767d\u65e5\u68a6",
      "otime": "2021-01-11 16:32:02",
      "orderInfo": []
    }, {
      "id": "27",
      "title": "\u6807\u989822",
      "isEnabled": true,
      "storeId": "1",
      "storeName": "\u767d\u65e5\u68a6",
      "otime": "2021-01-11 16:32:02",
      "orderInfo": []
    }, {
      "id": "26",
      "title": "\u6807\u989821",
      "isEnabled": true,
      "storeId": "1",
      "storeName": "\u767d\u65e5\u68a6",
      "otime": "2021-01-11 16:32:02",
      "orderInfo": []
    }, {
      "id": "25",
      "title": "\u6807\u989820",
      "isEnabled": true,
      "storeId": "1",
      "storeName": "\u767d\u65e5\u68a6",
      "otime": "2021-01-11 16:32:02",
      "orderInfo": []
    }, {
      "id": "24",
      "title": "\u6807\u989819",
      "isEnabled": true,
      "storeId": "1",
      "storeName": "\u767d\u65e5\u68a6",
      "otime": "2021-01-11 16:32:02",
      "orderInfo": []
    }, {
      "id": "23",
      "title": "\u6807\u989818",
      "isEnabled": true,
      "storeId": "1",
      "storeName": "\u767d\u65e5\u68a6",
      "otime": "2021-01-11 16:32:02",
      "orderInfo": []
    }, {
      "id": "22",
      "title": "\u6807\u989817",
      "isEnabled": true,
      "storeId": "1",
      "storeName": "\u767d\u65e5\u68a6",
      "otime": "2021-01-11 16:32:02",
      "orderInfo": []
    }, {
      "id": "21",
      "title": "\u6807\u989816",
      "isEnabled": true,
      "storeId": "1",
      "storeName": "\u767d\u65e5\u68a6",
      "otime": "2021-01-11 16:32:02",
      "orderInfo": []
    }, {
      "id": "20",
      "title": "\u6807\u989815",
      "isEnabled": true,
      "storeId": "1",
      "storeName": "\u767d\u65e5\u68a6",
      "otime": "2021-01-11 16:32:02",
      "orderInfo": []
    }, {
      "id": "19",
      "title": "\u6807\u989814",
      "isEnabled": true,
      "storeId": "1",
      "storeName": "\u767d\u65e5\u68a6",
      "otime": "2021-01-11 16:32:02",
      "orderInfo": []
    }, {
      "id": "18",
      "title": "\u6807\u989813",
      "isEnabled": true,
      "storeId": "1",
      "storeName": "\u767d\u65e5\u68a6",
      "otime": "2021-01-11 16:32:02",
      "orderInfo": []
    }, {
      "id": "17",
      "title": "\u6807\u989812",
      "isEnabled": true,
      "storeId": "1",
      "storeName": "\u767d\u65e5\u68a6",
      "otime": "2021-01-11 16:32:02",
      "orderInfo": []
    }, {
      "id": "16",
      "title": "\u6807\u989811",
      "isEnabled": true,
      "storeId": "1",
      "storeName": "\u767d\u65e5\u68a6",
      "otime": "2021-01-11 16:32:02",
      "orderInfo": []
    }, {
      "id": "15",
      "title": "\u6807\u989810",
      "isEnabled": true,
      "storeId": "1",
      "storeName": "\u767d\u65e5\u68a6",
      "otime": "2021-01-11 16:32:02",
      "orderInfo": []
    }, {
      "id": "14",
      "title": "\u6807\u98989",
      "isEnabled": true,
      "storeId": "1",
      "storeName": "\u767d\u65e5\u68a6",
      "otime": "2021-01-11 16:32:02",
      "orderInfo": []
    }, {
      "id": "13",
      "title": "\u6807\u98988",
      "isEnabled": true,
      "storeId": "1",
      "storeName": "\u767d\u65e5\u68a6",
      "otime": "2021-01-11 16:32:02",
      "orderInfo": []
    }, {
      "id": "12",
      "title": "\u6807\u98987",
      "isEnabled": true,
      "storeId": "1",
      "storeName": "\u767d\u65e5\u68a6",
      "otime": "2021-01-11 16:32:02",
      "orderInfo": []
    }, {
      "id": "11",
      "title": "\u6807\u98986",
      "isEnabled": true,
      "storeId": "1",
      "storeName": "\u767d\u65e5\u68a6",
      "otime": "2021-01-11 16:32:02",
      "orderInfo": []
    }, {
      "id": "10",
      "title": "\u6807\u98985",
      "isEnabled": true,
      "storeId": "1",
      "storeName": "\u767d\u65e5\u68a6",
      "otime": "2021-01-11 16:32:02",
      "orderInfo": []
    }, {
      "id": "9",
      "title": "\u6807\u98984",
      "isEnabled": true,
      "storeId": "1",
      "storeName": "\u767d\u65e5\u68a6",
      "otime": "2021-01-11 16:32:02",
      "orderInfo": []
    }, {
      "id": "8",
      "title": "\u6807\u98983",
      "isEnabled": true,
      "storeId": "1",
      "storeName": "\u767d\u65e5\u68a6",
      "otime": "2021-01-11 16:32:02",
      "orderInfo": []
    }, {
      "id": "7",
      "title": "\u6807\u98982",
      "isEnabled": true,
      "storeId": "1",
      "storeName": "\u767d\u65e5\u68a6",
      "otime": "2021-01-11 16:32:02",
      "orderInfo": []
    }, {
      "id": "6",
      "title": "\u6807\u98981",
      "isEnabled": true,
      "storeId": "1",
      "storeName": "\u767d\u65e5\u68a6",
      "otime": "2021-01-11 16:32:02",
      "orderInfo": []
    }, {
      "id": "5",
      "title": "\u6807\u98980",
      "isEnabled": true,
      "storeId": "1",
      "storeName": "\u767d\u65e5\u68a6",
      "otime": "2021-01-11 16:32:02",
      "orderInfo": []
    }, {
      "id": "4",
      "title": "\u4f60\u7684\u540d\u5b57",
      "isEnabled": true,
      "storeId": "1",
      "storeName": "\u767d\u65e5\u68a6",
      "otime": "2020-11-12 16:41:54",
      "orderInfo": []
    }, {
      "id": "3",
      "title": "2\u53f7\u95f4",
      "isEnabled": true,
      "storeId": "1",
      "storeName": "\u767d\u65e5\u68a6",
      "otime": "2020-11-12 16:15:19",
      "orderInfo": []
    }, {
      "id": "1",
      "title": "4\u53f7\u95f4",
      "isEnabled": true,
      "storeId": "1",
      "storeName": "\u767d\u65e5\u68a6",
      "otime": "2020-11-04 00:00:00",
      "orderInfo": []
    }],
    "time": "2021-02-21 23:30:43",
    "pageCount": 1,
    "total": 53
  }
};