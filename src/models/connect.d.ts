import { EffectsCommandMap } from 'dva';
import { Action, AnyAction  } from 'redux';
import { RouterTypes } from 'umi';
import { call } from 'redux-saga/effects';
import type { MenuDataItem, Settings as ProSettings } from '@ant-design/pro-layout';
import { GlobalModelState } from './global';
import { UserModelState } from './user';
import type { StateType } from './login';

export { GlobalModelState, UserModelState };

export type Loading = {
  global: boolean;
  effects: Record<string, boolean | undefined>;
  models: {
    global?: boolean;
    menu?: boolean;
    setting?: boolean;
    user?: boolean;
    login?: boolean;
    store?: boolean;
    desk?: boolean;
  };
};

export type ConnectState = {
  global: GlobalModelState;
  loading: Loading;
  settings: ProSettings;
  user: UserModelState;
  login: StateType;
  store: IStoreState;
  desk: IDeskState;
};

export type Route = {
  routes?: Route[];
} & MenuDataItem;


export type Effect = (
  action: AnyAction,
  effects: Omit<EffectsCommandMap, 'call'> & { select: <T>(func: (state: ConnectState) => T) => T; call: typeof call }
) => void;

/**
 * @type P: Type of payload
 * @type C: Type of callback
 */
export type Dispatch = <P = Action, C = (payload: P) => void>(action: {
  type: string;
  payload?: P;
  callback?: C;
  [key: string]: any;
}) => any;

/**
 * @type T: Params matched in dynamic routing
 */
export interface ConnectProps<T extends { [key: string]: any } = {}> extends Partial<RouterTypes<Route>> {
  dispatch: Dispatch;
}
