import React, { useState } from 'react';
import { Button, Space } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-layout';
import type { ProColumns } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { IUserTable } from '@/pages/types/user';
import { queryPlayerListApi } from '@/services/player';
import AddPlayerModalForm from '@/pages/player/components/ModalForm/AddPlayerModalForm';
import EditPlayerModalForm from '@/pages/player/components/ModalForm/EditPlayerModalForm';

const PlayerList: React.FC = () => {
  const [createPlayerModalVisible, handleCreatePlayerModalVisible] = useState<boolean>(false);
  const [editPlayerModalVisible, handleEditPlayerModalVisible] = useState<boolean>(false);
  const [accountRechargeModalVisible, handleAccountRechargeModalVisible] = useState<boolean>(false);
  const [currentData, setCurrentData] = useState<IUserTable>(Object.create(null));

  const createPlayerModalStatusSwitch = (createPlayerModalStatus: boolean) => {
    handleCreatePlayerModalVisible(createPlayerModalStatus);
  };

  const editPlayerModalStatusSwitch = (editPlayerModalStatus: boolean, currentData?: any) => {
    handleEditPlayerModalVisible(editPlayerModalStatus);
    setCurrentData(currentData);
  };

  const accountRechargeModalStatusSwitch = (accountRechargeModalStatus: boolean, currentData: any) => {
    handleAccountRechargeModalVisible(accountRechargeModalStatus);
    setCurrentData(currentData);
  }

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
      key: 'nickname',
    },
    {
      title: '性别',
      dataIndex: 'sex',
      key: 'sex',
      valueEnum: {
        0: {
          text: '女',
        },
        1: {
          text: '男',
        },
      },
    },
    {
      title: ' 手机号',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: '生日',
      dataIndex: 'birthday',
      key: 'birthday'
    },
    {
      title: '杀手积分',
      dataIndex: 'killerIntegral',
      key: 'killerIntegral'
    },
    {
      title: '侦探积分',
      dataIndex: 'detectiveIntegral',
      key: 'detectiveIntegral'
    },
    {
      title: '路人积分',
      dataIndex: 'peopleIntegral',
      key: 'peopleIntegral'
    },
    {
      title: '总榜积分',
      dataIndex: 'totalIntegral',
      key: 'totalIntegral'
    },
    {
      title: '可用积分',
      dataIndex: 'activeIntegral',
      key: 'activeIntegral'
    },
    {
      title: '账户余额',
      dataIndex: 'accountBalance',
      key: 'accountBalance',
      align: 'right'
    },
    {
      title: '代金卷余额',
      dataIndex: 'voucherBalance',
      key: 'voucherBalance',
      align: 'right'
    },
    {
      title: '备注',
      dataIndex: 'remark',
      key: 'remark'
    },
    {
      title: '操作',
      key: 'action',
      search: false,
      render: (record: any) => (
        <Space size='middle'>
          <a onClick={() => accountRechargeModalStatusSwitch(true, record)}>充值</a>
          <a onClick={() => editPlayerModalStatusSwitch(true, record)}>修改</a>
        </Space>
      ),
    },
  ];

  return (
    <PageContainer>
      <ProTable<IUserTable>
        headerTitle='玩家管理'
        rowKey='id'
        search={false}
        toolBarRender={() => [
          <Button
            type='primary'
            key='primary'
            onClick={() => {
              createPlayerModalStatusSwitch(true);
            }}
          >
            <PlusOutlined /> 添加玩家
          </Button>,
        ]}
        options={false}
        request={(params) => queryPlayerListApi({ ...params })}
        pagination={{
          pageSize: 10,
        }}
        columns={columns}
      >
      </ProTable>
      <AddPlayerModalForm visible={createPlayerModalVisible} onVisibleChange={handleCreatePlayerModalVisible} />
      <EditPlayerModalForm visible={editPlayerModalVisible} onVisibleChange={handleEditPlayerModalVisible} currentData={currentData} />
      {/*<AccountRechargeModelModel visible={accountRechargeModalVisible} onVisibleChange={handleAccountRechargeModalVisible} currentData={currentData} />*/}
    </PageContainer>
  );
};

export default PlayerList;
