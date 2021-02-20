import React, { useState } from 'react';
import { Button, Space } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-layout';
import type { ProColumns } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { IDeskTable } from '@/pages/types/desk';
import { queryDeskListApi } from '@/services/desk';
import AddDeskModalForm from '@/pages/desk/components/ModalForm/AddDeskModalForm';
import EditDeskModalForm from '@/pages/desk/components/ModalForm/EditDeskModalForm';

const DeskList: React.FC = () => {
  const [createDeskModalVisible, handleCreateDeskModalVisible] = useState<boolean>(false);
  const [editDeskModalVisible, handleEditDeskModalVisible] = useState<boolean>(false);
  const [currentData, setCurrentData] = useState<IDeskTable>(Object.create(null));

  const createDeskModalStatusSwitch = (createDeskModalStatus: boolean) => {
    handleCreateDeskModalVisible(createDeskModalStatus);
  };

  const editDeskModalStatusSwitch = (editDeskModalStatus: boolean, currentEditData?: any) => {
    handleEditDeskModalVisible(editDeskModalStatus);
    setCurrentData(currentEditData);
  };

  const columns: ProColumns<IDeskTable>[] = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      search: false,
    },
    {
      title: ' 桌号',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: '是否可用',
      dataIndex: 'isEnabled',
      key: 'isEnabled',
      valueEnum: {
        true: {
          text: '是',
          status: 'success',
        },
        false: {
          text: '否',
          status: 'error',
        },
      },
    },
    {
      title: '操作',
      key: 'action',
      search: false,
      render: (record: any) => (
        <Space size='middle'>
          <a onClick={() => editDeskModalStatusSwitch(true, record)}>修改</a>
        </Space>
      ),
    },
  ];

  return (
    <PageContainer>
      <ProTable<IDeskTable>
        headerTitle='桌台管理'
        rowKey='id'
        search={false}
        toolBarRender={() => [
          <Button
            type='primary'
            key='primary'
            onClick={() => {
              createDeskModalStatusSwitch(true);
            }}
          >
            <PlusOutlined /> 新建
          </Button>,
        ]}
        options={false}
        request={(params) => queryDeskListApi({ ...params })}
        pagination={{
          pageSize: 10,
        }}
        columns={columns}
      >
      </ProTable>
      <AddDeskModalForm visible={createDeskModalVisible} onVisibleChange={handleCreateDeskModalVisible} />
      <EditDeskModalForm visible={editDeskModalVisible} onVisibleChange={handleEditDeskModalVisible} currentData={currentData} />
    </PageContainer>
  );
};

export default DeskList;
