import React from 'react';
import { connect } from 'react-redux';
import { ConnectProps, ConnectState } from '@/models/connect';
import { Form, message } from 'antd';
import ProForm, { ModalForm, ProFormSwitch, ProFormText } from '@ant-design/pro-form';
import { addDeskApi, editDeskApi } from '@/services/desk';
import { STATUS_CODE } from '@/pages/constants';
import { IAddDeskResponse, IDeskTable } from '@/pages/types/desk';
import { IUserTable } from '@/pages/types/user';

export type TProps = {
  actionRef: any;
  visible: boolean;
  onVisibleChange: (visible: boolean) => void;
  currentData: IDeskTable;
  loginUserInfo: IUserTable;
} & ConnectProps;

const EditDesk: React.FC<TProps> = (props) => {
  const { actionRef, visible, onVisibleChange, currentData, loginUserInfo } = props;
  const initialValues = { ...currentData };
  const [form] = Form.useForm();

  const onSubmit = async (values: any) => {
    const loadingKey = 'loadingKey';
    message.loading({ content: '正在保存...', key: loadingKey, duration: 0 });
    const params = {
      ...values,
      deskId: values.id,
      storeId: loginUserInfo.storeId,
    };
    const res: IAddDeskResponse = !currentData ? await addDeskApi(params) : editDeskApi(params);
    if (res.code !== STATUS_CODE.SUCCESS) {
      message.error({ content: res.msg, key: loadingKey, duration: 2 });
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
      title="桌台信息"
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
          label="桌号"
          width="md"
          rules={[
            {
              required: true,
              message: '输入桌号!',
            },
          ]}
        />
        <ProFormSwitch name="isEnabled" label="是否可用" />
      </ProForm.Group>
    </ModalForm>
  );
};

export default connect((state: ConnectState) => ({
  loginUserInfo: state.login.loginUserInfo,
}))(EditDesk);
