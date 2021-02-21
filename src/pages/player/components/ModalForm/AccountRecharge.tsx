import React from 'react';
import { connect } from 'react-redux';
import { ConnectProps } from '@/models/connect';
import { Form, message } from 'antd';
import ProForm, {
  ModalForm,
  ProFormDatePicker,
  ProFormRadio,
  ProFormText,
  ProFormTextArea,
  ProFormDigit,
} from '@ant-design/pro-form';
import { IUserTable } from '@/pages/types/user';

interface IProps extends ConnectProps {
  actionRef: any;
  visible: boolean;
  onVisibleChange: (visible: boolean) => void;
  currentData: IUserTable;
}

const AccountRecharge: React.FC<IProps> = (props) => {
  const { actionRef, visible, onVisibleChange, currentData } = props;
  const initialValues = { ...currentData };
  const [form] = Form.useForm();

  const onSubmit = async (values: any) => {
    const hide = message.loading('正在充值');
    const params = {
      userId: values.id,
      ...values,
    }
    const submitRes: boolean = await props.dispatch({
      type: 'player/accountRechargeEffect',
      params,
    });
    if (!submitRes) {
      hide();
      message.error('充值失败！');
      return false;
    }
    onVisibleChange(false);
    hide();
    message.success('充值成功');
    return true;
  };

  return (
    <ModalForm
      title='账户充值'
      visible={visible}
      onVisibleChange={(visibleValue) => {
        form.resetFields();
        onVisibleChange(visibleValue);
      }}
      form={form}
      onFinish={async (values) => {
        const success = await onSubmit(values);
        if (!success) {
          return false;
        }
        onVisibleChange(false);
        if (actionRef.current) {
          actionRef.current.reload();
        }
        return true;
      }}
      initialValues={initialValues}
    >
      <ProFormText
        name='id'
        hidden
      />
      <ProForm.Group>
        <ProFormText
          name='nickname'
          label='昵称'
          width='md'
          disabled
        />
        <ProFormRadio.Group
          name='sex'
          label='性别'
          width='md'
          options={[
            {
              value: '0',
              label: '女',
            },
            {
              value: '1',
              label: '男',
            },
          ]}
          disabled
        />
      </ProForm.Group>
      <ProForm.Group>
        <ProFormText
          name='phone'
          label='手机号'
          width='md'
          disabled
        />
        <ProFormDatePicker
          name='birthday'
          label='生日'
          width='md'
          disabled
        />
      </ProForm.Group>
      <ProForm.Group>
        <ProFormTextArea
          name='remark'
          label='备注'
          width='md'
          disabled
        />
      </ProForm.Group>
      <ProForm.Group>
        <ProFormText
          name='accountBalance'
          label='账户余额'
          width='md'
          disabled
        />
        <ProFormText
          name='voucherBalance'
          label='代金卷余额'
          width='md'
          disabled
        />
      </ProForm.Group>
      <ProForm.Group>
        <ProFormDigit
          name='rechargeAmount'
          label='充值金额'
          width='md'
          rules={[
            {
              required: true,
              message: '请输入充值金额!',
            },
          ]}
        />
        <ProFormRadio.Group
          name='paymentMethodId'
          label='充值方式'
          width='md'
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
    </ModalForm>
  );
};

export default connect()(AccountRecharge);
