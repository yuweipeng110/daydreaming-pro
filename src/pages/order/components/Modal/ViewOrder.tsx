import { Modal, Tabs } from 'antd';
import type { IOrderTable } from '@/pages/types/order';
import type { ProDescriptionsItemProps } from '@ant-design/pro-descriptions';
import ProDescriptions from '@ant-design/pro-descriptions';
import ProTable, { ProColumns } from '@ant-design/pro-table';
import { IOrderDetailTable } from '@/pages/types/orderDetail';
import { OrderStatusEnum, SettlementMethodEnum, UserSexEnum } from '@/pages/constants';

const { TabPane } = Tabs;

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
      title: '折扣(%)',
      dataIndex: 'discountPercentage',
      valueType: 'percent',
    },
    {
      title: '结算方式',
      dataIndex: 'paymentMethod',
      valueEnum: SettlementMethodEnum,
    },
    {
      title: '结算金额',
      dataIndex: 'settlementPrice',
      valueType: 'money',
      align: 'right',
    },
  ];

  const columns: ProDescriptionsItemProps<IOrderTable>[] = [
    {
      title: '订单号',
      dataIndex: 'orderNo',
    },
    {
      title: '剧本名称',
      dataIndex: ['scriptInfo', 'title'],
    },
    {
      title: '桌号',
      dataIndex: ['deskInfo', 'title'],
    },
    {
      title: '主持人',
      dataIndex: 'host',
      render: (value, record) => {
        return `${record.hostInfo?.phone}-${record.hostInfo?.nickname}`;
      },
    },
    {
      title: '应收金额',
      dataIndex: 'receivableMoney',
      valueType: 'money',
    },
    {
      title: '实收金额',
      dataIndex: 'realMoney',
      valueType: 'money',
    },
    {
      title: '下单时间',
      dataIndex: 'orderTime',
      valueType: 'dateTime',
    },
    {
      title: '结算时间',
      dataIndex: 'settlementTime',
      valueType: 'dateTime',
      render: (value, record) => {
        return record.settlementTime === '0000-00-00 00:00:00' ? '-' : value;
      }
    },
    {
      title: '状态',
      dataIndex: 'status',
      valueEnum: OrderStatusEnum,
    },
    {
      title: '备注',
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
      <ProDescriptions column={2} title="订单基本信息" dataSource={currentData} columns={columns} />
      <Tabs defaultActiveKey="1" type="card">
        <TabPane tab="订单明细" key="1">
          <ProTable<IOrderDetailTable>
            headerTitle="订单明细列表"
            rowKey="id"
            search={false}
            options={false}
            dataSource={currentData.detailList}
            pagination={false}
            columns={orderDetailColumns}
          />
        </TabPane>
      </Tabs>
    </Modal>
  );
};
