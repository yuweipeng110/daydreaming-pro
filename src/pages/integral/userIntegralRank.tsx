import React, { useRef } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import ProCard from '@ant-design/pro-card';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import ProTable, { TableDropdown } from '@ant-design/pro-table';
import request from 'umi-request';
import './index.less';

type GithubIssueItem = {
  url: string;
  id: number;
  number: number;
  title: string;
  labels: {
    name: string;
    color: string;
  }[];
  state: string;
  comments: number;
  created_at: string;
  updated_at: string;
  closed_at?: string;
};

const columns: ProColumns<GithubIssueItem>[] = [
  {
    dataIndex: 'index',
    valueType: 'indexBorder',
    width: 48,
  },
  {
    title: '标题',
    dataIndex: 'title',
    copyable: true,
    ellipsis: true,
    tip: '标题过长会自动收缩',
    formItemProps: {
      rules: [
        {
          required: true,
          message: '此项为必填项',
        },
      ],
    },
    width: '30%',
  },
  {
    title: '状态',
    dataIndex: 'state',
    filters: true,
    onFilter: true,
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
        disabled: true,
      },
      processing: {
        text: '解决中',
        status: 'Processing',
      },
    },
  },
  {
    title: '创建时间',
    key: 'showTime',
    dataIndex: 'created_at',
    valueType: 'date',
    hideInSearch: true,
  },
  {
    title: '操作',
    valueType: 'option',
    render: (text, record, _, action) => [
      <a
        key='editable'
        onClick={() => {
          action.startEditable?.(record.id);
        }}
      >
        编辑
      </a>,
      <a href={record.url} target='_blank' rel='noopener noreferrer' key='view'>
        查看
      </a>,
      <TableDropdown
        key='actionGroup'
        onSelect={() => action.reload()}
        menus={[
          { key: 'copy', name: '复制' },
          { key: 'delete', name: '删除' },
        ]}
      />,
    ],
  },
];

const UserIntegralRank: React.FC = () => {
  const actionRef = useRef<ActionType>();

  return (
    <PageContainer>
      <div className='card-container'>
        <ProCard
          tabs={{
            type: 'card',
          }}
        >
          <ProCard.TabPane key="tab1" tab="产品一">
            <ProTable<GithubIssueItem>
              headerTitle='高级表格111'
              actionRef={actionRef}
              rowKey='id'
              // search={false}
              options={false}
              request={async (params = {}) =>
                request<{
                  data: GithubIssueItem[];
                }>('https://proapi.azurewebsites.net/github/issues', {
                  params,
                })
              }
              pagination={{
                pageSize: 10,
              }}
              columns={columns}
            />
          </ProCard.TabPane>
          <ProCard.TabPane key="tab2" tab="产品二">
            <p>Content of Tab Pane 2</p>
            <p>Content of Tab Pane 2</p>
            <p>Content of Tab Pane 2</p>
            <p>Content of Tab Pane 2</p>
            <p>Content of Tab Pane 2</p>
            <p>Content of Tab Pane 2</p>
            <p>Content of Tab Pane 2</p>
            <p>Content of Tab Pane 2</p>
            <p>Content of Tab Pane 2</p>
            <p>Content of Tab Pane 2</p>
            <p>Content of Tab Pane 2</p>
            <p>Content of Tab Pane 2</p>
            <p>Content of Tab Pane 2</p>
            <p>Content of Tab Pane 2</p>
            <p>Content of Tab Pane 2</p>
            <p>Content of Tab Pane 2</p>
            <p>Content of Tab Pane 2</p>
          </ProCard.TabPane>
        </ProCard>
      </div>
    </PageContainer>
  );
};

export default UserIntegralRank;
