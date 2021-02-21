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
import { IUserTable } from '@/pages/types/user';

interface IProps extends ConnectProps {
  actionRef: any;
  visible: boolean;
  onVisibleChange: (visible: boolean) => void;
  currentData: IUserTable;
}

const AddPlayer: React.FC<IProps> = (props) => {
  const { actionRef, visible, onVisibleChange, currentData } = props;
  const initialValues = { ...currentData };
  const [form] = Form.useForm();

  const onSubmit = async (values: any) => {
    const hide = message.loading('正在修改');
    const params = {
      playerId: values.id,
      ...values
    };
    const submitRes: IAddUserExists = await props.dispatch({
      type: 'player/editPlayerEffect',
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
    message.success('修改成功');
    return true;
  };

  return (
    <ModalForm
      title='修改玩家信息'
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
        if (actionRef.current) {
          actionRef.current.reload();
        }
        onVisibleChange(false);
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

export default connect()(AddPlayer);
