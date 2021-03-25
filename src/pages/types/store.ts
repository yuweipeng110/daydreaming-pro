import { IResponse } from '@/pages/types/public';
import { ISystemUserTable } from '@/pages/types/user';

export interface IStoreTable {
  id: number;
  storeName: string;
  status: boolean;
  phoneNumber: string;
  address: string;
  bossId: number;
  bossInfo?: ISystemUserTable;
}

export interface IStoreResponse extends IResponse {
  data: IStoreTable[];
}

export interface IAddStoreResponse extends IResponse {
  data: IAddStoreExists
}

export interface IAddStoreExists {
  userNameExists?: boolean;
  storeNameExists: boolean;
}
