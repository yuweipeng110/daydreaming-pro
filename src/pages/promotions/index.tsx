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
      title: '活动名称',
      dataIndex: 'title',
      search: false,
    },
    {
      title: '是否激活',
      dataIndex: 'isActive',
      valueEnum: PromotionsIsActiveEnum,
    },
    {
      title: '活动开始时间',
      dataIndex: 'startTime',
      valueType: 'dateTime',
      align: 'center',
      search: false,
    },
    {
      title: '活动结束时间',
      dataIndex: 'endTime',
      valueType: 'dateTime',
      align: 'center',
      search: false,
    },
    {
      title: '充值金额',
      dataIndex: 'rechargeMoney',
      valueType: 'money',
      align: 'right',
      search: false,
    },
    {
      title: '代金劵金额',
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
        headerTitle="活动"
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
            <PlusOutlined /> 添加活动
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
