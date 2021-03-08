import { IUserTable } from "@/pages/types/user";
import { IStoreTable } from "@/pages/types/store";
import { IOrderTable } from "@/pages/types/order";
import { IResponse } from "@/pages/types/public";

export interface IRevenueTable {
  id: number;
  userId: number;
  userInfo?: IUserTable;
  changeMoney: number;
  changeTime: string;
  remarkIncrease: string;
  remarkReduce: string;
  changeType: number;
  storeId: number;
  storeInfo?: IStoreTable;
  orderId: number;
  orderInfo?: IOrderTable;
  paymentMethodId: number;
  // paymentMethodInfo?
  otime: string;
}

export interface IRevenueStatistics {
  totalChangeMoney: string;
  totalDataCount: number;
  totalOrderCount: number;
}

export interface IRevenueResponse extends IResponse {
  data: IRevenueTable[];
  total: number;
  statisticsData: IRevenueStatistics;
}
