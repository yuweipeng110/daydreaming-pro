import { useEffect, useState } from 'react';
import { Mentions } from 'antd';
import { SlidersTwoTone } from '@ant-design/icons';
import ProForm, { ModalForm, ProFormSelect, ProFormText } from '@ant-design/pro-form';
import './index.less';
import _ from 'lodash';

const { Option } = Mentions;
const list = [
  'abst.ract',
  'assert',
  'BoolEan',
  'break',
  'byte',
  'case',
  'catch',
  'char',
  'class',
  'const',
  'continue',
  'default',
  'do',
  'double',
  'else',
  'enum',
  'extends',
  'final',
  'finally',
  'float',
  'for',
  'goto',
  'if',
  'implements',
  'import',
  'instanceof',
  'int',
  'interface',
  'long',
  'native',
  'new',
  'package',
  'private',
  'protected',
  'public',
  'return',
  'strictfp',
  'short',
  'static',
  'super',
  'switch',
  'synchronized',
  'this',
  'throw',
  'throws',
  'transient',
  'try',
  'try1',
  'try2',
  'try3',
  'try4',
  'try5',
  'try6',
  'try7',
  'try8',
  'try9',
  'void',
  'volatile',
  'while',
];


export default () => {
  // 表达式相关state
  const [value, setValue] = useState('');
  const [selectPrefix, setSelectPrefix] = useState('');
  const [prefixList, setPrefixList] = useState<string[]>([]);
  const [expressionPrefix, setExpressionPrefix] = useState<string>('');
  const [expressionMentionsList, setExpressionMentionsList] = useState(Object.create(null));

  const handleChange = (text: string) => {
    const xvalList: any = text.split(/[\s\+\-\*/]/);
    const valList: any = _.compact(xvalList);

    console.log('valList', valList);

    const lastStr = valList[valList.length - 1];
    // console.log('lastStr', lastStr);

    setExpressionPrefix(lastStr);
    setPrefixList([lastStr]);

    // 处理array
    const formatList: any = [];
    for (let i = 0; i < list.length; i += 1) {
      if (valList.length <= 0) {
        if (list[i].toLowerCase().indexOf(text.toLowerCase()) === 0) {
          // if (list[i].indexOf(text) === 0) {
          formatList.push(list[i]);
        }
      } else if (list[i].toLowerCase().indexOf(lastStr.toLowerCase()) === 0) {
        // } else if (list[i].indexOf(lastStr) === 0) {
        formatList.push(list[i]);
      }
    }

    const myDiv = document.querySelector('.ant-mentions-dropdown');
    if (myDiv) {
      myDiv.setAttribute('style', 'display: block; height: 0px; !important;');
      if (formatList <= 0) {
        myDiv.setAttribute('style', 'display: none; height: 0px; !important;');
      }
    }
    if (lastStr) {
      setExpressionMentionsList({ [lastStr]: formatList });
    }

    text.substring(value.length, text.length);

    // console.log('value', value);
    // console.log('text',text);

    // console.log('lastStr',lastStr);

    // console.log('xxxx', text.substring(value.length, text.length));
    // console.log('cccc', lastStr.substring(value.length, lastStr.length));

    const fuhao = _.compact(text.split(/[a-zA-Z\s][a-zA-Z\s]*/g));
    console.log('fuhao', fuhao);
    let str = '';
    valList.map((item, index) => {
      str += item;
      // if(index > 0) {
      //    str +=  fuhao[index];
      // }
    });
    console.log('str', str);

    // const aa = text.substring(value.length, text.length);
    // setValue(aa);
    setValue(text);
  };

  useEffect(() => {
    const a = 'ass + Bos - cSq * DOA / Eaw';
    console.log('1', _.compact(a.split(/[\s+\-*/]/)));
    console.log('2', a.split(/[a-zA-Z\s][a-zA-Z\s]*/g));
    // console.log('3', _.compact(a.split(/[a-zA-Z\s]/g)));
  }, []);

  useEffect(() => {
    console.log('prefixList', prefixList);
  }, [prefixList]);
  useEffect(() => {
    console.log('effect value', value);
  }, [value]);
  useEffect(() => {
    console.log('effect expressionPrefix', expressionPrefix);
  }, [expressionPrefix]);

  return (
    <>
      <Mentions
        style={{ width: '100%' }}
        placeholder="input @ to mention people, # to mention tag"
        prefix={prefixList}
        notFoundContent={null}
        onChange={handleChange}
        onSelect={(option, prefix) => {
          // const a = value + option.key;
          // console.log('xxx',prefix.length, value.length,a.length);
          //   setValue(value + a.substring(prefix.length, prefix.length + option.key.length));
          setExpressionMentionsList([]);
          setSelectPrefix(prefix);
        }}
        // value={value}
      >
        {(expressionMentionsList[expressionPrefix] || []).map((data: string) => (
          <Option key={data} value={data}>
            {expressionPrefix} -{data}
          </Option>
        ))}
      </Mentions>
      <ProFormText
        name="expression"
        label="表达式"
        width={687}
        rules={[
          {
            required: true,
          },
          {
            //   pattern: /^[a-zA-Z][a-zA-Z0-9,()\s]*$/,
            pattern: /^[0-9]+$/,
            message: '格式错误，请重新输入',
          },
        ]}
      />
    </>
  );
};
