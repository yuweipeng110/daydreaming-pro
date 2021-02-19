import { Action } from 'redux';
import { RouterTypes } from 'umi';
import type { MenuDataItem, Settings as ProSettings } from '@ant-design/pro-layout';
import { GlobalModelState } from './global';
import { UserModelState } from './user';
import type { StateType } from './login';
import { StoreModelState } from '@/models/store';

export { GlobalModelState, UserModelState, StoreModelState };

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
  };
};

export type ConnectState = {
  global: GlobalModelState;
  loading: Loading;
  settings: ProSettings;
  user: UserModelState;
  login: StateType;
  store: StoreModelState;
};

export type Route = {
  routes?: Route[];
} & MenuDataItem;

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
