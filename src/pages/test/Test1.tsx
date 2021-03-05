import React, { useEffect, useState } from 'react';
import ProForm, { ProFormText } from '@ant-design/pro-form';
import { Form, message } from 'antd';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import './index.less';

export default (): React.ReactNode => {
  const [form] = Form.useForm();
  const [editState, setEditState] = useState(EditorState.createEmpty());

  useEffect(() => {
    console.log('useEffect');
  });

  useEffect(() => {
    const getSysResult = `<strong>IV.引入智能环节：模型</strong>`;

    // 回显
    const contentBlock = htmlToDraft(getSysResult);
    if (contentBlock) {
      const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
      const tempEditorState = EditorState.createWithContent(contentState);
      setEditState(tempEditorState);
    }
  }, []);

  const onEditorStateChange = (value: any) => {
    setEditState(value);
  };

  return (
    <ProForm
      form={form}
      onValuesChange={(changeValues) => console.log(changeValues)}
      onFinish={async (formData) => {
        console.log('formData', formData);
        const editorContent = draftToHtml(convertToRaw(editState.getCurrentContent()));
        console.log('editorContent', editorContent);
        message.success('提交成功');
      }}
    >
      <ProForm.Group>
        <ProFormText />
        <Editor
          onCopy={(e: any) => {
            console.log('e', e);
            if (e && e.preventDefault) {
              // add?
              e.preventDefault();
              e.persist();
            }
          }}
          editorState={editState}
          wrapperClassName="demo-wrapper"
          editorClassName="demo-editor"
          onEditorStateChange={onEditorStateChange}
        />
      </ProForm.Group>
    </ProForm>
  );
};
