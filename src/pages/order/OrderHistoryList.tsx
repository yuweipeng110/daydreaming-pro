import React, { useContext } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import ProTable, { ProColumns } from '@ant-design/pro-table';
import ProProvider from '@ant-design/pro-provider';
import { ProFormDateRangePicker } from '@ant-design/pro-form';
import { IOrderTable } from '@/pages/types/order';
import { queryOrderListApi } from '@/services/order';
import moment from 'moment';

const OrderStatusEnum = {
  0: { text: '全部', status: 'Default' },
  10: { text: '进行中', status: 'Processing' },
  20: { text: '完成', status: 'Success' },
};

const OrderHistoryList: React.FC = () => {
  const values = useContext(ProProvider);

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
  ];

  return (
    <PageContainer>
      <ProProvider.Provider
        value={{
          ...values,
          valueTypeMap: {
            customDataRange: {
              render: (text) => <a>{text}</a>,
              renderFormItem: (text, props) => {
                return (
                  <ProFormDateRangePicker
                    {...props?.fieldProps}
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
          // search={false}
          options={false}
          request={(params) => queryOrderListApi({ ...params })}
          pagination={{
            pageSize: 10,
          }}
          columns={columns}
        ></ProTable>
      </ProProvider.Provider>
    </PageContainer>
  );
};

export default OrderHistoryList;
