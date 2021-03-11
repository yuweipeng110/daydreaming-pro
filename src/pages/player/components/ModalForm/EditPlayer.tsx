import React, { useState } from 'react';
import { connect } from 'react-redux';
import { ConnectProps, ConnectState } from '@/models/connect';
import { Form, message, Upload } from 'antd';
import ProForm, {
  ModalForm,
  ProFormDatePicker,
  ProFormRadio,
  ProFormText,
  ProFormTextArea,
} from '@ant-design/pro-form';
import { IAddUserExists } from '@/pages/types/user';
import { IUserTable } from '@/pages/types/user';
import { UploadFile } from 'antd/lib/upload/interface';

export type TProps = {
  actionRef: any;
  visible: boolean;
  onVisibleChange: (visible: boolean) => void;
  currentData: IUserTable;
  loginUserInfo: IUserTable;
} & ConnectProps;

const EditPlayer: React.FC<TProps> = (props) => {
  const { actionRef, visible, onVisibleChange, currentData, loginUserInfo, dispatch } = props;
  const initialValues = { ...currentData };
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const onChange = ({ fileList: newFileList }: { fileList: UploadFile[] }) => {
    setFileList(newFileList);
  };

  const onPreview = async (file: any) => {
    let src = file.url;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj);
        reader.onload = () => resolve(reader.result);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow?.document.write(image.outerHTML);
  };

  const onSubmit = async (values: any) => {
    const loadingKey = 'loadingKey';
    const hide = message.loading({ content: '正在保存...', key: loadingKey });
    const params = {
      ...values,
      playerId: values.id,
      storeId: loginUserInfo.storeId,
    };
    let submitRes: IAddUserExists;
    if (!currentData) {
      submitRes = await dispatch({
        type: 'player/addPlayerEffect',
        params,
      });
    } else {
      submitRes = await dispatch({
        type: 'player/editPlayerEffect',
        params,
      });
    }
    if (!submitRes.phoneExists) {
      const phoneError = submitRes.phoneExists
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
      title="玩家信息"
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
        <Upload
          // action='https://www.mocky.io/v2/5cc8019d300000980a055e76'
          listType="picture-card"
          fileList={fileList}
          onChange={onChange}
          onPreview={onPreview}
        >
          {fileList.length < 1 && '+ Upload'}
        </Upload>
      </ProForm.Group>
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
}))(EditPlayer);
