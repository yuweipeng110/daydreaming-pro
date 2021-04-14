import React from 'react';
import { Form, message } from 'antd';
import ProForm, {
  ModalForm,
  ProFormDatePicker,
  ProFormDigit,
  ProFormText,
} from '@ant-design/pro-form';
import { STATUS_CODE } from '@/pages/constants';
import { addPromotionsApi, editPromotionsApi } from '@/services/promotions';
import { IAddPromotionsResponse, IPromotionsTable } from '@/pages/types/promotions';
import { connect } from 'react-redux';
import { ConnectProps, ConnectState } from '@/models/connect';
import { IUserTable } from '@/pages/types/user';

export type TProps = {
  actionRef: any;
  visible: boolean;
  onVisibleChange: (visible: boolean) => void;
  currentData: IPromotionsTable;
  loginUserInfo: IUserTable;
} & ConnectProps;

const EditPromotions: React.FC<TProps> = (props) => {
  const { actionRef, visible, onVisibleChange, currentData, loginUserInfo } = props;
  const initialValues = { ...currentData };
  const [form] = Form.useForm();

  const onSubmit = async (values: any) => {
    const loadingKey = 'loadingKey';
    message.loading({ content: '正在保存...', key: loadingKey, duration: 0 });
    const params = {
      ...values,
      promotionsId: values.id,
      storeId: loginUserInfo.storeId,
    };
    let res: IAddPromotionsResponse;
    if (!currentData) {
      res = await addPromotionsApi(params);
    } else {
      res = await editPromotionsApi(params);
    }
    if (Number(res.code) !== STATUS_CODE.SUCCESS) {
      message.error({ content: res.msg, key: loadingKey, duration: 2 });
      return false;
    }
    message.success({ content: '保存成功!', key: loadingKey, duration: 2 });
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
      title="活动信息"
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
        <ProFormText
          label="活动名称"
          name="title"
          width="md"
          rules={[
            {
              required: true,
              message: '输入活动名称!',
            },
          ]}
        />
      </ProForm.Group>
      <ProForm.Group>
        <ProFormDatePicker
          label="活动开始时间"
          name="startTime"
          width="md"
          rules={[
            {
              required: true,
              message: '输入活动开始时间!',
            },
          ]}
        />
        <ProFormDatePicker
          label="活动结束时间"
          name="endTime"
          width="md"
          rules={[
            {
              required: true,
              message: '输入活动结束时间!',
            },
          ]}
        />
      </ProForm.Group>
      <ProForm.Group>
        <ProFormDigit
          label="充值金额"
          name="rechargeMoney"
          width="md"
          rules={[
            {
              required: true,
              message: '输入充值金额!',
            },
          ]}
          fieldProps={{
            formatter: (value: any) => `￥${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ','),
            parser: (value: any) => value.replace(/￥\s?|(,*)/g, '')
          }}
        />
        <ProFormDigit
          label="赠送金额(代金劵)"
          name="voucherMoney"
          width="md"
          rules={[
            {
              required: true,
              message: '输入赠送金额!',
            },
          ]}
          fieldProps={{
            formatter: (value: any) => `￥${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ','),
            parser: (value: any) => value.replace(/￥\s?|(,*)/g, '')
          }}
        />
      </ProForm.Group>
    </ModalForm>
  );
};

export default connect((state: ConnectState) => ({
  loginUserInfo: state.login.loginUserInfo,
}))(EditPromotions);
