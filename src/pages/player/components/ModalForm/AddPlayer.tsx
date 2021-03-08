import React from 'react';
import { connect } from 'react-redux';
import { ConnectProps, ConnectState } from '@/models/connect';
import { Form, message } from 'antd';
import ProForm, {
  ModalForm,
  ProFormDatePicker,
  ProFormRadio,
  ProFormText,
  ProFormTextArea,
  ProFormUploadButton,
} from '@ant-design/pro-form';
import { IAddUserExists } from '@/pages/types/user';

interface IProps extends ConnectProps, StateProps {
  actionRef: any;
  visible: boolean;
  onVisibleChange: (visible: boolean) => void;
}

const AddPlayer: React.FC<IProps> = (props) => {
  const { actionRef, visible, onVisibleChange, loginUserInfo } = props;
  const [form] = Form.useForm();

  const onSubmit = async (values: any) => {
    const hide = message.loading('正在添加');
    const params = {
      ...values,
      storeId: loginUserInfo.storeId
    };
    const submitRes: IAddUserExists = await props.dispatch({
      type: 'player/addPlayerEffect',
      params,
    });
    if (!submitRes.phoneExists) {
      const phoneError = submitRes.phoneExists ? {} : {
        name: 'phone',
        errors: ['手机号码已存在'],
      };
      const errorList = [
        phoneError,
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
      title='添加玩家信息'
      visible={visible}
      onVisibleChange={(visibleValue) => {
        form.resetFields();
        onVisibleChange(visibleValue);
      }}
      form={form}
      onFinish={onFinish}
    >
      <ProForm.Group>
        <ProFormUploadButton
          name='avatar'
          label='头像'
          action='upload.do'
        >
        </ProFormUploadButton>
      </ProForm.Group>
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
              value: 0,
              label: '女',
            },
            {
              value: 1,
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

const mapStateToProps = (state: ConnectState) => ({
  loginUserInfo: state.login.loginUserInfo,
});
type StateProps = ReturnType<typeof mapStateToProps>;

export default connect(mapStateToProps)(AddPlayer);
