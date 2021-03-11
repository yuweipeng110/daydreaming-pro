import request from '@/utils/request';
import { IAddPromotionsResponse, IPromotionsResponse } from '@/pages/types/promotions';

export async function queryPromotionsListApi(params: any): Promise<IPromotionsResponse> {
  return request.get('/app/promotions/get-promotions-list', {
    params,
  });
}

export async function addPromotionsApi(params: IAddPromotionsResponse) {
  return request.post('/app/promotions/add-promotions', {
    data: params,
  });
}

export async function editPromotionsApi(params: IAddPromotionsResponse) {
  return request.post('/app/promotions/edit-promotions', {
    data: params,
  });
}
