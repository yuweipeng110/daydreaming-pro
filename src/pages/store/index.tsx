import React, { useState } from 'react';
import { Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-layout';
import type { ProColumns } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { IStoreTable } from '@/pages/types/store';
import { queryStoreManagementListApi } from '@/services/store';
import _ from 'lodash';

const StoreList: React.FC = () => {

  const [storeCreateModalVisible, handleStoreCreateModalVisible] = useState<boolean>(false);

  const columns: ProColumns<IStoreTable>[] = [
    {
      title: '门店名称',
      dataIndex: 'storeName',
      key: 'storeName',
    },
    {
      title: '系统使用状态',
      dataIndex: 'status',
      key: 'status',
    },
    {
      title: '管理员账号 (真实姓名)',
      key: 'realName',
      render: (record: any) => {
        if (!_.isEmpty(record.bossInfo)) {
          return record.bossInfo.realName;
        }
        return '';
      },
    },
    {
      title: '管理员 (密码)',
      key: 'passWord',
      render: (record: any) => {
        if (!_.isEmpty(record.bossInfo)) {
          return record.bossInfo.password;
        }
        return '';
      },
    },
    {
      title: '手机 (电话)',
      dataIndex: 'phoneNumber',
      key: 'phoneNumber',
    },
    {
      title: '门店地址',
      dataIndex: 'address',
      key: 'address',
      width: '30%',
    },
    {
      title: '操作',
      key: 'action',
    },
  ];

  return (
    <PageContainer>
      <ProTable<IStoreTable>
        headerTitle='门店管理'
        rowKey='id'
        search={false}
        toolBarRender={() => [
          <Button
            type='primary'
            key='primary'
            onClick={() => {
              handleStoreCreateModalVisible(true);
            }}
          >
            <PlusOutlined /> 新建
          </Button>,
        ]}
        options={false}
        request={(params) => queryStoreManagementListApi({ ...params })}
        pagination={{
          pageSize: 10,
        }}
        columns={columns}
      >
      </ProTable>
    </PageContainer>
  );
};

export default StoreList;
