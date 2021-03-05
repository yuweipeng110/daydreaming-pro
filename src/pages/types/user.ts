import { IResponse } from '@/pages/types/public';

export interface ISystemUserTable {
  userName: string;
  password: string;
  realName: string;
}

export interface IUserTable {
  role: string;
  storeId: string;
  nickname: string;
  sex: number;
  phone: string;
  birthday: string;
  remark: string;
  accountBalance: string;
  voucherBalance: string;
  killerIntegral: number;
  killerRanking: number;
  killerTitle: string;
  detectiveIntegral: number;
  detectiveRanking: number;
  detectiveTitle: string;
  peopleIntegral: number;
  peopleRanking: number;
  peopleTitle: string;
  totalIntegral: number;
  totalRanking: number;
  totalTitle: string;
  activeIntegral: number;
  otime: string;
  id: number;
  key: string;
}

export interface IUserResponse extends IResponse {
  data: IUserTable[];
  dataCount: number;
  pageCount: number;
}

export interface IAddUserExists {
  phoneExists: boolean;
}

export interface IAddUserResponse extends IResponse {
  data: IAddUserExists;
}

export interface ISearchUser {
  currentPage: number;
  pageRecords: number;
  storeId?: string;
  name?: string;
  phoneNumber?: string;
}
