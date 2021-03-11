import React, { useRef, useState } from 'react';
import { Button, Space } from 'antd';
import { connect } from 'react-redux';
import { ConnectProps, ConnectState } from '@/models/connect';
import { PlusOutlined } from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-layout';
import type { ProColumns } from '@ant-design/pro-table';
import ProTable, { ActionType } from '@ant-design/pro-table';
import { IDeskTable } from '@/pages/types/desk';
import { queryDeskListApi } from '@/services/desk';
import EditDesk from '@/pages/desk/components/ModalForm/EditDesk';
import { DeskIsEnabledEnum } from '@/pages/constants';

const DeskList: React.FC<ConnectProps & StateProps> = (props) => {
  const { loginUserInfo } = props;
  const actionRef = useRef<ActionType>();
  const [editDeskModalVisible, handleEditDeskModalVisible] = useState<boolean>(false);
  const [currentData, setCurrentData] = useState<IDeskTable>(Object.create(null));

  const editDeskModalStatusSwitch = (editDeskModalStatus: boolean, rowCurrentData?: any) => {
    handleEditDeskModalVisible(editDeskModalStatus);
    setCurrentData(rowCurrentData);
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
      valueEnum: DeskIsEnabledEnum,
    },
    {
      title: '操作',
      key: 'action',
      search: false,
      render: (record: any) => (
        <Space size="middle">
          <a onClick={() => editDeskModalStatusSwitch(true, record)}>修改</a>
        </Space>
      ),
    },
  ];

  return (
    <PageContainer>
      <ProTable<IDeskTable>
        headerTitle="桌台管理"
        actionRef={actionRef}
        rowKey="id"
        search={false}
        toolBarRender={() => [
          <Button
            type="primary"
            key="primary"
            onClick={() => {
              editDeskModalStatusSwitch(true);
            }}
          >
            <PlusOutlined /> 创建桌台
          </Button>,
        ]}
        options={false}
        request={(params) => queryDeskListApi({ ...params, storeId: loginUserInfo.storeId })}
        pagination={{
          pageSize: 10,
        }}
        columns={columns}
      />
      <EditDesk
        actionRef={actionRef}
        visible={editDeskModalVisible}
        onVisibleChange={handleEditDeskModalVisible}
        currentData={currentData}
      />
    </PageContainer>
  );
};

const mapStateToProps = (state: ConnectState) => ({
  loginUserInfo: state.login.loginUserInfo,
});
type StateProps = ReturnType<typeof mapStateToProps>;

export default connect(mapStateToProps)(DeskList);
