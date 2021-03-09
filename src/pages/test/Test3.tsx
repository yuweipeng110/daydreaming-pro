import React, { useState } from 'react';
import { Link } from 'umi';
import ProCard from '@ant-design/pro-card';
import { Button, Popconfirm } from 'antd';
import { ArrowUpOutlined, ArrowDownOutlined, MinusOutlined, EditOutlined } from '@ant-design/icons';
import './index.less';
import type { ProColumns } from '@ant-design/pro-table';
import { EditableProTable } from '@ant-design/pro-table';

type DataSourceType = {
  id: React.Key;
  features?: string;
  operator?: string;
  threshold?: number;
};

const defaultData: DataSourceType[] = [
  {
    id: 624748504,
    features: '活动名称一',
    operator: 'open',
    threshold: 10,
  },
  {
    id: 624691229,
    features: '活动名称二',
    operator: 'closed',
    threshold: 14,
  },
];

const Test3 = () => {
  const [editableKeys, setEditableRowKeys] = useState<React.Key[]>(() =>
    defaultData.map((item) => item.id),
  );
  const [dataSource, setDataSource] = useState<DataSourceType[]>(() => defaultData);

  const columns: ProColumns<DataSourceType>[] = [
    {
      title: '特征',
      dataIndex: 'features',
    },
    {
      title: '运算符',
      dataIndex: 'operator',
      valueType: 'select',
      valueEnum: {
        all: { text: '全部', status: 'Default' },
        open: {
          text: '未解决',
          status: 'Error',
        },
        closed: {
          text: '已解决',
          status: 'Success',
        },
      },
    },
    {
      title: '阀值',
      dataIndex: 'threshold',
    },
    {
      title: '操作',
      valueType: 'option',
      align: 'center',
      render: () => {
        return null;
      },
    },
  ];

  const onSaveContent = () => {
    console.log('onSaveContent', dataSource);
  };

  return (
    <ProCard
      className="rule-card"
      title={
        <div>
          <h3>规则内容</h3>
          <span style={{ color: 'red', display: 'block', overflow: 'auto' }}>xxxxxxxx</span>
        </div>
      }
      extra={
        <div className="title">
          <Link
            className="ant-btn ant-btn-primary"
            style={{ marginRight: '5px' }}
            to={`/scene/rule/diff?app_id=1&scene_id=1`}
            target="_blank"
          >
            规则对比
          </Link>
          <Button
            type="primary"
            className="right"
            style={{ marginRight: '5px' }}
            onClick={onSaveContent}
          >
            保存
          </Button>
          <Button type={'primary'} className="right-bottom">
            Source Code
          </Button>
        </div>
      }
    >
      <div className="rule-group-item">
        <div className="title">
          <span className="left">{`阶段11`}</span>
          {
            <>
              <Popconfirm title="确定要删除吗？" key="2">
                <Button type="text" className="right">
                  <MinusOutlined />
                </Button>
              </Popconfirm>
              <Button className="right">
                修改[阶段11]
                <EditOutlined />
              </Button>
            </>
          }
        </div>
        <div className="content">
          <ProCard
            bordered
            title={`[规则111111`}
            headerBordered={false}
            collapsible
            defaultCollapsed
            size="small"
            extra={[
              <Button key={0}>
                <ArrowUpOutlined />
              </Button>,
              <Button key={1}>
                <ArrowDownOutlined />
              </Button>,
              <Button key={2}>修改</Button>,
              <Popconfirm key={3} title="确定要删除吗？">
                <Button>删除</Button>
              </Popconfirm>,
            ]}
          >
            <EditableProTable<DataSourceType>
              headerTitle={false}
              columns={columns}
              rowKey="id"
              value={dataSource}
              onChange={setDataSource}
              recordCreatorProps={{
                newRecordType: 'dataSource',
                record: () => ({
                  id: Date.now(),
                }),
              }}
              editable={{
                type: 'multiple',
                editableKeys,
                actionRender: (row, config, defaultDoms) => {
                  return [defaultDoms.delete];
                },
                onValuesChange: (record, recordList) => {
                  setDataSource(recordList);
                },
                onChange: setEditableRowKeys,
              }}
            />
          </ProCard>
        </div>
      </div>
    </ProCard>
  );
};
export default Test3;
