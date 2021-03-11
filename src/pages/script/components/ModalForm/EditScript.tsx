import React from 'react';
import { connect } from 'react-redux';
import { ConnectProps, ConnectState } from '@/models/connect';
import { Form, message } from 'antd';
import ProForm, {
  ModalForm,
  ProFormDigit,
  ProFormSwitch,
  ProFormText,
  ProFormTextArea,
} from '@ant-design/pro-form';
import { addScriptApi, editScriptApi } from '@/services/script';
import { IScriptTable } from '@/pages/types/script';
import { STATUS_CODE } from '@/pages/constants';
import { IUserTable } from '@/pages/types/user';

export type TProps = {
  actionRef: any;
  visible: boolean;
  onVisibleChange: (visible: boolean) => void;
  currentData: IScriptTable;
  loginUserInfo: IUserTable;
} & ConnectProps;

const EditScript: React.FC<TProps> = (props) => {
  const { actionRef, visible, onVisibleChange, currentData, loginUserInfo } = props;
  const initialValues = { ...currentData };
  const [form] = Form.useForm();

  const onSubmit = async (values: any) => {
    const loadingKey = 'loadingKey';
    message.loading({ content: '正在保存...', key: loadingKey });
    const params = {
      ...values,
      scriptId: values.id,
      storeId: loginUserInfo.storeId,
    };
    let res: any = Object.create(null);
    if (!currentData) {
      res = await addScriptApi(params);
    } else {
      res = await editScriptApi(params);
    }
    if (Number(res.code) !== STATUS_CODE.SUCCESS) {
      message.error({ content: res.msg, key: loadingKey, duration: 2 });
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
      title="剧本信息"
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
          label="剧本名称"
          width="md"
          rules={[
            {
              required: true,
              message: '输入剧本名称!',
            },
          ]}
        />
        <ProFormText
          name="type"
          label="类型"
          width="md"
          rules={[
            {
              required: true,
              message: '输入类型!',
            },
          ]}
        />
      </ProForm.Group>
      <ProForm.Group>
        <ProFormText
          name="costPrice"
          label="成本价格"
          width="md"
          rules={[
            {
              required: true,
              message: '输入成本价格!',
            },
          ]}
        />
        <ProFormText
          name="formatPrice"
          label="开本价格"
          width="md"
          rules={[
            {
              required: true,
              message: '输入开本价格!',
            },
          ]}
        />
      </ProForm.Group>
      <ProForm.Group>
        <ProFormText name="applicableNumber" label="适用人数" width="md" />
        <ProFormDigit name="amount" label="拥有数量" width="md" />
      </ProForm.Group>
      <ProForm.Group>
        <ProFormText name="gameTime" label="游戏时间（小时）" width="md" />
        <ProFormSwitch name="isAdapt" label="是否改编" />
      </ProForm.Group>
      <ProForm.Group>
        <ProFormTextArea name="description" label="描述" width="md" />
        <ProFormTextArea name="adaptContent" label="改编内容" width="md" />
      </ProForm.Group>
    </ModalForm>
  );
};

export default connect((state: ConnectState) => ({
  loginUserInfo: state.login.loginUserInfo,
}))(EditScript);
