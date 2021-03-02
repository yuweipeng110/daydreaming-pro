import storage from '@/utils/storage';
import { ILoginUserTable } from '@/pages/types/login';
import * as loginService from '@/services/login';
import { STATUS_CODE } from '@/pages/constants';

interface ILogin {
  isLogin: boolean;
  loginUserInfo: ILoginUserTable;
}

export const userAuth = async (): Promise<ILogin> => {
  const params = {
    token: storage.getUserToken(),
  };
  const res = await loginService.loginTokenCheckApi(params);
  if (Number(res.code) === STATUS_CODE.SUCCESS) {
    return {
      isLogin: true,
      loginUserInfo: res.data,
    };
  }
  return {
    isLogin: false,
    loginUserInfo: {} as ILoginUserTable,
  };
};
