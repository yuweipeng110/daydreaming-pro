import React from 'react';
import { connect } from 'react-redux';
import { ConnectProps } from '@/models/connect';
import { Form, message } from 'antd';
import ProForm, { ModalForm, ProFormSelect, ProFormTextArea } from '@ant-design/pro-form';
import { addOrderApi } from '@/services/order';

interface IProps extends ConnectProps {
  actionRef: any;
  visible: boolean;
  onVisibleChange: (visible: boolean) => void;
}

const AddOrder: React.FC<IProps> = (props) => {
  const { actionRef, visible, onVisibleChange } = props;
  const [form] = Form.useForm();

  ///app/user/get-user-list?storeId=1&pageRecords=1000
  ///app/user/get-script-list?storeId=1&pageRecords=1000
  const onSubmit = async (values: any) => {
    const hide = message.loading('正在开台');
    try {
      const params = { ...values };
      await addOrderApi((params));
      onVisibleChange(false);
      hide();
      message.success('开台成功');
      return true;
    } catch (error) {
      hide();
      message.error(error);
      return false;
    }
  };

  return (
    <ModalForm
      title='创建开台信息'
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
    >
      <ProForm.Group>
        <ProFormSelect
          name='scriptId'
          label='选择剧本'
          width='md'
          rules={[
            {
              required: true,
              message: '请选择剧本!',
            },
          ]}
        />
        <ProFormSelect
          name='hostId'
          label='主持人'
          width='md'
          rules={[
            {
              required: true,
              message: '请选择主持人!',
            },
          ]}
        />
      </ProForm.Group>
      <ProForm.Group>
        <ProFormSelect
          name='userItem'
          label='用户'
          width='md'
        />
        <ProFormTextArea
          name='adaptContent'
          label='改编内容'
          width='md'
        />
      </ProForm.Group>
      <ProForm.Group>
      </ProForm.Group>
    </ModalForm>
  );
};

export default connect()(AddOrder);
