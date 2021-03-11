import React, { useRef, useState } from 'react';
import { connect } from 'react-redux';
import { ConnectProps, ConnectState } from '@/models/connect';
import { Button, Space } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-layout';
import type { ProColumns } from '@ant-design/pro-table';
import ProTable, { ActionType } from '@ant-design/pro-table';
import { IScriptTable } from '@/pages/types/script';
import { queryScriptListApi } from '@/services/script';
import EditScript from '@/pages/script/components/ModalForm/EditScript';
import { ScriptIsAdaptEnum } from '@/pages/constants';

const ScriptList: React.FC<ConnectProps & StateProps> = (props) => {
  const { loginUserInfo } = props;
  const actionRef = useRef<ActionType>();
  const [editScriptModalVisible, handleEditScriptModalVisible] = useState<boolean>(false);
  const [currentData, setCurrentData] = useState<IScriptTable>(Object.create(null));

  const editScriptModalStatusSwitch = (editScriptModalStatus: boolean, rowCurrentData?: any) => {
    handleEditScriptModalVisible(editScriptModalStatus);
    setCurrentData(rowCurrentData);
  };

  const columns: ProColumns<IScriptTable>[] = [
    {
      title: 'ID',
      dataIndex: 'id',
      search: false,
    },
    {
      title: ' 剧本名称',
      dataIndex: 'title',
    },
    {
      title: '类型',
      dataIndex: 'type',
    },
    {
      title: '成本价格',
      dataIndex: 'costPrice',
      valueType: 'money',
      align: 'right',
    },
    {
      title: '开本价格',
      dataIndex: 'formatPrice',
      valueType: 'money',
      align: 'right',
    },
    {
      title: '拥有数量',
      dataIndex: 'amount',
    },
    {
      title: '适用人数',
      dataIndex: 'applicableNumber',
    },
    {
      title: '是否改编',
      dataIndex: 'isAdapt',
      valueEnum: ScriptIsAdaptEnum,
    },
    {
      title: '游戏时间（小时）',
      dataIndex: 'gameTime',
    },
    {
      title: '改编内容',
      dataIndex: 'adaptContent',
    },
    {
      title: '描述',
      dataIndex: 'description',
    },
    {
      title: '操作',
      search: false,
      render: (record: any) => (
        <Space size="middle">
          <a onClick={() => editScriptModalStatusSwitch(true, record)}>修改</a>
        </Space>
      ),
    },
  ];

  return (
    <PageContainer>
      <ProTable<IScriptTable>
        headerTitle="剧本管理"
        actionRef={actionRef}
        rowKey="id"
        search={false}
        toolBarRender={() => [
          <Button
            type="primary"
            key="primary"
            onClick={() => {
              editScriptModalStatusSwitch(true);
            }}
          >
            <PlusOutlined /> 添加剧本
          </Button>,
        ]}
        options={false}
        request={(params) => queryScriptListApi({ ...params, storeId: loginUserInfo.storeId })}
        pagination={{
          pageSize: 10,
        }}
        columns={columns}
      />
      <EditScript
        actionRef={actionRef}
        visible={editScriptModalVisible}
        onVisibleChange={handleEditScriptModalVisible}
        currentData={currentData}
      />
    </PageContainer>
  );
};

const mapStateToProps = (state: ConnectState) => ({
  loginUserInfo: state.login.loginUserInfo,
});
type StateProps = ReturnType<typeof mapStateToProps>;

export default connect(mapStateToProps)(ScriptList);
