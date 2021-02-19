import { IResponse } from '@/pages/types/public';
import { IOrderTable } from '@/pages/types/order';
import { IStoreTable } from '@/pages/types/store';

export interface IDeskTable {
  title: string;
  storeId: string;
  storeInfo: IStoreTable;
  // storeName: string;
  orderInfo: IOrderTable;
  isEnabled: boolean;
  id?: string;
  key?: string;
}

export interface IDeskResponse extends IResponse {
  data: IDeskTable[];
  dataCount: number;
  pageCount: number;
}

export interface IAddDeskResponse extends IResponse {
  data: [];
}
