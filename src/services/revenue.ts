import request from '@/utils/request'
import { IRevenueResponse } from "@/pages/types/revenue";


export async function queryRevenueListApi(params: any): Promise<IRevenueResponse>{
  return request.get('/app/account/get-revenue-list',{
    params
  });
}
