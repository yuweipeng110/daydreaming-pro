import type { Reducer, Effect } from 'umi';
import _ from 'lodash';
import * as StoreService from '@/services/store';
import type { IAddStoreResponse, IStoreResponse, IStoreTable } from '@/pages/types/store';
import { STATUS_CODE } from '@/pages/constants';

export interface IStore {
  [key: string]: any;
}

export interface IStoreModelType {
  namespace: 'store';
  state: IStore;
  effects: {
    getStoreListEffect: Effect;
    addStoreEffect: Effect;
    editStoreEffect: Effect;
  };
  reducers: {
    setStoreListReducer: Reducer<IStore>;
  };
}

export interface IStoreState {
  storeList: IStoreTable[];
}

const partnerModel: IStoreModelType = {
  namespace: 'store',
  state: {
    storeList: [],
  },
  effects: {
    *getStoreListEffect({ params }, { call, put }) {
      const res: IStoreResponse = yield call(StoreService.queryStoreListApi, params);
      if (_.isEmpty(res)) {
        return false;
      }
      yield put({
        type: 'setStoreListReducer',
        storeList: res.data,
      });
      return true;
    },
    *addStoreEffect({ params }, { call, put }) {
      const addRes: IAddStoreResponse = yield call(StoreService.addStoreApi, params);
      if (_.isEmpty(addRes)) {
        return {};
      }
      if (addRes.code === STATUS_CODE.SUCCESS) {
        yield put({
          type: 'getStoreListEffect',
        });
        return { userNameExists: true, storeNameExists: true };
      }
      if (addRes.code === STATUS_CODE.CHECK_ERROR) {
        return {
          userNameExists: addRes.data.userNameExists,
          storeNameExists: addRes.data.storeNameExists,
        };
      }
      return { userNameExists: true, storeNameExists: true };
    },
    *editStoreEffect({ params }, { call, put }) {
      const editRes: IAddStoreResponse = yield call(StoreService.editStoreApi, params);
      if (_.isEmpty(editRes)) {
        return {};
      }
      if (editRes.code === STATUS_CODE.SUCCESS) {
        yield put({
          type: 'getStoreListEffect',
        });
        return { storeNameExists: true };
      }
      if (editRes.code === STATUS_CODE.CHECK_ERROR) {
        return {
          storeNameExists: editRes.data.storeNameExists,
        };
      }
      return { storeNameExists: true };
    },
  },
  reducers: {
    setStoreListReducer: (state, { storeList }) => {
      return { ...state, storeList };
    },
  },
};

export default partnerModel;
