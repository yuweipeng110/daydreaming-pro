import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Button, Form, message } from 'antd';
import { ModalForm, ProFormText } from '@ant-design/pro-form';
import { ConnectProps, ConnectState } from '@/models/connect';
import { IAddScriptResponse, IScriptTable } from '@/pages/types/script';
import { editScriptApi } from '@/services/script';
import { IUserTable } from '@/pages/types/user';
import { STATUS_CODE } from '@/pages/constants';
import BraftEditor, { EditorState } from 'braft-editor';
import Table from 'braft-extensions/dist/table';
import 'braft-editor/dist/index.css';
import 'braft-extensions/dist/table.css';
import '../../index.less';

// 输出表格默认不带边框，如果需要边框，设置参数exportAttrString为'border="1" style="border-collapse: collapse"'
const options = {
  defaultColumns: 5, // 默认列数
  defaultRows: 5, // 默认行数
  withDropdown: true, // 插入表格前是否弹出下拉菜单
  columnResizable: true, // 是否允许拖动调整列宽，默认false
  exportAttrString: 'border="1"', // 指定输出HTML时附加到table标签上的属性字符串
};

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
  BraftEditor.use(Table(options));

  const [editorContent, setEditorContent] = useState(BraftEditor.createEditorState(null));
  const [outputHTML, setOutputHTML] = useState<string>('');

  // 内容回显
  const editorContentEcho = () => {
    setEditorContent(BraftEditor.createEditorState(currentData.content));
  };

  useEffect(() => {
    if (visible) {
      editorContentEcho();
    }
  }, [visible]);

  const handleChange = (v: EditorState) => {
    setEditorContent(v);
    setOutputHTML(v.toHTML());
  };

  const onSubmit = async (values: any) => {
    const loadingKey = 'loadingKey';
    message.loading({ content: '正在保存...', key: loadingKey, duration: 0 });
    const params = {
      ...values,
      scriptId: initialValues.id,
      storeId: loginUserInfo.storeId,
      content: outputHTML,
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
      title='内容详情'
      visible={visible}
      onVisibleChange={(visibleValue) => {
        form.resetFields();
        onVisibleChange(visibleValue);
      }}
      form={form}
      onFinish={async () => {
        return false;
      }}
      submitter={{
        submitButtonProps: {
          style: {
            display: 'none',
          },
        },
        render: (tmpProps, defaultDoms) => {
          return [
            ...defaultDoms,
            <Button
              key='save'
              type='primary'
              onClick={() => {
                onFinish({});
              }}
            >
              保存内容
            </Button>,
          ];
        },
      }}
      width='95%'
      initialValues={initialValues}
    >
      <ProFormText name='id' hidden />
      <BraftEditor
        className='demo-editor'
        value={editorContent}
        onChange={handleChange}
      />
    </ModalForm>
  );
};

export default connect((state: ConnectState) => ({
  loginUserInfo: state.login.loginUserInfo,
}))(EditorScript);
