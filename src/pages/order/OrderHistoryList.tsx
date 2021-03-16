import React, { useContext, useState } from 'react';
import { connect } from 'react-redux';
import { ConnectProps, ConnectState } from '@/models/connect';
import { PageContainer } from '@ant-design/pro-layout';
import ProTable, { ProColumns } from '@ant-design/pro-table';
import ProProvider from '@ant-design/pro-provider';
import { ProFormDateRangePicker } from '@ant-design/pro-form';
import { IOrderTable } from '@/pages/types/order';
import { queryOrderListApi } from '@/services/order';
import { OrderStatusEnum } from '@/pages/constants';
import ViewOrder from '@/pages/order/components/Modal/ViewOrder';
import moment from 'moment';

const OrderHistoryList: React.FC<ConnectProps & StateProps> = (props) => {
  const { loginUserInfo } = props;
  const values = useContext(ProProvider);
  const [viewOrderModalVisible, handleViewOrderModalVisible] = useState<boolean>(false);
  const [currentData, setCurrentData] = useState<IOrderTable>(Object.create(null));

  const viewOrderModalStatusSwitch = (editOrderModalStatus: boolean, rowCurrentData: any) => {
    handleViewOrderModalVisible(editOrderModalStatus);
    setCurrentData(rowCurrentData);
  };

  const columns: ProColumns<IOrderTable, 'customDataRange'>[] = [
    {
      title: '订单号',
      search: false,
      dataIndex: 'orderNo',
    },
    {
      title: '桌号',
      search: false,
      dataIndex: ['deskInfo', 'title'],
    },
    {
      title: '剧本名称',
      search: false,
      dataIndex: ['scriptInfo', 'title'],
    },
    {
      title: '主持人',
      search: false,
      dataIndex: ['hostInfo', 'nickname'],
    },
    {
      title: '应收金额',
      dataIndex: 'receivableMoney',
      valueType: 'money',
      search: false,
      align: 'right',
    },
    {
      title: '实收金额',
      dataIndex: 'realMoney',
      valueType: 'money',
      search: false,
      align: 'right',
    },
    {
      title: '状态',
      dataIndex: 'status',
      valueType: 'radio',
      initialValue: '0',
      valueEnum: OrderStatusEnum,
      align: 'center',
    },
    {
      title: '下单时间',
      key: 'dateRange',
      dataIndex: 'orderTime',
      valueType: 'customDataRange',
      align: 'center',
    },
    {
      title: '结算时间',
      dataIndex: 'settlementTime',
      valueType: 'dateTime',
      search: false,
      align: 'center',
    },
    {
      title: '备注',
      dataIndex: 'remark',
      search: false,
    },
    {
      title: '操作',
      key: 'action',
      search: false,
      render: (record: any) => <a onClick={() => viewOrderModalStatusSwitch(true, record)}>查看</a>,
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
                    name={['orderTime', 'dateRange']}
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
        <ProTable<IOrderTable, Record<string, any>, 'customDataRange'>
          headerTitle="订单历史记录"
          rowKey="id"
          options={false}
          request={(params) => queryOrderListApi({ ...params, storeId: loginUserInfo.storeId })}
          pagination={{
            pageSize: 10,
          }}
          columns={columns}
        />
      </ProProvider.Provider>
      <ViewOrder
        visible={viewOrderModalVisible}
        onVisibleChange={handleViewOrderModalVisible}
        currentData={currentData}
      />
    </PageContainer>
  );
};

const mapStateToProps = (state: ConnectState) => ({
  loginUserInfo: state.login.loginUserInfo,
});
type StateProps = ReturnType<typeof mapStateToProps>;

export default connect(mapStateToProps)(OrderHistoryList);
