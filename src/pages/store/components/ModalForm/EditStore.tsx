import React from 'react';
import { connect } from 'react-redux';
import { ConnectProps } from '@/models/connect';
import { Form, message } from 'antd';
import ProForm, {
  ModalForm,
  ProFormSwitch,
  ProFormText,
  ProFormTextArea,
} from '@ant-design/pro-form';
import { IAddStoreExists, IStoreTable } from '@/pages/types/store';

export type TProps = {
  actionRef: any;
  visible: boolean;
  onVisibleChange: (visible: boolean) => void;
  currentData: IStoreTable;
} & ConnectProps;

const EditStore: React.FC<TProps> = (props) => {
  const { actionRef, visible, onVisibleChange, currentData, dispatch } = props;
  const initialValues = { ...currentData };
  const [form] = Form.useForm();

  const onSubmit = async (values: any) => {
    const loadingKey = 'loadingKey';
    const hide = message.loading({ content: '正在保存...', key: loadingKey, duration: 0 });
    const params = {
      ...values,
      storeId: currentData ? currentData.id : 0,
    };
    let submitRes: IAddStoreExists;
    if (!currentData) {
      submitRes = await dispatch({
        type: 'store/addStoreEffect',
        params,
      });
    } else {
      submitRes = await dispatch({
        type: 'store/editStoreEffect',
        params,
      });
    }
    if (!submitRes.userNameExists || !submitRes.storeNameExists) {
      const userNameError = submitRes.userNameExists
        ? {}
        : {
            name: 'userName',
            errors: ['该用户名称已存在'],
          };
      const storeNameError = submitRes.storeNameExists
        ? {}
        : {
            name: 'storeName',
            errors: ['该门店名称已存在'],
          };
      const errorList = [!currentData && userNameError, storeNameError];
      hide();
      // @ts-ignore
      form.setFields(errorList);
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
      title="修改门店信息"
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
          name="storeName"
          label="门店名称"
          width="md"
          rules={[
            {
              required: true,
              message: '输入门店名称!',
            },
          ]}
        />
        <ProFormSwitch name="status" label="系统使用状态" />
      </ProForm.Group>
      <ProForm.Group>
        <ProFormText
          name="realName"
          label="管理员 (真实姓名)"
          width="md"
          rules={
            currentData
              ? []
              : [
                  {
                    required: true,
                    message: '输入管理员 (真实姓名)!',
                  },
                ]
          }
          disabled={!!currentData}
        />
        <ProFormText
          name="userName"
          label="管理员 (账号)"
          width="md"
          rules={
            currentData
              ? []
              : [
                  {
                    required: true,
                    message: '输入管理员 (账号)!',
                  },
                ]
          }
          disabled={!!currentData}
        />
      </ProForm.Group>
      <ProForm.Group>
        <ProFormText
          name="passWord"
          label="管理员 (密码)"
          width="md"
          rules={
            currentData
              ? []
              : [
                  {
                    required: true,
                    message: '输入管理员 (密码)!',
                  },
                ]
          }
          disabled={!!currentData}
        />
        <ProFormText
          name="confirm"
          label="确认密码"
          dependencies={['passWord']}
          hasFeedback
          width="md"
          rules={
            currentData
              ? []
              : [
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
                ]
          }
          disabled={!!currentData}
        />
      </ProForm.Group>
      <ProForm.Group>
        <ProFormText
          name="phoneNumber"
          label="管理员手机号"
          width="md"
          rules={
            currentData
              ? []
              : [
                  {
                    required: true,
                    message: '输入管理员手机号!',
                  },
                ]
          }
          disabled={!!currentData}
        />
        <ProFormTextArea
          name="address"
          label="门店地址"
          width="md"
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

export default connect()(EditStore);
