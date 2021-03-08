import { IResponse } from '@/pages/types/public';

export interface IScriptTable {
  id: number;
  title: string;
  storeId: number;
  type: string;
  amount: number;
  costPrice: number;
  formatPrice: number;
  description: string;
  applicableNumber: number;
  gameTime: number;
  isAdapt: boolean;
  adaptContent: string;
  content: string;
}

export interface IScriptResponse extends IResponse {
  data: IScriptTable[];
}

export interface IAddScriptResponse extends IResponse {
  data: [];
}
