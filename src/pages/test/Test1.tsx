import React, { useEffect, useState } from 'react';
import ProForm from '@ant-design/pro-form';
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
    // oncontextmenu='return false'    禁止右键
    // ondragstart='return false'    禁止拖动
    // onselectstart ='return false'    禁止选中
    // onselect='document.selection.empty()'    禁止选中
    // oncopy='document.selection.empty()'    禁止复制
    // onbeforecopy='return false'    禁止复制
    // onmouseup='document.selection.empty()'
    // body 添加
    // oncontextmenu='return false' ondragstart='return false' onselectstart ='return false'
    // onselect='document.selection.empty()' oncopy='document.selection.empty()' onbeforecopy='return false'
    // onmouseup='document.selection.empty()'
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
    <div>
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
          <div onCopy={(e) => e.preventDefault()}>wqeqweasdasdasdzxc</div>
          <Editor
            editorState={editState}
            wrapperClassName="demo-wrapper"
            editorClassName="demo-editor"
            onEditorStateChange={onEditorStateChange}
          />
        </ProForm.Group>
      </ProForm>
    </div>
  );
};
