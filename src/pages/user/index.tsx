import React, { useRef, useState } from 'react';
import { connect } from 'react-redux';
import { ConnectProps, ConnectState } from '@/models/connect';
import { Button, Space } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-layout';
import type { ProColumns } from '@ant-design/pro-table';
import ProTable, { ActionType } from '@ant-design/pro-table';
import { IUserTable } from '@/pages/types/user';
import { queryUserListApi } from '@/services/user';
import EditUser from '@/pages/user/components/ModalForm/EditUser';
import { UserRoleEnum, UserSexEnum } from '@/pages/constants';

const UserList: React.FC<ConnectProps & StateProps> = (props) => {
  const { loginUserInfo } = props;
  const actionRef = useRef<ActionType>();
  const [editUserModalVisible, handleEditUserModalVisible] = useState<boolean>(false);
  const [currentData, setCurrentData] = useState<IUserTable>(Object.create(null));

  const editUserModalStatusSwitch = (editUserModalStatus: boolean, rowCurrentData?: any) => {
    handleEditUserModalVisible(editUserModalStatus);
    setCurrentData(rowCurrentData);
  };

  const columns: ProColumns<IUserTable>[] = [
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
      ellipsis: true,
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
              editUserModalStatusSwitch(true);
            }}
          >
            <PlusOutlined /> 添加用户
          </Button>,
        ]}
        options={false}
        request={(params) =>
          queryUserListApi({ ...params, storeId: loginUserInfo.storeId, isHost: true })
        }
        pagination={{
          pageSize: 10,
        }}
        columns={columns}
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
const mapStateToProps = (state: ConnectState) => ({
  loginUserInfo: state.login.loginUserInfo,
});
type StateProps = ReturnType<typeof mapStateToProps>;

export default connect(mapStateToProps)(UserList);
