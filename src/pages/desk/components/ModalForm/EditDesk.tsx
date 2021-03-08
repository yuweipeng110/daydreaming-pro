import React from 'react';
import { connect } from 'react-redux';
import { ConnectProps } from '@/models/connect';
import { Form, message } from 'antd';
import ProForm, { ModalForm, ProFormSwitch, ProFormText } from '@ant-design/pro-form';
import { editDeskApi } from '@/services/desk';
import { IDeskTable } from '@/pages/types/desk';
import { STATUS_CODE } from '@/pages/constants';

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
    const params = {
      deskId: values.id,
      ...values
    };
    const res = await editDeskApi((params));
    if (Number(res.code) !== STATUS_CODE.SUCCESS) {
      hide();
      message.error(res.msg);
      return false;
    }
    onVisibleChange(false);
    hide();
    message.success('修改成功');
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
  }

  return (
    <ModalForm
      title='修改桌台信息'
      visible={visible}
      onVisibleChange={(visibleValue) => {
        form.resetFields();
        onVisibleChange(visibleValue);
      }}
      form={form}
      onFinish={onFinish}
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
        />
      </ProForm.Group>
    </ModalForm>
  );
};

export default connect()(AddDesk);
