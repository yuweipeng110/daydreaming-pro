import type { Effect, Reducer } from 'umi';

import { queryCurrent, query as queryUsers } from '@/services/user';

export type CurrentUser = {
  avatar?: string;
  name?: string;
  title?: string;
  group?: string;
  signature?: string;
  tags?: {
    key: string;
    label: string;
  }[];
  userid?: string;
  unreadCount?: number;
};

export type UserModelState = {
  currentUser?: CurrentUser;
};

export type UserModelType = {
  namespace: 'user';
  state: UserModelState;
  effects: {
    fetch: Effect;
    fetchCurrent: Effect;
  };
  reducers: {
    saveCurrentUser: Reducer<UserModelState>;
    changeNotifyCount: Reducer<UserModelState>;
  };
};

const UserModel: UserModelType = {
  namespace: 'user',

  state: {
    currentUser: {},
  },

  effects: {
    *fetch(_, { call, put }) {
      const response = yield call(queryUsers);
      yield put({
        type: 'save',
        payload: response,
      });
    },
    *fetchCurrent(_, { call, put }) {
      const response = yield call(queryCurrent);
      yield put({
        type: 'saveCurrentUser',
        payload: response,
      });
    },
  },

  reducers: {
    saveCurrentUser(state, action) {
      return {
        ...state,
        currentUser: action.payload || {},
      };
    },
    changeNotifyCount(
      state = {
        currentUser: {},
      },
      action,
    ) {
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          notifyCount: action.payload.totalCount,
          unreadCount: action.payload.unreadCount,
        },
      };
    },
  },
};

export default UserModel;

// import { Reducer } from 'redux';
// import _ from 'lodash';
// import { Effect } from '@/models/connect';
// import * as userService from '@/services/user';
// import { IUserResponse, IUserTable } from '@/pages/types/user';
//
// export interface IUser {
//   [key: string]: any;
// }
//
// export interface IUserModelType {
//   namespace: 'user';
//   state: IUserState;
//   effects: {
//     getUserListEffect: Effect;
//   };
//   reducers: {
//     setUserListReducer: Reducer<IUser>;
//   };
// }
//
// export interface IUserState {
//   userList: IUserTable[];
// }
//
// const partnerModel: IUserModelType = {
//   namespace: 'user',
//   state: {
//     userList: [],
//   },
//   effects: {
//     *getUserListEffect({ params }, { put , call }) {
//       const res: IUserResponse = yield call(userService.queryUserListApi, params);
//       if (_.isEmpty(res)) {
//         return false;
//       }
//       const userList = res.data;
//       yield put({
//         type: 'setUserListReducer',
//         userList,
//       });
//       return userList;
//     }
//   },
//   reducers: {
//     setUserListReducer: (state, { userList }) => {
//       return { ...state, userList };
//     }
//   }
// };
//
// export default partnerModel;
