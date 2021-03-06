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
    onVisibleChange(false);
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
      title="EditPromotions"
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
          name="title"
          label="title"
          width="md"
          rules={[
            {
              required: true,
              message: '输入名称!',
            },
          ]}
        />
      </ProForm.Group>
      <ProForm.Group>
        <ProFormDatePicker
          name="startTime"
          label="startTime"
          width="md"
          rules={[
            {
              required: true,
              message: '输入startTime!',
            },
          ]}
        />
        <ProFormDatePicker
          name="endTime"
          label="endTime"
          width="md"
          rules={[
            {
              required: true,
              message: '输入endTime!',
            },
          ]}
        />
      </ProForm.Group>
      <ProForm.Group>
        <ProFormDigit
          label="rechargeMoney"
          name="rechargeMoney"
          width="md"
          rules={[
            {
              required: true,
              message: '输入rechargeMoney!',
            },
          ]}
        />
        <ProFormDigit
          label="voucherMoney"
          name="voucherMoney"
          width="md"
          rules={[
            {
              required: true,
              message: '输入voucherMoney!',
            },
          ]}
        />
      </ProForm.Group>
    </ModalForm>
  );
};

export default connect((state: ConnectState) => ({
  loginUserInfo: state.login.loginUserInfo,
}))(EditPromotions);
