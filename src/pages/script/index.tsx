import React, { useRef, useState } from 'react';
import { Button, Space } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-layout';
import type { ProColumns } from '@ant-design/pro-table';
import ProTable, { ActionType } from '@ant-design/pro-table';
import { IScriptTable } from '@/pages/types/script';
import { queryScriptListApi } from '@/services/script';
import AddScript from '@/pages/script/components/ModalForm/AddScript';
import EditScript from '@/pages/script/components/ModalForm/EditScript';
import { ScriptIsAdaptEnum } from '@/pages/constants';

const ScriptList: React.FC = () => {
  const actionRef = useRef<ActionType>();
  const [createScriptModalVisible, handleCreateScriptModalVisible] = useState<boolean>(false);
  const [editScriptModalVisible, handleEditScriptModalVisible] = useState<boolean>(false);
  const [currentData, setCurrentData] = useState<IScriptTable>(Object.create(null));

  const createScriptModalStatusSwitch = (createScriptModalStatus: boolean) => {
    handleCreateScriptModalVisible(createScriptModalStatus);
  };

  const editScriptModalStatusSwitch = (editScriptModalStatus: boolean, rowCurrentData: any) => {
    handleEditScriptModalVisible(editScriptModalStatus);
    setCurrentData(rowCurrentData);
  };

  const columns: ProColumns<IScriptTable>[] = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      search: false,
    },
    {
      title: ' 剧本名称',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: '类型',
      dataIndex: 'type',
      key: 'type',
    },
    {
      title: '成本价格',
      dataIndex: 'costPrice',
      key: 'costPrice',
      valueType: 'money',
      align: 'right',
    },
    {
      title: '开本价格',
      dataIndex: 'formatPrice',
      key: 'formatPrice',
      valueType: 'money',
      align: 'right',
    },
    {
      title: '拥有数量',
      dataIndex: 'amount',
      key: 'amount',
    },
    {
      title: '适用人数',
      dataIndex: 'applicableNumber',
      key: 'applicableNumber',
    },
    {
      title: '是否改编',
      dataIndex: 'isAdapt',
      key: 'isAdapt',
      valueEnum: ScriptIsAdaptEnum,
    },
    {
      title: '游戏时间（小时）',
      dataIndex: 'gameTime',
      key: 'gameTime',
    },
    {
      title: '改编内容',
      dataIndex: 'adaptContent',
      key: 'adaptContent',
    },
    {
      title: '描述',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: '操作',
      key: 'action',
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
              createScriptModalStatusSwitch(true);
            }}
          >
            <PlusOutlined /> 添加剧本
          </Button>,
        ]}
        options={false}
        request={(params) => queryScriptListApi({ ...params })}
        pagination={{
          pageSize: 10,
        }}
        columns={columns}
      ></ProTable>
      <AddScript
        actionRef={actionRef}
        visible={createScriptModalVisible}
        onVisibleChange={handleCreateScriptModalVisible}
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

export default ScriptList;
