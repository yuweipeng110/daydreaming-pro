import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { ConnectProps, ConnectState } from '@/models/connect';
import { Form, message } from 'antd';
import ProForm, {
  ModalForm,
  ProFormDatePicker,
  ProFormRadio,
  ProFormText,
  ProFormTextArea,
} from '@ant-design/pro-form';
import { IAddUserResponse } from '@/pages/types/user';
import { IUserTable } from '@/pages/types/user';
import { addUserApi, editUserApi } from '@/services/user';
import { STATUS_CODE } from '@/pages/constants';

export type TProps = {
  actionRef: any;
  visible: boolean;
  onVisibleChange: (visible: boolean) => void;
  currentData: IUserTable;
  loginUserInfo: IUserTable;
} & ConnectProps;

const EditUser: React.FC<TProps> = (props) => {
  const { actionRef, visible, onVisibleChange, currentData, loginUserInfo } = props;
  const initialValues = { ...currentData };
  const [form] = Form.useForm();

  useEffect(() => {
    console.log('EditUser',loginUserInfo);
  },[])

  const onSubmit = async (values: any) => {
    const loadingKey = 'loadingKey';
    const hide = message.loading({ content: '正在保存...', key: loadingKey, duration: 0 });
    const params = {
      ...values,
      userId: values.id,
      storeId: loginUserInfo.storeId,
    };
    let res: IAddUserResponse;
    if (!currentData) {
      res = await addUserApi(params);
    } else {
      res = await editUserApi(params);
    }
    if (Number(res.code) === STATUS_CODE.CHECK_ERROR) {
      const phoneError = res.data.phoneExists
        ? {}
        : {
            name: 'phone',
            errors: ['手机号码已存在'],
          };
      const errorList = [phoneError];
      hide();
      // @ts-ignore
      form.setFields(errorList);
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
      title="修改用户信息"
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
          name="nickname"
          label="昵称"
          width="md"
          rules={[
            {
              required: true,
              message: '输入昵称!',
            },
          ]}
        />
        <ProFormRadio.Group
          name="sex"
          label="性别"
          width="md"
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
          name="phone"
          label="手机号"
          width="md"
          rules={[
            {
              required: true,
              message: '输入手机号!',
            },
          ]}
        />
        <ProFormDatePicker name="birthday" label="生日" width="md" />
      </ProForm.Group>
      <ProForm.Group>
        <ProFormTextArea name="remark" label="备注" width="md" />
      </ProForm.Group>
    </ModalForm>
  );
};

export default connect((state: ConnectState) => ({
  loginUserInfo: state.login.loginUserInfo,
}))(EditUser);
