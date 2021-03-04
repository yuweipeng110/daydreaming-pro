import React, { useRef, useState } from 'react';
import { Button, Space } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-layout';
import type { ProColumns } from '@ant-design/pro-table';
import ProTable, { ActionType } from '@ant-design/pro-table';
import { IUserTable } from '@/pages/types/user';
import { queryUserListApi } from '@/services/user';
import AddUser from '@/pages/user/components/ModalForm/AddUser';
import EditUser from '@/pages/user/components/ModalForm/EditUser';
import { UserRoleEnum, UserSexEnum } from '@/pages/constants';

const UserList: React.FC = () => {
  const actionRef = useRef<ActionType>();
  const [createUserModalVisible, handleCreateUserModalVisible] = useState<boolean>(false);
  const [editUserModalVisible, handleEditUserModalVisible] = useState<boolean>(false);
  const [currentData, setCurrentData] = useState<IUserTable>(Object.create(null));

  const createUserModalStatusSwitch = (createUserModalStatus: boolean) => {
    handleCreateUserModalVisible(createUserModalStatus);
  };

  const editUserModalStatusSwitch = (editUserModalStatus: boolean, rowCurrentData?: any) => {
    handleEditUserModalVisible(editUserModalStatus);
    setCurrentData(rowCurrentData);
  };

  const columns: ProColumns<IUserTable>[] = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      search: false,
    },
    {
      title: ' 昵称',
      dataIndex: 'nickname',
    },
    {
      title: '性别',
      dataIndex: 'sex',
      valueEnum: UserSexEnum,
      search: false,
    },
    {
      title: ' 手机号',
      dataIndex: 'phone',
    },
    {
      title: '生日',
      dataIndex: 'birthday',
      search: false,
    },
    {
      title: '角色',
      dataIndex: 'role',
      valueEnum: UserRoleEnum,
      search: false,
    },
    {
      title: '备注',
      dataIndex: 'remark',
      key: 'remark',
      search: false,
    },
    {
      title: '操作',
      key: 'action',
      search: false,
      render: (record: any) => (
        <Space size="middle">
          <a onClick={() => editUserModalStatusSwitch(true, record)}>修改</a>
        </Space>
      ),
    },
  ];

  return (
    <PageContainer>
      <ProTable<IUserTable>
        headerTitle="用户管理"
        actionRef={actionRef}
        rowKey="id"
        // search={false}
        toolBarRender={() => [
          <Button
            type="primary"
            key="primary"
            onClick={() => {
              createUserModalStatusSwitch(true);
            }}
          >
            <PlusOutlined /> 添加用户
          </Button>,
        ]}
        options={false}
        request={(params) => queryUserListApi({ ...params })}
        pagination={{
          pageSize: 10,
        }}
        columns={columns}
      ></ProTable>
      <AddUser
        actionRef={actionRef}
        visible={createUserModalVisible}
        onVisibleChange={handleCreateUserModalVisible}
      />
      <EditUser
        actionRef={actionRef}
        visible={editUserModalVisible}
        onVisibleChange={handleEditUserModalVisible}
        currentData={currentData}
      />
    </PageContainer>
  );
};

export default UserList;
