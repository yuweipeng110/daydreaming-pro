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
import { getImgBase64, beforeUpload, onPreview } from '@/utils/upload';

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
    console.log('fileList', newFileList);
    setFileList(newFileList);
  };

  const onSubmit = async (values: any) => {
    let avatarObj = Object.create(null);
    if (fileList.length > 0) {
      const imgBase64 = await getImgBase64(fileList[0]);
      avatarObj = {
        avatar: imgBase64,
        avatarThumbUrl: fileList[0].thumbUrl,
      };
    }
    const loadingKey = 'loadingKey';
    const hide = message.loading({ content: '正在保存...', key: loadingKey, duration: 0 });
    const params = {
      ...values,
      playerId: values.id,
      storeId: loginUserInfo.storeId,
      ...avatarObj,
    };
    // 1 = 1
    // 1 > 1 2 3 4
    // 33
    // ===========
    // 1 1
    // 2 1
    // 3 1
    // 4 1
    // ===========
    // 33 1
    // 33 2
    // 33 3
    // 33 4
    // add =============
    // TABLE DE ADD FILED OS_ID
    // ADD TABLE RELATION ADD ID,ST_ID,DE_ID
    // sql =============
    // SELECT ID FROM DE
    // WHERE OS_ID = 1
    // OR ID IN ( SELECT DE_ID FROM RELATION WHERE ST_ID = 33 )

    // price
    // 6 20 WEEK RANGE IS_ENABLE
    // 0 20 WEEK RANGE IS_ENABLE
    // datetime >= 00:00 CONTRAST
    // ADD SELECT * FROM A_101 WHERE F1_A101 = 'JOIN'
    console.log('params', params);
    return false;
    const submitRes: IAddUserExists = !currentData ? await dispatch({
      type: 'player/addPlayerEffect',
      params,
    }) : await dispatch({
      type: 'player/editPlayerEffect',
      params,
    });
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
      title='玩家信息'
      visible={visible}
      onVisibleChange={(visibleValue) => {
        form.resetFields();
        onVisibleChange(visibleValue);
      }}
      form={form}
      onFinish={onFinish}
      initialValues={initialValues}
    >
      <ProFormText name='id' hidden />
      <ProForm.Group>
        <Upload
          // action='https://www.mocky.io/v2/5cc8019d300000980a055e76'
          listType='picture-card'
          fileList={fileList}
          beforeUpload={beforeUpload}
          onChange={onChange}
          onPreview={onPreview}
        >
          {fileList.length < 1 && '+ Upload'}
        </Upload>
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
        <ProFormDatePicker name='birthday' label='生日' width='md' />
      </ProForm.Group>
      <ProFormTextArea name='remark' label='备注' width='xl' />
    </ModalForm>
  );
};

export default connect((state: ConnectState) => ({
  loginUserInfo: state.login.loginUserInfo,
}))(EditPlayer);
