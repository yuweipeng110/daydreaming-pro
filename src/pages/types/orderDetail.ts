import { IUserTable } from '@/pages/types/user';
import { IOrderTable } from '@/pages/types/order';
import { IOrderDetailIntegralTable } from '@/pages/types/orderDetailIntegral';

// userSelectList temp
export interface IOrderDetailTable {
  id: number;
  orderId?: number;
  orderInfo?: IOrderTable;
  userId: number;
  userInfo?: IUserTable;
  unitPrice?: number;
  isPay?: boolean;
  discount?: number;
  /// extend
  discountPrice?: number;
  discountPercentage?: number;
  orderDetailIntegralList?: IOrderDetailIntegralTable[];
}

