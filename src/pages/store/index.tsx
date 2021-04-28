import React, { useRef, useState } from 'react';
import { Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-layout';
import type { ProColumns } from '@ant-design/pro-table';
import ProTable, { ActionType } from '@ant-design/pro-table';
import { IStoreTable } from '@/pages/types/store';
import EditStore from '@/pages/store/components/ModalForm/EditStore';
import { queryStoreListApi } from '@/services/store';
import { StoreStatusEnum } from '@/pages/constants';
import Authorized from '@/components/Authorized/Authorized';

const StoreList: React.FC = () => {
  const actionRef = useRef<ActionType>();
  const [editStoreModalVisible, handleEditStoreModalVisible] = useState<boolean>(false);
  const [currentData, setCurrentData] = useState<IStoreTable>(Object.create(null));

  const editStoreModalStatusSwitch = (editStoreModalStatus: boolean, rowCurrentData?: any) => {
    handleEditStoreModalVisible(editStoreModalStatus);
    setCurrentData(rowCurrentData);
  };

  const columns: ProColumns<IStoreTable>[] = [
    {
      title: '门店名称',
      dataIndex: 'storeName',
    },
    {
      title: '管理员 (真实姓名)',
      dataIndex: ['bossInfo', 'realName'],
    },
    {
      title: '管理员 (账号)',
      dataIndex: ['bossInfo', 'userName'],
      search: false,
    },
    {
      title: '管理员 (密码)',
      dataIndex: ['bossInfo', 'password'],
      search: false,
    },
    {
      title: '手机 (电话)',
      dataIndex: 'phoneNumber',
      key: 'phoneNumber',
    },
    {
      title: '系统使用状态',
      dataIndex: 'status',
      valueEnum: StoreStatusEnum,
    },
    {
      title: '门店地址',
      dataIndex: 'address',
      width: '20%',
      search: false,
      ellipsis: true,
    },
    {
      title: '操作',
      render: (dom, entity) => <a onClick={() => editStoreModalStatusSwitch(true, entity)}>修改</a>,
    },
  ];

  return (
    <Authorized authority={['admin']}>
      <PageContainer>
        <ProTable<IStoreTable>
          headerTitle='门店管理'
          actionRef={actionRef}
          rowKey='id'
          search={{
            labelWidth: 'auto',
          }}
          toolBarRender={() => [
            <Button
              type='primary'
              key='primary'
              onClick={() => {
                editStoreModalStatusSwitch(true);
              }}
            >
              <PlusOutlined /> 新建门店
            </Button>,
          ]}
          options={false}
          request={(params) => queryStoreListApi({ ...params })}
          pagination={{
            pageSize: 10,
          }}
          columns={columns}
        />
        <EditStore
          actionRef={actionRef}
          visible={editStoreModalVisible}
          onVisibleChange={handleEditStoreModalVisible}
          currentData={currentData}
        />
      </PageContainer>
    </Authorized>
  );
};

export default StoreList;
