import request from '@/utils/request';
import { IAddStoreResponse, IStoreResponse } from '@/pages/types/store';


export async function queryStoreListApi(params?: any): Promise<IStoreResponse>{
  return request.get('/app/user/get-store-list', {
    params
  });
}

export async function addStoreApi(params: IAddStoreResponse) {
  return request.post('/app/user/add-store', {
    data: params
  });
}

export async function editStoreApi(params: IAddStoreResponse) {
  return request.post('/app/user/edit-store', {
    data: params
  });
}
