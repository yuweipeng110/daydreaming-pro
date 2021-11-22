import { useEffect, useState } from 'react';
import ProForm from '@ant-design/pro-form';
import { Form, Mentions, AutoComplete, Input } from 'antd';
import { ThunderboltTwoTone } from '@ant-design/icons';
import _, { isString } from 'lodash';
import { await } from 'signale';
const { TextArea } = Input;

const { Option } = Mentions;
const list = [
  'abstract',
  'assert',
  'boolean',
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
  'void',
  'volatile',
  'while',
];
const prefixList = [' '];
const keywordList: any = { ' ': list };
let keywordValList: any = [];
// debugger
list.map((item, index) => {
  const strKey = item.substring(0, 1);
  if (keywordValList.length > 0 && strKey !== keywordValList[0].substring(0, 1)) {
    keywordValList = [];
  }
  keywordValList.push(item);
  if (prefixList.indexOf(list[index].substring(0, 1)) < 0) {
    prefixList.push(strKey);
    keywordList[strKey] = keywordValList;
  }
});

const mockVal = (str: string, repeat: number = 1) => ({
  value: str.repeat(repeat),
});

export default () => {
  const [toolVal, setToolVal] = useState('');
  const [value, setValue] = useState<string>('');
  const [options, setOptions] = useState<{ value: string }[]>([]);

  // 表达式相关state
  const [expressionPrefix, setExpressionPrefix] = useState<string>('');
  const expressionKeywordList = {
    A: ['AND'],
    O: ['OR'],
    N: ['NOT'],
    ' ': ['AND', 'OR', 'NOT'],
  };

  const handleSearch = (searchText: string) => {
    // console.log('searchText', searchText);
    const searchList = searchText.split(' ');
    // console.log('searchList', searchList);

    const formatList: any = [];
    for (let i = 0; i < list.length; i++) {
      if (searchList.length <= 0) {
        if (list[i].indexOf(searchText) === 0) {
          formatList.push({
            value: list[i],
          });
        }
      } else {
        if (list[i].indexOf(searchList[searchList.length - 1]) === 0) {
          formatList.push({
            value: list[i],
          });
        }
      }
    }
    setOptions(!searchText ? [] : formatList);
  };
  const onSelect = (data: string) => {
    // console.log('onSelect', data);
    console.log('onSelect value',value);
    console.log('onSelect value replace', value.replace(value,data));

    console.log('data',data);
    
    setValue(value + value.replace(value,data));
    // setToolVal(data);

    // setValue( value + toolVal);
  };

  const handleChange = (data: string) => {
    // console.log('handleChange',data);

    setValue(data);
  };
  return (
    <ProForm>
      <AutoComplete
        options={options}
        // style={{ width: '100%' }}
        onSelect={onSelect}
        onSearch={handleSearch}
        value={value}
        onChange={handleChange}
      >
        <TextArea placeholder="input here" className="custom" style={{ height: 50 }} />
      </AutoComplete>
      <Form.Item name="conditions" label="条件">
        <Mentions
          rows={3}
          notFoundContent={undefined}
          placeholder="例如：$1 AND ($2 OR $3)"
          prefix={prefixList}
          split=""
          onSearch={(text, prefix) => {
            // console.log('Mentions onSearch prefix', prefix);
            // console.log('Mentions onSearch text', text);
            setExpressionPrefix(prefix);
          }}
        >
          {(expressionKeywordList[expressionPrefix.toLowerCase()] || []).map((value: any) => {
            return (
              <Option key={value} value={value.replace(expressionPrefix, '')}>
                <div>
                  <ThunderboltTwoTone /> {value}&nbsp;
                  <span style={{ color: '#909090' }}>关键字</span>
                </div>
              </Option>
            );
          })}
        </Mentions>
      </Form.Item>
    </ProForm>
  );
};
