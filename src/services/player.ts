import request from '@/utils/request';
import { IAddUserResponse, IUserResponse } from '@/pages/types/user';

export async function queryPlayerListApi(params: any): Promise<IUserResponse>{
  return request.get('/app/user/get-player-list', {
    params
  });
}

export async function addPlayerApi(params: IAddUserResponse) {
  return request.post('/app/user/add-player', {
    data: params
  });
}

export async function editPlayerApi(params: IAddUserResponse) {
  return request.post('/app/user/edit-player', {
    data: params
  });
}

export async function accountRechargeApi(params: IUserResponse) {
  return request.post('/app/user/account-recharge', {
    data: params
  });
}
