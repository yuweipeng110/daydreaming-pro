import React from 'react';
import { connect } from 'react-redux';
import { ConnectProps, ConnectState } from '@/models/connect';
import { Form, message } from 'antd';
import ProForm, { ModalForm, ProFormSwitch, ProFormText } from '@ant-design/pro-form';
import { addDeskApi } from '@/services/desk';
import { STATUS_CODE } from '@/pages/constants';

interface IProps extends ConnectProps, StateProps {
  actionRef: any;
  visible: boolean;
  onVisibleChange: (visible: boolean) => void;
}

const AddDesk: React.FC<IProps> = (props) => {
  const { actionRef, visible, onVisibleChange, loginUserInfo } = props;
  const [form] = Form.useForm();

  const onSubmit = async (values: any) => {
    const hide = message.loading('正在添加');
    const params = {
      ...values,
      storeId: loginUserInfo.storeId
    };
    const res = await addDeskApi((params));
    if (Number(res.code) !== STATUS_CODE.SUCCESS) {
      hide();
      message.error(res.msg);
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
      title='添加桌台信息'
      visible={visible}
      onVisibleChange={(visibleValue) => {
        form.resetFields();
        onVisibleChange(visibleValue);
      }}
      form={form}
      onFinish={onFinish}
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

const mapStateToProps = (state: ConnectState) => ({
  loginUserInfo: state.login.loginUserInfo,
});
type StateProps = ReturnType<typeof mapStateToProps>;

export default connect(mapStateToProps)(AddDesk);
