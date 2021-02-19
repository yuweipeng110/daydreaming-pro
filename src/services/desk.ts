import request from '@/utils/request'
import { IAddDeskResponse, IDeskResponse } from '@/pages/types/desk';


export async function queryDeskListApi(params: any): Promise<IDeskResponse>{
  return request.get('/app/desk/get-desk-list',{
    params
  });
}

export async function queryOrderDeskListApi(params: []): Promise<IDeskResponse>{
  return request.get('/app/desk/get-desk-order-list',{
    params
  });
}

export async function addDeskApi(params: IAddDeskResponse) {
  return request.post('/app/desk/add-desk',{
    data: params
  });
}

export async function editDeskApi(params: IAddDeskResponse) {
  return request.post('/app/desk/edit-desk',{
    data: params
  });
}
