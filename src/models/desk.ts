import type { Reducer } from 'redux';
import type { Effect } from '@/models/connect';
import _ from 'lodash';
import type { IAddDeskResponse, IDeskResponse, IDeskTable } from '@/pages/types/desk';
import * as deskService from '@/services/desk';
import { STATUS_CODE } from '@/pages/constants';

export type IDesk = Record<string, any>;

export interface IDeskModeType {
  namespace: 'desk';
  state: IDeskState;
  effects: {
    getDeskListEffect: Effect;
    addDeskEffect: Effect;
    editDeskEffect: Effect;
    getOrderDeskListEffect: Effect;
  };
  reducers: {
    setDeskListReducer: Reducer<IDesk>;
    setDeskOrderListReducer: Reducer<IDesk>;
  };
}

export interface IDeskState {
  deskList: IDeskTable[];
  deskOrderList: IDeskTable[];
}

const partnerModel: IDeskModeType = {
  namespace: 'desk',
  state: {
    deskList: [],
    deskOrderList: [],
  },
  effects: {
    *getDeskListEffect({ params }, { put, call }) {
      const res: IDeskResponse = yield call(deskService.queryDeskListApi, params);
      if (_.isEmpty(res)) {
        return;
      }
      yield put({
        type: 'setDeskListReducer',
        deskList: res.data,
      });
    },
    *addDeskEffect({ params }, { put, call }) {
      const addRes: IAddDeskResponse = yield call(deskService.addDeskApi, params);
      if (_.isEmpty(addRes)) {
        return false;
      }
      if (addRes.code === STATUS_CODE.SUCCESS) {
        yield put({
          type: 'getDeskListEffect',
        });
        return true;
      }
      return false;
    },
    *editDeskEffect({ params }, { put, call }) {
      const editRes: IAddDeskResponse = yield call(deskService.editDeskApi, params);
      if (_.isEmpty(editRes)) {
        return false;
      }
      if (editRes.code === STATUS_CODE.SUCCESS) {
        yield put({
          type: 'getDeskListEffect',
        });
        return true;
      }
      return false;
    },
    *getOrderDeskListEffect({ params }, { put, call }) {
      const res: IDeskResponse = yield call(deskService.queryOrderDeskListApi, params);
      if (_.isEmpty(res)) {
        return;
      }
      yield put({
        type: 'setDeskOrderListReducer',
        deskOrderList: res.data,
      });
    },
  },
  reducers: {
    setDeskListReducer: (state, { deskList }) => {
      return { ...state, deskList };
    },
    setDeskOrderListReducer: (state, { deskOrderList }) => {
      return { ...state, deskOrderList };
    },
  },
};

export default partnerModel;
