import { IResponse } from '@/pages/types/public';

export interface IRoleTable {
  id: number;
  title: string;
  maxAddIntegral: number;
}

export interface IRoleResponse extends IResponse {
  data: IRoleTable[];
}
