import React from 'react';
import { connect } from 'react-redux';
import { ConnectProps } from '@/models/connect';
import { Form, message } from 'antd';
import ProForm, { ModalForm, ProFormSwitch, ProFormText } from '@ant-design/pro-form';
import { editDeskApi } from '@/services/desk';
import { IDeskTable } from '@/pages/types/desk';

interface IProps extends ConnectProps {
  actionRef: any;
  visible: boolean;
  onVisibleChange: (visible: boolean) => void;
  currentData: IDeskTable;
}

const AddDesk: React.FC<IProps> = (props) => {
  const { actionRef, visible, onVisibleChange, currentData } = props;
  const initialValues = { ...currentData };
  const [form] = Form.useForm();

  const onSubmit = async (values: any) => {
    const hide = message.loading('正在修改');
    try {
      const params = {
        deskId: values.id,
        ...values
      };
      await editDeskApi((params));
      onVisibleChange(false);
      hide();
      message.success('修改成功');
      return true;
    } catch (error) {
      hide();
      message.error(error);
      return false;
    }
  };

  return (
    <ModalForm
      title='修改桌台信息'
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
          name='title'
          label='桌号'
          width='md'
          rules={[
            {
              required: true,
              message: '输入桌号!',
            },
          ]}
        />
        <ProFormSwitch
          name='isEnabled'
          label='是否可用'
          width='md'
        />
      </ProForm.Group>
    </ModalForm>
  );
};

export default connect()(AddDesk);
