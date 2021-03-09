import React, { useContext } from 'react';
import { connect } from 'react-redux';
import { ConnectProps, ConnectState } from '@/models/connect';
import { PageContainer } from '@ant-design/pro-layout';
import ProTable, { ProColumns } from '@ant-design/pro-table';
import ProProvider from '@ant-design/pro-provider';
import { ProFormDateRangePicker } from '@ant-design/pro-form';
import { queryRevenueListApi } from '@/services/revenue';
import { IRevenueTable } from '@/pages/types/revenue';
import { PaymentMethodEnum } from '@/pages/constants';
import moment from 'moment';

const RevenueList: React.FC<ConnectProps & StateProps> = (props) => {
  const { loginUserInfo } = props;
  const values = useContext(ProProvider);

  const columns: ProColumns<IRevenueTable, 'customDataRange'>[] = [
    {
      title: '用户',
      search: false,
      dataIndex: 'user',
      render: (text: any, record: any) => {
        const userText = record.userInfo
          ? `${record.userInfo.phone}-${record.userInfo.nickname}`
          : '';
        return userText;
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
        return orderText;
      },
    },
    {
      title: '结算方式',
      dataIndex: 'paymentMethodId',
      valueEnum: PaymentMethodEnum,
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
        ></ProTable>
      </ProProvider.Provider>
    </PageContainer>
  );
};

const mapStateToProps = (state: ConnectState) => ({
  loginUserInfo: state.login.loginUserInfo,
});
type StateProps = ReturnType<typeof mapStateToProps>;

export default connect(mapStateToProps)(RevenueList);
