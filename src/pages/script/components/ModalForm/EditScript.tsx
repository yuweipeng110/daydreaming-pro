import React from 'react';
import { connect } from 'react-redux';
import { ConnectProps } from '@/models/connect';
import { Form, message } from 'antd';
import ProForm, {
  ModalForm,
  ProFormDigit,
  ProFormSwitch,
  ProFormText,
  ProFormTextArea,
} from '@ant-design/pro-form';
import { editScriptApi } from '@/services/script';
import { IScriptTable } from '@/pages/types/script';
import { STATUS_CODE } from '@/pages/constants';

interface IProps extends ConnectProps {
  actionRef: any;
  visible: boolean;
  onVisibleChange: (visible: boolean) => void;
  currentData: IScriptTable;
}

const EditScript: React.FC<IProps> = (props) => {
  const { actionRef, visible, onVisibleChange, currentData } = props;
  const initialValues = { ...currentData };
  const [form] = Form.useForm();

  const onSubmit = async (values: any) => {
    const hide = message.loading('正在修改');
    const params = {
      scriptId: values.id,
      ...values,
    };
    const res = await editScriptApi((params));
    if (Number(res.code) !== STATUS_CODE.SUCCESS) {
      hide();
      message.error(res.msg);
      return false;
    }
    onVisibleChange(false);
    hide();
    message.success('修改成功');
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
      title='修改剧本信息'
      visible={visible}
      onVisibleChange={(visibleValue) => {
        form.resetFields();
        onVisibleChange(visibleValue);
      }}
      form={form}
      onFinish={onFinish}
      initialValues={initialValues}
    >
      <ProFormText
        name='id'
        hidden
      />
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
        <ProFormDigit
          name='amount'
          label='拥有数量'
          width='md'
        />
        <ProFormDigit
          name='applicableNumber'
          label='适用人数'
          width='md'
        />
      </ProForm.Group>
      <ProForm.Group>
        <ProFormText
          name='gameTime'
          label='游戏时间（小时）'
          width='md'
        />
        <ProFormTextArea
          name='description'
          label='描述'
          width='md'
        />
      </ProForm.Group>
      <ProForm.Group>
        <ProFormSwitch
          name='isAdapt'
          label='是否改编'
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

export default connect()(EditScript);
