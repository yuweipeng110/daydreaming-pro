import { IResponse } from '@/pages/types/public';
import { IUserTable } from '@/pages/types/user';

export interface ILoginUserTable extends IUserTable {
  userToken: string;
}

export interface ILoginCheckResponse extends IResponse {
  data: ILoginUserTable;
}
