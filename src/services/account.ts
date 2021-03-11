import request from '@/utils/request';
import { IUserResponse } from '@/pages/types/user';

export async function queryUserIntegralRankListApi(params: any): Promise<IUserResponse> {
  return request.get('/app/account/get-user-integral-rank-list', {
    params,
  });
}
