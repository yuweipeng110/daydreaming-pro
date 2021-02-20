import React from 'react';
import { connect } from 'react-redux';
import { ConnectProps } from '@/models/connect';
import { Form, message } from 'antd';
import ProForm, { ModalForm, ProFormSwitch, ProFormText } from '@ant-design/pro-form';
import { addDeskApi } from '@/services/desk';

interface IProps extends ConnectProps {
  visible: boolean;
  onVisibleChange: (visible: boolean) => void;
}

const AddDeskModalForm: React.FC<IProps> = (props) => {
  const { visible, onVisibleChange } = props;
  const [form] = Form.useForm();

  const onSubmit = async (params: any) => {
    const hide = message.loading('正在添加');
    try {
      await addDeskApi((params));
      onVisibleChange(false);
      hide();
      message.success('添加成功');
      return true;
    } catch (error) {
      hide();
      message.error(error);
      return false;
    }
  };

  return (
    <ModalForm
      title='添加桌台信息'
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
        return true;
      }}
    >
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

export default connect()(AddDeskModalForm);
