import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { ConnectState, ConnectProps } from '@/models/connect';
import { Button, Space } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-layout';
import type { ProColumns } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import _ from 'lodash';
import { IStoreTable } from '@/pages/types/store';
import AddStoreModalForm from '@/pages/store/components/ModalForm/AddStoreModalForm';
import EditStoreModalForm from '@/pages/store/components/ModalForm/EditStoreModalForm';

interface IProps extends ConnectProps {
  storeList: IStoreTable[];
};

const StoreList: React.FC<IProps> = (props) => {
  const { storeList, dispatch } = props;

  const [createStoreModalVisible, handleCreateStoreModalVisible] = useState<boolean>(false);
  const [editStoreModalVisible, handleEditStoreModalVisible] = useState<boolean>(false);
  const [currentData, setCurrentData] = useState<IStoreTable>(Object.create(null));

  const loadStoreListData = () => {
    dispatch({
      type: 'store/getStoreListEffect',
    });
  };

  const createStoreModalStatusSwitch = (createStoreModalStatus: boolean) => {
    handleCreateStoreModalVisible(createStoreModalStatus);
  };

  const editStoreModalStatusSwitch = (editStoreModalStatus: boolean, currentEditData?: any) => {
    handleEditStoreModalVisible(editStoreModalStatus);
    setCurrentData(currentEditData);
  };

  useEffect(() => {
    loadStoreListData();
  }, []);

  const columns: ProColumns<IStoreTable>[] = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: '门店名称',
      dataIndex: 'storeName',
      key: 'storeName',
    },
    {
      title: '系统使用状态',
      dataIndex: 'status',
      key: 'status',
      valueEnum: {
        true: {
          text: '使用中',
          status: 'Error',
        },
        false: {
          text: '未激活',
          status: 'Success',
        },
      },
    },
    {
      title: '管理员 (真实姓名)',
      key: 'realName',
      render: (record: any) => {
        if (!_.isEmpty(record.bossInfo)) {
          return record.bossInfo.realName;
        }
        return '';
      },
    },
    {
      title: '管理员 (账号)',
      key: 'realName',
      render: (record: any) => {
        if (!_.isEmpty(record.bossInfo)) {
          return record.bossInfo.userName;
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
      render: (record: any) => (
        <Space size="middle">
          <a onClick={ () => editStoreModalStatusSwitch(true, record) }>修改</a>
        </Space>
      )
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
              createStoreModalStatusSwitch(true);
            }}
          >
            <PlusOutlined /> 新建
          </Button>,
        ]}
        options={false}
        dataSource={storeList}
        // request={(params) => queryStoreListApi({ ...params })}
        pagination={{
          pageSize: 5,
        }}
        columns={columns}
      >
      </ProTable>
      <AddStoreModalForm visible={createStoreModalVisible} onVisibleChange={handleCreateStoreModalVisible} />
      <EditStoreModalForm visible={editStoreModalVisible} onVisibleChange={handleEditStoreModalVisible} currentData={currentData} />
    </PageContainer>
  );
};

export default connect(({ store }: ConnectState) => ({
  storeList: store.storeList,
}))(StoreList);
