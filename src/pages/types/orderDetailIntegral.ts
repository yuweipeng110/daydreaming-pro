import { IOrderDetailTable } from '@/pages/types/orderDetail';
import { IRoleTable } from '@/pages/types/role';

export interface IOrderDetailIntegralTable {
  orderDetailId?: string;
  orderDetailInfo?: IOrderDetailTable;
  roleId?: string;
  roleInfo?: IRoleTable;
  integral?: number;
  id?: string;
  key?: string;
}
