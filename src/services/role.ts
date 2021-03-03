import { IRoleResponse } from '@/pages/types/role';
import request from '@/utils/request';

export async function getRoleListApi(params?: any): Promise<IRoleResponse> {
  return request.get('/app/user/get-role-list', {
    params,
  });
}
