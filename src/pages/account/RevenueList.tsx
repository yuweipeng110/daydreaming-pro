import React, { useContext, useState } from 'react';
import { connect } from 'react-redux';
import { ConnectProps, ConnectState } from '@/models/connect';
import { PageContainer } from '@ant-design/pro-layout';
import ProTable, { ProColumns } from '@ant-design/pro-table';
import ProProvider from '@ant-design/pro-provider';
import { ProFormDateRangePicker } from '@ant-design/pro-form';
import { queryRevenueListApi } from '@/services/revenue';
import { IRevenueTable } from '@/pages/types/revenue';
import { SettlementMethodEnum } from '@/pages/constants';
import { IUserTable } from '@/pages/types/user';
import ViewUser from '@/pages/user/components/Modal/ViewUser';
import { IOrderTable } from '@/pages/types/order';
import moment from 'moment';
import ViewOrder from '@/pages/order/components/Modal/ViewOrder';

const RevenueList: React.FC<ConnectProps & StateProps> = (props) => {
  const { loginUserInfo } = props;
  const values = useContext(ProProvider);
  const [viewUserModalVisible, handleViewUserModalVisible] = useState<boolean>(false);
  const [userData, setUserData] = useState<IUserTable>(Object.create(null));
  const [viewOrderModalVisible, handleViewOrderModalVisible] = useState<boolean>(false);
  const [orderData, setOrderData] = useState<IOrderTable>(Object.create(null));

  const viewUserModalStatusSwitch = (viewUserModalStatus: boolean, rowCurrentData: IUserTable) => {
    handleViewUserModalVisible(viewUserModalStatus);
    setUserData(rowCurrentData);
  };

  const viewOrderModalStatusSwitch = (
    viewOrderModalStatus: boolean,
    rowCurrentData: IOrderTable,
  ) => {
    handleViewOrderModalVisible(viewOrderModalStatus);
    setOrderData(rowCurrentData);
  };

  const columns: ProColumns<IRevenueTable, 'customDataRange'>[] = [
    {
      title: '用户',
      search: false,
      dataIndex: 'user',
      render: (text: any, record: any) => {
        const userText = record.userInfo
          ? `${record.userInfo.phone}-${record.userInfo.nickname}`
          : '';
        return <a onClick={() => viewUserModalStatusSwitch(true, record.userInfo)}>{userText}</a>;
      },
    },
    {
      title: '变动金额',
      valueType: 'money',
      search: false,
      dataIndex: 'changeMoney',
      align: 'right',
    },
    {
      title: '变动时间',
      key: 'dateRange',
      dataIndex: 'changeTime',
      valueType: 'customDataRange',
      align: 'center',
    },
    {
      title: '订单号',
      dataIndex: 'order',
      search: false,
      render: (text: any, record: any) => {
        const orderText = record.orderInfo ? record.orderInfo.orderNo : '';
        return (
          <a onClick={() => viewOrderModalStatusSwitch(true, record.orderInfo)}>{orderText}</a>
        );
      },
    },
    {
      title: '结算方式',
      dataIndex: 'paymentMethodId',
      valueEnum: SettlementMethodEnum,
      search: false,
    },
    {
      title: '备注',
      search: false,
      dataIndex: 'remarkIncrease',
    },
  ];

  return (
    <PageContainer>
      <ProProvider.Provider
        value={{
          ...values,
          valueTypeMap: {
            customDataRange: {
              render: (text) => <a>{text}</a>,
              renderFormItem: (_text, _props) => {
                return (
                  <ProFormDateRangePicker
                    {..._props?.fieldProps}
                    name={['changeTime', 'dateRange']}
                    initialValue={[
                      moment().startOf('month').format('YYYY-MM-DD'),
                      moment().endOf('month').format('YYYY-MM-DD'),
                    ]}
                  />
                );
              },
            },
          },
        }}
      >
        <ProTable<IRevenueTable, Record<string, any>, 'customDataRange'>
          headerTitle="收入流水记录"
          rowKey="id"
          options={false}
          request={(params) => queryRevenueListApi({ ...params, storeId: loginUserInfo.storeId })}
          pagination={{
            pageSize: 10,
          }}
          columns={columns}
        />
      </ProProvider.Provider>
      <ViewUser
        visible={viewUserModalVisible}
        onVisibleChange={handleViewUserModalVisible}
        currentData={userData}
      />
      <ViewOrder
        visible={viewOrderModalVisible}
        onVisibleChange={handleViewOrderModalVisible}
        currentData={orderData}
      />
    </PageContainer>
  );
};

const mapStateToProps = (state: ConnectState) => ({
  loginUserInfo: state.login.loginUserInfo,
});
type StateProps = ReturnType<typeof mapStateToProps>;

export default connect(mapStateToProps)(RevenueList);
