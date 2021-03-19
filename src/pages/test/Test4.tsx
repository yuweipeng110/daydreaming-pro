import BraftEditor, { EditorState } from 'braft-editor';
import Table from 'braft-extensions/dist/table';
import 'braft-editor/dist/index.css';
import 'braft-extensions/dist/table.css';
import { useState } from 'react';
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
  const [content, setContent] = useState(BraftEditor.createEditorState(null));
  const [outputHTML, setOutputHTML] = useState<string>('');
  BraftEditor.use(Table(options));


  const handleChange = (v: EditorState) => {
    setContent(v);
    setOutputHTML(v.toHTML());
  };

  return (
    <BraftEditor
      className='demo-editor'
      value={content}
      onChange={handleChange}
    />
  );
}
