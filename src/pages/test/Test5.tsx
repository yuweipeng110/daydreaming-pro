import { useEffect, useRef, useState } from 'react';
import CodeMirror, { MergeView } from 'codemirror';
import 'codemirror/lib/codemirror.css';
import 'codemirror/addon/merge/merge.css';
import 'codemirror/mode/xml/xml';
import 'codemirror/mode/css/css';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/mode/htmlmixed/htmlmixed';
import 'codemirror/addon/merge/merge';
import './index.less';

const DMP = require('diff_match_patch');
Object.keys(DMP).forEach((key) => {
  window[key] = DMP[key];
});

export default () => {
  const mergeDiffViewRef = useRef();
  const dv = useRef<MergeView.MergeViewEditor>();
  const [collapse, setCollapse] = useState<boolean>(false);
  const [mergeValue, setMergeValue] = useState<string>('');

  // const oldValue = document.documentElement.innerHTML;
  // const newValue = '<!doctype html>\n\n' + oldValue.replace(/\.\.\//g, 'codemirror/').replace('Compatible', 'Compatible3');
  // const mergeValue = oldValue.replace(/\u003cscript/g, '\u003cscript type="text/javascript" ')
  //   .replace('antd,umi', 'purple;\n      font: comic sans;\n      text-decoration: underline;\n      height: 15em');

  const initCodeMirrorMergeView = () => {
    const value = document.documentElement.innerHTML;
    const orig1 = '<!doctype html>\n\n' + value.replace(/\.\.\//g, 'codemirror/').replace('Compatible', 'Compatible3');
    const orig2 = value.replace(/\u003cscript/g, '\u003cscript type="text/javascript" ')
      .replace('antd,umi', 'purple;\n      font: comic sans;\n      text-decoration: underline;\n      height: 15em');
    const mergeDivvView = CodeMirror.MergeView(mergeDiffViewRef.current, {
      // centerValue
      value,
      // leftValue
      origLeft: orig1,
      // origLeft: null,
      // rightValue
      orig: orig2,
      // origRight: orig,
      lineNumbers: true,
      mode: 'text/html',
      highlightDifferences: true,
      // connect: 'align',
      connect: '',
      collapseIdentical: collapse,
      // allowEditingOriginals: false, //允许编辑文件
      // theme: 'eclipse',
      // gutters: ['CodeMirror-lint-markers'],
      // lint: true,
    });
    mergeDivvView.setShowDifferences(true);
    // dv.current?.editor().getValue()
    dv.current = mergeDivvView;
  };

  useEffect(() => {
    initCodeMirrorMergeView();
    const d = document.createElement("div");
    d.style.cssText = "width: 50px; margin: 7px; height: 14px";
    dv.current?.editor().addLineWidget(57, d);
  }, []);

  const handleGetMergeValue = () => {
    console.log('mergeValue',dv.current?.editor().getValue());
  }

  return (
    <>
      <a
        onClick={() => {
          setCollapse(!collapse);
          initCodeMirrorMergeView();
        }}
      >collapse</a>
      <div>
        <div className='div-code-title'>
          <div className='code-title'>当前内容</div>
          <div className='code-title'>合并后内容</div>
          <div className='code-title'>线上内容</div>
        </div>
        <div ref={mergeDiffViewRef}>
        </div>
      </div>

      <a onClick={handleGetMergeValue}>获取mergeValue</a>
    </>
  );
}
