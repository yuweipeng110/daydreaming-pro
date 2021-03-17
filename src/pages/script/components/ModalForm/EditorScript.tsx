import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Form, message } from 'antd';
import { ModalForm, ProFormText } from '@ant-design/pro-form';
import { ConnectProps, ConnectState } from '@/models/connect';
import { IAddScriptResponse, IScriptTable } from '@/pages/types/script';
import { editScriptApi } from '@/services/script';
import { IUserTable } from '@/pages/types/user';
import { STATUS_CODE } from '@/pages/constants';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import '../../index.less';

export type TProps = {
  actionRef: any;
  visible: boolean;
  onVisibleChange: (visible: boolean) => void;
  currentData: IScriptTable;
  loginUserInfo: IUserTable;
} & ConnectProps;

const EditorScript: React.FC<TProps> = (props) => {
  const { actionRef, visible, onVisibleChange, currentData, loginUserInfo } = props;
  const initialValues = { ...currentData };
  const [form] = Form.useForm();
  const [editState, setEditState] = useState(EditorState.createEmpty());

  // 内容回显
  const editorContentEcho = () => {
    const contentBlock = htmlToDraft(currentData.content);
    if (contentBlock) {
      const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
      const tempEditorState = EditorState.createWithContent(contentState);
      setEditState(tempEditorState);
    }
  };

  useEffect(() => {
    if (visible) {
      editorContentEcho();
    }
  }, [visible]);

  const onEditorStateChange = (value: any) => {
    setEditState(value);
  };

  const onSubmit = async (values: any) => {
    const loadingKey = 'loadingKey';
    message.loading({ content: '正在保存...', key: loadingKey, duration: 0 });
    const params = {
      ...values,
      scriptId: values.id,
      storeId: loginUserInfo.storeId,
      content: draftToHtml(convertToRaw(editState.getCurrentContent())),
    };
    const res: IAddScriptResponse = await editScriptApi(params);
    if (Number(res.code) !== STATUS_CODE.SUCCESS) {
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
      title="内容详情"
      visible={visible}
      onVisibleChange={(visibleValue) => {
        form.resetFields();
        onVisibleChange(visibleValue);
      }}
      form={form}
      onFinish={onFinish}
      width="90%"
      initialValues={initialValues}
    >
      <ProFormText name="id" hidden />
      <Editor
        editorState={editState}
        wrapperClassName="demo-wrapper"
        editorClassName="demo-editor"
        onEditorStateChange={onEditorStateChange}
      />
    </ModalForm>
  );
};

export default connect((state: ConnectState) => ({
  loginUserInfo: state.login.loginUserInfo,
}))(EditorScript);
