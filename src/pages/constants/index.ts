export enum STATUS_CODE {
  SUCCESS = 10200,
  CHECK_ERROR = 10505,
  PARAMETER_ERROR = 10400,
  PERMISSIONS_ERROR = 10401,
  LOGIC_ERROR = 10502,
}

export const UserSexEnum = {
  0: { text: '女' },
  1: { text: '男' },
};

export const UserRoleEnum = {
  1: '店长',
  2: '店员',
  3: '玩家',
};

export const ScriptPlayerRoleEnum = {
  4: { text: '路人' },
  3: { text: '侦探' },
  2: { text: '杀手' },
};

export const OrderStatusEnum = {
  0: { text: '全部', status: 'Default' },
  10: { text: '进行中', status: 'Processing' },
  20: { text: '完成', status: 'Success' },
};

export const ScriptIsAdaptEnum = {
  true: { text: '是', status: 'Success' },
  false: { text: '否', status: 'Error' },
};

export const PaymentMethodEnum = {
  1: { text: '微信' },
  2: { text: '支付宝' },
  3: { text: '现金' },
  5: { text: '账户余额' },
};

export const DeskIsEnabledEnum = {
  true: { text: '是', status: 'Success' },
  false: { text: '否', status: 'Error' },
};

export const StoreStatusEnum = {
  true: { text: '使用中', status: 'Success' },
  false: { text: '未激活', status: 'Error' },
};
