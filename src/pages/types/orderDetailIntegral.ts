import { IOrderDetailTable } from '@/pages/types/orderDetail';
import { IRoleTable } from '@/pages/types/role';

export interface IOrderDetailIntegralTable {
  id: number;
  orderDetailId: number;
  orderDetailInfo?: IOrderDetailTable;
  roleId: number;
  roleInfo?: IRoleTable;
  integral: number;
}
