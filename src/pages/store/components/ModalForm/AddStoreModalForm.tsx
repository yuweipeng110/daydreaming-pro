import React from 'react';
import { connect } from 'react-redux';
import { ConnectProps } from '@/models/connect';
import { Form, message } from 'antd';
import ProForm, { ModalForm, ProFormSwitch, ProFormText, ProFormTextArea } from '@ant-design/pro-form';
import { IAddStoreExists } from '@/pages/types/store';

interface IProps extends ConnectProps {
  visible: boolean;
  onVisibleChange: (visible: boolean) => void;
}

const AddStoreModalForm: React.FC<IProps> = (props) => {
  const { visible, onVisibleChange } = props;
  const [form] = Form.useForm();

  const onSubmit = async (params: any) => {
    const hide = message.loading('正在添加');

    const submitRes: IAddStoreExists = await props.dispatch({
      type: 'store/addStoreEffect',
      params,
    });
    if (!submitRes.userNameExists || !submitRes.storeNameExists) {
      const userNameError = submitRes.userNameExists ? {} : {
        name: 'userName',
        errors: ['该用户名称已存在'],
      };
      const storeNameError = submitRes.storeNameExists ? {} : {
        name: 'storeName',
        errors: ['该门店名称已存在'],
      };
      const errorList = [
        userNameError,
        storeNameError,
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
      title='添加门店信息'
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
          name='storeName'
          label='门店名称'
          width='md'
          rules={[
            {
              required: true,
              message: '输入门店名称!',
            },
          ]}
        />
        <ProFormSwitch
          name='status'
          label='系统使用状态'
        />
      </ProForm.Group>
      <ProForm.Group>
        <ProFormText
          name='realName'
          label='管理员 (真实姓名)'
          width='md'
          rules={[
            {
              required: true,
              message: '输入管理员 (真实姓名)!',
            },
          ]}
        />
        <ProFormText
          name='userName'
          label='管理员 (账号)'
          width='md'
          rules={[
            {
              required: true,
              message: '输入管理员 (账号)!',
            },
          ]}
        />
      </ProForm.Group>
      <ProForm.Group>
        <ProFormText
          name='passWord'
          label='管理员 (密码)'
          width='md'
          rules={[
            {
              required: true,
              message: '输入管理员 (密码)!',
            },
          ]}
        />
        <ProFormText
          name='confirm'
          label='确认密码'
          dependencies={['passWord']}
          hasFeedback
          width='md'
          rules={[
            {
              required: true,
              message: '请确认密码!',
            },
            ({ getFieldValue }) => ({
              validator(rule, value) {
                if (!value || getFieldValue('passWord') === value) {
                  return Promise.resolve();
                }
                // eslint-disable-next-line prefer-promise-reject-errors
                return Promise.reject('两次输入的密码不一致!');
              },
            }),
          ]}
        />
      </ProForm.Group>
      <ProForm.Group>
        <ProFormText
          name='phoneNumber'
          label='管理员手机号'
          width='md'
          rules={[
            {
              required: true,
              message: '输入管理员手机号!',
            },
          ]}
        />
        <ProFormTextArea
          name='address'
          label='门店地址'
          width='md'
          rules={[
            {
              required: true,
              message: '不可以为空!',
            },
            {
              max: 200,
              message: '不超过200个字符!',
            },
          ]}
        />
      </ProForm.Group>
    </ModalForm>
  );
};

export default connect()(AddStoreModalForm);
