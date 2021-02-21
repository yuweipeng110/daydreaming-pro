import request from '@/utils/request'
import { IAddScriptResponse, IScriptResponse } from '@/pages/types/script';


export async function queryScriptListApi(params: any): Promise<IScriptResponse>{
  return request.get('/app/user/get-script-list', {
    params
  });
}

export async function addScriptApi(params: IAddScriptResponse) {
  return request.post('/app/user/add-script',{
    data: params
  });
}

export async function editScriptApi(params: IAddScriptResponse) {
  return request.post('/app/user/edit-script',{
    data: params
  });
}
