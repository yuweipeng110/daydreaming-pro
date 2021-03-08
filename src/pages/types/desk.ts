import { IResponse } from '@/pages/types/public';
import { IOrderTable } from '@/pages/types/order';
import { IStoreTable } from '@/pages/types/store';

export interface IDeskTable {
  id: number;
  title: string;
  storeId: string;
  storeInfo: IStoreTable;
  orderInfo: IOrderTable;
  isEnabled: boolean;
}

export interface IDeskResponse extends IResponse {
  data: IDeskTable[];
}

export interface IAddDeskResponse extends IResponse {
  data: [];
}
