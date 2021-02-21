import request from '@/utils/request'
import { IAddOrderResponse, IOrderResponse } from '@/pages/types/order';


export async function queryOrderListApi(params: any): Promise<any>{
  return request.get('/app/order/get-order-list',{
    params
  });
}

export async function addOrderApi(params: IAddOrderResponse) {
  return request.post('/app/order/add-order',{
    data: params
  });
}

export async function editOrderApi(params: IAddOrderResponse) {
  return request.post('/app/order/edit-order',{
    data: params
  });
}


export async function settlementOrderApi(params: IAddOrderResponse) {
  return request.post('/app/order/set-order-settlement',{
    data: params
  });
}
