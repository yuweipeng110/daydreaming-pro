import { IResponse } from '@/pages/types/public';

export interface ISystemUserTable {
  userName: string;
  password: string;
  realName: string;
}

export interface IUserTable {
  id: number;
  role: number;
  storeId: number;
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
}

export interface IUserResponse extends IResponse {
  data: IUserTable[];
}

export interface IAddUserExists {
  phoneExists: boolean;
}

export interface IAddUserResponse extends IResponse {
  data: IAddUserExists;
}
