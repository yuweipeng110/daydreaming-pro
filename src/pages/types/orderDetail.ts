import { IUserTable } from '@/pages/types/user';
import { IOrderTable } from '@/pages/types/order';
import { IOrderDetailIntegralTable } from '@/pages/types/orderDetailIntegral';

export interface IOrderDetailTable {
  orderId?: string;
  orderInfo?: IOrderTable;
  userId?: string;
  userInfo?: IUserTable;
  unitPrice?: number;
  isPay?: boolean;
  discount?: number;
  id?: string;
  key?: string;
  /// params
  discountPrice?: number;
  orderDetailIntegralList?: IOrderDetailIntegralTable[];
}
