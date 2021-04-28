// import { stringify } from 'querystring';
// import type { Reducer, Effect } from 'umi';
// import { history } from 'umi';
//
// import { fakeAccountLogin } from '@/services/login';
// import { setAuthority } from '@/utils/authority';
// import { getPageQuery } from '@/utils/utils';
// import { message } from 'antd';
//
// export type StateType = {
//   status?: 'ok' | 'error';
//   type?: string;
//   currentAuthority?: 'user' | 'guest' | 'admin';
// };
//
// export type LoginModelType = {
//   namespace: string;
//   state: StateType;
//   effects: {
//     login: Effect;
//     logout: Effect;
//   };
//   reducers: {
//     changeLoginStatus: Reducer<StateType>;
//   };
// };
//
// const Model: LoginModelType = {
//   namespace: 'login',
//
//   state: {
//     status: undefined,
//   },
//
//   effects: {
//     *login({ payload }, { call, put }) {
//       const response = yield call(fakeAccountLogin, payload);
//       yield put({
//         type: 'changeLoginStatus',
//         payload: response,
//       });
//       // Login successfully
//       if (response.status === 'ok') {
//         const urlParams = new URL(window.location.href);
//         const params = getPageQuery();
//         message.success('🎉 🎉 🎉  登录成功！');
//         let { redirect } = params as { redirect: string };
//         if (redirect) {
//           const redirectUrlParams = new URL(redirect);
//           if (redirectUrlParams.origin === urlParams.origin) {
//             redirect = redirect.substr(urlParams.origin.length);
//             if (redirect.match(/^\/.*#/)) {
//               redirect = redirect.substr(redirect.indexOf('#') + 1);
//             }
//           } else {
//             window.location.href = '/';
//             return;
//           }
//         }
//         history.replace(redirect || '/');
//       }
//     },
//
//     logout() {
//       const { redirect } = getPageQuery();
//       // Note: There may be security issues, please note
//       if (window.location.pathname !== '/user/login' && !redirect) {
//         history.replace({
//           pathname: '/user/login',
//           search: stringify({
//             redirect: window.location.href,
//           }),
//         });
//       }
//     },
//   },
//
//   reducers: {
//     changeLoginStatus(state, { payload }) {
//       setAuthority(payload.currentAuthority);
//       return {
//         ...state,
//         status: payload.status,
//         type: payload.type,
//       };
//     },
//   },
// };
//
// export default Model;

import { Reducer } from 'redux';
import { Effect } from '@/models/connect';
import { history } from 'umi';
import { STATUS_CODE } from '@/pages/constants';
import { ILoginCheckResponse, ILoginUserTable } from '@/pages/types/login';
import * as loginService from '@/services/login';
import storage from '@/utils/storage';
import { getPageQuery } from '@/utils/utils';
import { stringify } from 'querystring';
import _ from 'lodash';
import { setAuthority } from '@/utils/authority';

export interface IUser {
  [key: string]: any;
}

// export type StateType = {
//   status?: 'ok' | 'error';
//   type?: string;
//   currentAuthority?: 'user' | 'guest' | 'admin';
// };

export interface ILoginModeType {
  namespace: 'login';
  state: ILoginUserState;
  effects: {
    loginCheckEffect: Effect;
    logoutEffect: Effect;
  };
  reducers: {
    setLoginUserReducer: Reducer<IUser>;
  };
}

export interface ILoginUserState {
  loginUserInfo: ILoginUserTable;
}

const partnerModel: ILoginModeType = {
  namespace: 'login',
  state: {
    loginUserInfo: {} as ILoginUserTable,
  },
  effects: {
    *loginCheckEffect({ params }, { put, call }) {
      const res: ILoginCheckResponse = yield call(loginService.loginCheckApi, params);
      if (_.isEmpty(res)) {
        return false;
      }
      // Login successfully
      if (Number(res.code) === STATUS_CODE.SUCCESS) {
        storage.saveUserToken(res.data.userToken);
        if (res.data.storeId === 1 && res.data.role === 1) {
          setAuthority('admin');
        } else {
          setAuthority('guest');
        }
        yield put({
          type: 'setLoginUserReducer',
          loginUserInfo: res.data,
        });
        return true;
      }
      return false;
    },

    logoutEffect() {
      const { redirect } = getPageQuery();
      // Note: There may be security issues, please note
      if (window.location.pathname !== '/login' && !redirect) {
        storage.removeUserToken();
        history.replace({
          pathname: '/login',
          search: stringify({
            redirect: window.location.href,
          }),
        });
      }
    },
  },
  reducers: {
    setLoginUserReducer: (state, { loginUserInfo }) => {
      return { ...state, loginUserInfo };
    },
  },
};

export default partnerModel;
