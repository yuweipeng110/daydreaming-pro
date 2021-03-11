import React, { useRef, useState } from 'react';
import { connect } from 'react-redux';
import { ConnectState } from '@/models/connect';
import { PageContainer } from '@ant-design/pro-layout';
import ProTable, { ActionType, ProColumns } from '@ant-design/pro-table';
import { Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { queryPromotionsListApi } from '@/services/promotions';
import { IUserTable } from '@/pages/types/user';
import { IPromotionsTable } from '@/pages/types/promotions';
import { PromotionsIsActiveEnum } from '@/pages/constants';
import EditPromotions from '@/pages/promotions/components/ModalForm/EditPromotions';

export type TProps = {
  loginUserInfo: IUserTable;
};

const PromotionsList: React.FC<TProps> = (props) => {
  const { loginUserInfo } = props;
  const actionRef = useRef<ActionType>();
  const [editPromotionsModalVisible, handleEditPromotionsModalVisible] = useState<boolean>(false);
  const [currentData, setCurrentData] = useState<IPromotionsTable>(Object.create(null));

  const editPromotionsModalStatusSwitch = (
    editPromotionsModalStatus: boolean,
    rowCurrentData?: any,
  ) => {
    handleEditPromotionsModalVisible(editPromotionsModalStatus);
    setCurrentData(rowCurrentData);
  };

  const columns: ProColumns<IPromotionsTable>[] = [
    {
      title: 'index',
      dataIndex: 'index',
      valueType: 'indexBorder',
    },
    {
      title: 'title',
      dataIndex: 'title',
      search: false,
    },
    {
      title: 'isActive',
      dataIndex: 'isActive',
      valueEnum: PromotionsIsActiveEnum,
    },
    {
      title: 'startTime',
      dataIndex: 'startTime',
      valueType: 'dateTime',
      align: 'center',
      search: false,
    },
    {
      title: 'endTime',
      dataIndex: 'endTime',
      valueType: 'dateTime',
      align: 'center',
      search: false,
    },
    {
      title: 'rechargeMoney',
      dataIndex: 'rechargeMoney',
      valueType: 'money',
      align: 'right',
      search: false,
    },
    {
      title: 'voucherMoney',
      dataIndex: 'voucherMoney',
      valueType: 'money',
      align: 'right',
      search: false,
    },
    {
      title: '操作',
      search: false,
      render: (record: any) => (
        <a onClick={() => editPromotionsModalStatusSwitch(true, record)}>修改</a>
      ),
    },
  ];

  return (
    <PageContainer>
      <ProTable<IPromotionsTable>
        headerTitle="promotions"
        actionRef={actionRef}
        rowKey="id"
        toolBarRender={() => [
          <Button
            type="primary"
            key="primary"
            onClick={() => {
              editPromotionsModalStatusSwitch(true);
            }}
          >
            <PlusOutlined /> AddPromotions
          </Button>,
        ]}
        options={false}
        request={(params) => queryPromotionsListApi({ ...params, storeId: loginUserInfo.storeId })}
        pagination={{
          pageSize: 10,
        }}
        columns={columns}
      />
      <EditPromotions
        actionRef={actionRef}
        visible={editPromotionsModalVisible}
        onVisibleChange={handleEditPromotionsModalVisible}
        currentData={currentData}
      />
    </PageContainer>
  );
};

export default connect((state: ConnectState) => ({
  loginUserInfo: state.login.loginUserInfo,
}))(PromotionsList);
