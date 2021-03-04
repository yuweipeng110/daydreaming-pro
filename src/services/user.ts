import request from '@/utils/request';
import { IAddUserResponse, IUserResponse } from '@/pages/types/user';

export async function query(): Promise<any> {
  return request('/api/users');
}

export async function queryCurrent(): Promise<any> {
  return request('/api/currentUser');
}

export async function queryNotices(): Promise<any> {
  return request('/api/notices');
}

export async function queryUserListApi(params: any): Promise<IUserResponse> {
  return request.get('/app/user/get-user-list', {
    params,
  });
}

export async function addUserApi(params: IAddUserResponse) {
  return request.post('/app/user/add-user', {
    data: params,
  });
}

export async function editUserApi(params: IAddUserResponse) {
  return request.post('/app/user/edit-user', {
    data: params,
  });
}
