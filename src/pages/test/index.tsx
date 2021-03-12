import React from 'react';
import { Tree, Input, Form, message } from 'antd';
import ProForm, { ProFormText } from '@ant-design/pro-form';

const Test: React.FC = () => {
  const [form] = Form.useForm();
  // get-promotions-list params isActive
  // get-user-list params isHost
  // get-revenue-list statistics total
  // undone
  // ping++ 聚合支付 ？order or recharge diff undone
  // week undone
  // editor no copy undone

  const treeData = [
    {
      title: 'parent 1',
      key: '0-0',
      children: [
        {
          title: 'parent 1-0',
          key: '0-0-0',
          children: [
            { title: 'leaf', key: '0-0-0-0' },
            {
              title: ['leaf2', <ProFormText name={['zzz', 'xxx', 'ccc']} />],
              key: '0-0-0-1',
            },
            { title: 'leaf', key: '0-0-0-2' },
            { title: <Input />, key: '0-0-0-3' },
          ],
        },
      ],
    },
  ];

  const onSelect = (selectedKeys: React.Key[], info: any) => {
    console.log('selected', selectedKeys, info);
  };

  return (
    <div>
      <ProForm
        form={form}
        onValuesChange={(changeValues) => console.log(changeValues)}
        onFinish={async (formData) => {
          console.log('formData', formData);
          message.success('提交成功');
        }}
      >
        <ProForm.Item shouldUpdate name="rrr">
          <Input />
        </ProForm.Item>
        <ProForm.Item shouldUpdate name="eee">
          <Tree
            showLine={{ showLeafIcon: false }}
            defaultExpandedKeys={['0-0-0']}
            onSelect={onSelect}
            treeData={treeData}
          />
        </ProForm.Item>
      </ProForm>
    </div>
  );
};

export default Test;
