import { IResponse } from '@/pages/types/public';
import { IScriptTable } from '@/pages/types/script';
import { IDeskTable } from '@/pages/types/desk';
import { IUserTable } from '@/pages/types/user';
import { IOrderDetailTable } from '@/pages/types/orderDetail';

export interface IOrderTable {
  id: number;
  orderNo: string;
  scriptId: number;
  scriptInfo: IScriptTable;
  deskId: number;
  deskInfo: IDeskTable;
  hostId: number;
  hostInfo: IUserTable;
  receivableMoney: number;
  realMoney: number;
  orderOperatorId: number;
  orderOperatorInfo: IUserTable;
  orderTime: string;
  settlementTime: string;
  status: number;
  statusDescription: string;
  remark: string;
  detailList?: IOrderDetailTable[];
}

export interface IOrderResponse extends IResponse {
  data: IOrderTable[];
}

export interface IAddOrderResponse extends IResponse {
  data: [];
}

export interface ISettlementOrderResponse extends IResponse {
  data: [];
}
