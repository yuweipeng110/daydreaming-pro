import React from 'react';
import { connect } from 'react-redux';
import { ConnectProps } from '@/models/connect';
import { Form, FormInstance, message } from 'antd';
import ProForm, { ModalForm, ProFormSwitch, ProFormText, ProFormTextArea } from '@ant-design/pro-form';
import { IAddStoreExists, IStoreTable } from '@/pages/types/store';
import _ from 'lodash';

interface IProps extends ConnectProps {
  visible: boolean;
  onVisibleChange: (visible: boolean) => void;
  currentData: IStoreTable;
}

const EditStoreModalForm: React.FC<IProps> = (props) => {
  const { dispatch, visible, onVisibleChange, currentData } = props;
  const initialValues = !_.isEmpty(currentData) ? { ...currentData } : {};
  const [form] = Form.useForm();
  const formRef = React.createRef<FormInstance>();

  const onSubmit = async (values: any) => {
    const hide = message.loading('正在修改');
    const params = {
      storeId: currentData.id,
      ...values
    }

    const submitRes: IAddStoreExists = await dispatch({
      type: 'store/editStoreEffect',
      params
    });
    if (!submitRes.storeNameExists) {
      // @ts-ignore
      formRef.current.setFields([{
        name: 'storeName',
        errors: ['该门店名称已存在']
      }]);
      return false;
    }
    onVisibleChange(false);
    if (submitRes.storeNameExists) {
      hide();
      message.success('修改成功');
      return true;
    }
    message.error('修改失败请重试');
    return false;
  };

  return (
    <ModalForm
      title='修改门店信息'
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
      initialValues={initialValues}
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
          disabled
          name='realName'
          label='管理员 (真实姓名)'
          width='md'
        />
        <ProFormText
          disabled
          name='userName'
          label='管理员 (账号)'
          width='md'
        />
      </ProForm.Group>
      <ProForm.Group>
        <ProFormText
          disabled
          name='passWord'
          label='管理员 (密码)'
          width='md'
        />
        <ProFormText
          disabled
          name='confirm'
          label='确认密码'
          dependencies={['passWord']}
          hasFeedback
          width='md'
        />
      </ProForm.Group>
      <ProForm.Group>
        <ProFormText
          disabled
          name='phoneNumber'
          label='管理员手机号'
          width='md'
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

export default connect()(EditStoreModalForm);
