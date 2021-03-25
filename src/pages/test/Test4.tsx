import BraftEditor, { EditorState } from 'braft-editor';
import Table from 'braft-extensions/dist/table';
import 'braft-editor/dist/index.css';
import 'braft-extensions/dist/table.css';
import { useEffect, useState } from 'react';
import './index.less';

// 输出表格默认不带边框，如果需要边框，设置参数exportAttrString为'border="1" style="border-collapse: collapse"'
const options = {
  defaultColumns: 5, // 默认列数
  defaultRows: 5, // 默认行数
  withDropdown: true, // 插入表格前是否弹出下拉菜单
  columnResizable: true, // 是否允许拖动调整列宽，默认false
  exportAttrString: '', // 指定输出HTML时附加到table标签上的属性字符串
  // includeEditors: ['id-1'], // 指定该模块对哪些BraftEditor生效，不传此属性则对所有BraftEditor有效
  // excludeEditors: ['id-2']  // 指定该模块对哪些BraftEditor无效
};

export default () => {
  const [editorContent, setEditorContent] = useState(BraftEditor.createEditorState(null));
  const [outputHTML, setOutputHTML] = useState<string>('');
  BraftEditor.use(Table(options));

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
    // 如报错 请删除package.json的（braft-editor、braft-extensions）并重新安装依赖
    const getSysResult = `<strong>IV.引入智能环节：模型</strong>`;
    setEditorContent(BraftEditor.createEditorState(getSysResult));
  },[])

  const handleChange = (v: EditorState) => {
    setEditorContent(v);
    setOutputHTML(v.toHTML());
  };

  return (
    <BraftEditor
      className='demo-editor'
      value={editorContent}
      onChange={handleChange}
    />
  );
}
