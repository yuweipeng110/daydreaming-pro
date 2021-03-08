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
import { addScriptApi } from '@/services/script';
import { STATUS_CODE } from '@/pages/constants';

interface IProps extends ConnectProps, StateProps {
  actionRef: any;
  visible: boolean;
  onVisibleChange: (visible: boolean) => void;
}

const AddScript: React.FC<IProps> = (props) => {
  const { actionRef, visible, onVisibleChange, loginUserInfo } = props;
  const [form] = Form.useForm();

  const onSubmit = async (values: any) => {
    const hide = message.loading('正在添加');
    const params = {
      ...values,
      storeId: loginUserInfo.storeId
    };
    const res = await addScriptApi((params));
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
      title='添加剧本信息'
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
          label='剧本名称'
          width='md'
          rules={[
            {
              required: true,
              message: '输入剧本名称!',
            },
          ]}
        />
        <ProFormText
          name='type'
          label='类型'
          width='md'
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
          name='costPrice'
          label='成本价格'
          width='md'
          rules={[
            {
              required: true,
              message: '输入成本价格!',
            },
          ]}
        />
        <ProFormText
          name='formatPrice'
          label='开本价格'
          width='md'
          rules={[
            {
              required: true,
              message: '输入开本价格!',
            },
          ]}
        />
      </ProForm.Group>
      <ProForm.Group>
        <ProFormText
          name='applicableNumber'
          label='适用人数'
          width='md'
        />
        <ProFormDigit
          name='amount'
          label='拥有数量'
          width='md'
        />
      </ProForm.Group>
      <ProForm.Group>
        <ProFormText
          name='gameTime'
          label='游戏时间（小时）'
          width='md'
        />
        <ProFormSwitch
          name='isAdapt'
          label='是否改编'
        />
      </ProForm.Group>
      <ProForm.Group>
        <ProFormTextArea
          name='description'
          label='描述'
          width='md'
        />
        <ProFormTextArea
          name='adaptContent'
          label='改编内容'
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

export default connect(mapStateToProps)(AddScript);
