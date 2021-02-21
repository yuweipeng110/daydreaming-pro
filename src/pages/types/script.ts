import { IResponse } from '@/pages/types/public';

export interface IScriptTable {
  title?: string;
  type: string;
  amount: number;
  costPrice: number;
  formatPrice: number;
  description: string;
  applicableNumber: number;
  gameTime: number;
  isAdapt?: boolean;
  adaptContent: string;
  content: string;
  id?: string;
  key?: string;
}

export interface IScriptResponse extends IResponse {
  data: IScriptTable[];
  total: number;
}

export interface IAddScriptResponse extends IResponse {
  data: [];
}

export interface ISearchScript {
  currentPage: number;
  pageRecords: number;
  storeId?: number;
  title?: string;
  type?: string;
  applicableNumber?: number;
  isAdapt?: boolean;
}
