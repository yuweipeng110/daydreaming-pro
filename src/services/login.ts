import request from '@/utils/request';
import { ILoginCheckResponse } from '@/pages/types/login';

export type LoginParamsType = {
  userName: string;
  password: string;
  mobile: string;
  captcha: string;
};

export async function fakeAccountLogin(params: LoginParamsType) {
  return request('/api/login/account', {
    method: 'POST',
    data: params,
  });
}

export async function getFakeCaptcha(mobile: string) {
  return request(`/api/login/captcha?mobile=${mobile}`);
}




export async function loginCheckApi(params: any): Promise<ILoginCheckResponse>{
  return request.post('/app/signin/login-check',{
    data: params
  });
}

export async function loginTokenCheckApi(params: any): Promise<ILoginCheckResponse>{
  return request.post('/app/signin/login-token-check',{
    data: params
  });
}
