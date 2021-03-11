import { Reducer } from 'redux';
import _ from 'lodash';
import { Effect } from '@/models/connect';
import * as playerService from '@/services/player';
import { IAddUserResponse, IUserResponse, IUserTable } from '@/pages/types/user';
import { STATUS_CODE } from '@/pages/constants';

export interface IPlayer {
  [key: string]: any;
}

export interface IPlayerModelType {
  namespace: 'player';
  state: IPlayerState;
  effects: {
    getPlayerListEffect: Effect;
    addPlayerEffect: Effect;
    editPlayerEffect: Effect;
    accountRechargeEffect: Effect;
  };
  reducers: {
    setPlayerListReducer: Reducer<IPlayer>;
  };
}

export interface IPlayerState {
  playerList: IUserTable[];
}

const partnerModel: IPlayerModelType = {
  namespace: 'player',
  state: {
    playerList: [],
  },
  effects: {
    *getPlayerListEffect({ params }, { put, call }) {
      const res: IUserResponse = yield call(playerService.queryPlayerListApi, params);
      if (_.isEmpty(res)) {
        return false;
      }
      const playerList = res.data;
      yield put({
        type: 'setPlayerListReducer',
        playerList,
      });
      return playerList;
    },
    *addPlayerEffect({ params }, { call, put }) {
      const addRes: IAddUserResponse = yield call(playerService.addPlayerApi, params);
      if (_.isEmpty(addRes)) {
        return {};
      }
      if (addRes.code === STATUS_CODE.SUCCESS) {
        yield put({
          type: 'getPlayerListEffect',
        });
        return { phoneExists: true };
      }
      if (addRes.code === STATUS_CODE.CHECK_ERROR) {
        return {
          phoneExists: addRes.data.phoneExists,
        };
      }
      return { phoneExists: true };
    },
    *editPlayerEffect({ params }, { call, put }) {
      const editRes: IAddUserResponse = yield call(playerService.editPlayerApi, params);
      if (_.isEmpty(editRes)) {
        return {};
      }
      if (editRes.code === STATUS_CODE.SUCCESS) {
        yield put({
          type: 'getPlayerListEffect',
        });
        return { phoneExists: true };
      }
      if (editRes.code === STATUS_CODE.CHECK_ERROR) {
        return {
          phoneExists: editRes.data.phoneExists,
        };
      }
      return { phoneExists: true };
    },
    *accountRechargeEffect({ params }, { call, put }) {
      const res = yield call(playerService.accountRechargeApi, params);
      if (_.isEmpty(res)) {
        return false;
      }
      if (res.code === STATUS_CODE.SUCCESS) {
        yield put({
          type: 'getPlayerListEffect',
        });
        return true;
      }
      return false;
    },
  },
  reducers: {
    setPlayerListReducer: (state, { playerList }) => {
      return { ...state, playerList };
    },
  },
};

export default partnerModel;
