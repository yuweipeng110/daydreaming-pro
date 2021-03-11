import { IResponse } from '@/pages/types/public';

export interface IPromotionsTable {
  id: number;
  title: string;
  startTime: string;
  endTime: string;
  rechargeMoney: number;
  voucherMoney: number;
  isActive: boolean;
  otime: string;
}

export interface IPromotionsResponse extends IResponse {
  data: IPromotionsTable[];
}

export interface IAddPromotionsResponse extends IResponse {
  data: [];
}
