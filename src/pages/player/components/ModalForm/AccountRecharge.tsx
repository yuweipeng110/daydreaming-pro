import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { ConnectProps, ConnectState } from '@/models/connect';
import { Form, message, Statistic } from 'antd';
import ProForm, {
  ModalForm,
  ProFormDatePicker,
  ProFormRadio,
  ProFormText,
  ProFormTextArea,
  ProFormDigit,
} from '@ant-design/pro-form';
import { IUserTable } from '@/pages/types/user';
import { STATUS_CODE } from '@/pages/constants';
import { IPromotionsTable } from '@/pages/types/promotions';
import { queryPromotionsListApi } from '@/services/promotions';

export type TProps = {
  actionRef: any;
  visible: boolean;
  onVisibleChange: (visible: boolean) => void;
  currentData: IUserTable;
  loginUserInfo: IUserTable;
} & ConnectProps;

const AccountRecharge: React.FC<TProps> = (props) => {
  const { actionRef, visible, onVisibleChange, currentData, loginUserInfo } = props;
  const initialValues = { ...currentData };
  const [form] = Form.useForm();

  const [promotionsList, setPromotionsList] = useState<IPromotionsTable[]>([]);
  const [voucherMoney, setVoucherMoney] = useState<number>(0);

  const loadPromotionsListData = async () => {
    const params = {
      pageSize: 10,
      storeId: loginUserInfo.storeId,
      isActive: true,
    };
    const res = await queryPromotionsListApi(params);
    if (res.code === STATUS_CODE.SUCCESS) {
      setPromotionsList(res.data);
    }
  };

  useEffect(() => {
    if (visible) {
      loadPromotionsListData();
    }
  }, [visible]);

  const onchangeRechargeAmount = (value: number) => {
    setVoucherMoney(0);
    // eslint-disable-next-line array-callback-return
    promotionsList.map((item) => {
      if (item.isActive && item.rechargeMoney <= value) {
        setVoucherMoney(item.voucherMoney);
      }
    });
  };

  const onSubmit = async (values: any) => {
    const loadingKey = 'loadingKey';
    message.loading({ content: '正在充值...', key: loadingKey, duration: 0 });
    const params = {
      userId: values.id,
      ...values,
    };
    const submitRes: boolean = await props.dispatch({
      type: 'player/accountRechargeEffect',
      params,
    });
    if (!submitRes) {
      message.error({ content: '充值失败!', key: loadingKey, duration: 2 });
      return false;
    }
    message.success({ content: '充值成功!', key: loadingKey, duration: 2 });
    return true;
  };

  const onFinish = async (values: any) => {
    const success = await onSubmit(values);
    if (!success) {
      return false;
    }
    onVisibleChange(false);
    if (actionRef.current) {
      actionRef.current.reload();
    }
    return true;
  };

  return (
    <ModalForm
      title="账户充值"
      visible={visible}
      onVisibleChange={(visibleValue) => {
        form.resetFields();
        onVisibleChange(visibleValue);
      }}
      form={form}
      onFinish={onFinish}
      initialValues={initialValues}
    >
      <ProFormText name="id" hidden />
      <ProForm.Group>
        <ProFormText name="nickname" label="昵称" width="md" disabled />
        <ProFormRadio.Group
          name="sex"
          label="性别"
          width="md"
          options={[
            {
              value: 0,
              label: '女',
            },
            {
              value: 1,
              label: '男',
            },
          ]}
          disabled
        />
      </ProForm.Group>
      <ProForm.Group>
        <ProFormText name="phone" label="手机号" width="md" disabled />
        <ProFormDatePicker name="birthday" label="生日" width="md" disabled />
      </ProForm.Group>
      <ProForm.Group>
        <ProFormTextArea name="remark" label="备注" width="md" disabled />
      </ProForm.Group>
      <ProForm.Group>
        <ProFormDigit
          name="accountBalance"
          label="账户余额"
          width="md"
          fieldProps={{
            formatter: (value: number) => `￥${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ','),
            parser: (value: string) => value.replace(/￥\s?|(,*)/g, ''),
          }}
          disabled
        />
        <ProFormDigit
          name="voucherBalance"
          label="代金卷余额"
          width="md"
          fieldProps={{
            formatter: (value: number) => `￥${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ','),
            parser: (value: string) => value.replace(/￥\s?|(,*)/g, ''),
          }}
          disabled
        />
      </ProForm.Group>
      <ProForm.Group>
        <ProFormDigit
          name="rechargeAmount"
          label="充值金额"
          width="md"
          rules={[
            {
              required: true,
              message: '请输入充值金额!',
            },
          ]}
          fieldProps={{
            onChange: (value: number) => onchangeRechargeAmount(value),
            formatter: (value: number) => `￥${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ','),
            parser: (value: string) => value.replace(/￥\s?|(,*)/g, ''),
          }}
        />
        <ProFormRadio.Group
          name="paymentMethodId"
          label="充值方式"
          width="md"
          options={[
            {
              value: 1,
              label: '微信',
            },
            {
              value: 2,
              label: '支付宝',
            },
            {
              value: 3,
              label: '现金',
            },
          ]}
          rules={[
            {
              required: true,
              message: '请选择充值方式!',
            },
          ]}
        />
      </ProForm.Group>
      <ProForm.Group>
        <Statistic title="赠送金额" prefix={'￥'} value={voucherMoney} precision={2} />
      </ProForm.Group>
    </ModalForm>
  );
};

export default connect((state: ConnectState) => ({
  loginUserInfo: state.login.loginUserInfo,
}))(AccountRecharge);
