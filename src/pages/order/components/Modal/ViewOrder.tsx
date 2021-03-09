import { Modal } from 'antd';
import type { IOrderTable } from '@/pages/types/order';
import type { ProDescriptionsItemProps } from '@ant-design/pro-descriptions';
import ProDescriptions from '@ant-design/pro-descriptions';
import ProTable, { ProColumns } from '@ant-design/pro-table';
import { IOrderDetailTable } from '@/pages/types/orderDetail';
import { OrderStatusEnum, UserSexEnum } from '@/pages/constants';
import React from 'react';

export type OrderDetailViewProps = {
  visible: boolean;
  onVisibleChange: (visible: boolean) => void;
  currentData: IOrderTable;
};

export default (props: OrderDetailViewProps) => {
  const { visible, onVisibleChange, currentData } = props;

  const orderDetailColumns: ProColumns<IOrderDetailTable>[] = [
    {
      title: ' 昵称',
      dataIndex: ['userInfo', 'nickname'],
    },
    {
      title: '性别',
      dataIndex: ['userInfo', 'sex'],
      valueEnum: UserSexEnum,
    },
    {
      title: ' 手机号',
      dataIndex: ['userInfo', 'phone'],
    },
    {
      title: '生日',
      dataIndex: ['userInfo', 'birthday'],
    },
    {
      title: 'discountPercentage',
      dataIndex: 'discountPercentage',
      render: (value) => <>{value}%</>,
    },
    {
      title: 'paymentMethod',
      dataIndex: 'paymentMethod',
    },
    {
      title: 'settlementPrice',
      dataIndex: 'settlementPrice',
      valueType: 'money',
      align: 'right',
    },
  ];

  const columns: ProDescriptionsItemProps<IOrderTable>[] = [
    {
      title: 'orderNo',
      dataIndex: 'orderNo',
    },
    {
      title: 'scriptTitle',
      dataIndex: ['scriptInfo', 'title'],
    },
    {
      title: 'deskTitle',
      dataIndex: ['deskInfo', 'title'],
    },
    {
      title: 'host',
      dataIndex: 'host',
      render: (dom, entity) => {
        return `${entity.hostInfo.phone}-${entity.hostInfo.nickname}`;
      },
    },
    {
      title: 'receivableMoney',
      dataIndex: 'receivableMoney',
      valueType: 'money',
    },
    {
      title: 'realMoney',
      dataIndex: 'realMoney',
      valueType: 'money',
    },
    {
      title: 'orderTime',
      dataIndex: 'orderTime',
      valueType: 'dateTime',
    },
    {
      title: 'settlementTime',
      dataIndex: 'settlementTime',
      valueType: 'dateTime',
    },
    {
      title: 'status',
      dataIndex: 'status',
      valueEnum: OrderStatusEnum,
    },
    {
      title: 'remark',
      dataIndex: 'remark',
    },
  ];

  return (
    <Modal
      title={false}
      visible={visible}
      width="70%"
      centered={true}
      onCancel={() => {
        onVisibleChange(false);
      }}
      footer={false}
    >
      <ProDescriptions column={2} title="view-order" dataSource={currentData} columns={columns} />
      <ProTable<IOrderDetailTable>
        headerTitle="detailList"
        rowKey="id"
        search={false}
        options={false}
        dataSource={currentData.detailList}
        pagination={false}
        columns={orderDetailColumns}
      />
    </Modal>
  );
};
