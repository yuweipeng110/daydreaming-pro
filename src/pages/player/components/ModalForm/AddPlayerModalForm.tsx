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
} from '@ant-design/pro-form';
import { IAddUserExists } from '@/pages/types/user';

interface IProps extends ConnectProps {
  visible: boolean;
  onVisibleChange: (visible: boolean) => void;
}

const AddPlayerModalForm: React.FC<IProps> = (props) => {
  const { visible, onVisibleChange } = props;
  const [form] = Form.useForm();

  const onSubmit = async (params: any) => {
    const hide = message.loading('正在添加');
    const submitRes: IAddUserExists = await props.dispatch({
      type: 'player/addPlayerEffect',
      params,
    });
    if (!submitRes.phoneExists) {
      const phoneError = submitRes.phoneExists ? {} : {
        name: 'phone',
        errors: ['手机号码已存在']
      };
      const errorList = [
        phoneError
      ];
      hide();
      // @ts-ignore
      form.setFields(errorList);
      return false;
    }
    onVisibleChange(false);
    hide();
    message.success('添加成功');
    return true;
  };

  return (
    <ModalForm
      title='添加玩家信息'
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
          name='nickname'
          label='昵称'
          width='md'
          rules={[
            {
              required: true,
              message: '输入昵称!',
            },
          ]}
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
          rules={[
            {
              required: true,
              message: '输入性别!',
            },
          ]}
        />
      </ProForm.Group>
      <ProForm.Group>
        <ProFormText
          name='phone'
          label='手机号'
          width='md'
          rules={[
            {
              required: true,
              message: '输入手机号!',
            },
          ]}
        />
        <ProFormDatePicker
          name='birthday'
          label='生日'
          width='md'
        />
      </ProForm.Group>
      <ProForm.Group>
        <ProFormTextArea
          name='remark'
          label='备注'
          width='md'
        />
      </ProForm.Group>
    </ModalForm>
  );
};

export default connect()(AddPlayerModalForm);
