import { Modal } from 'antd';
import type { IOrderTable } from '@/pages/types/order';
import type { ProDescriptionsItemProps } from '@ant-design/pro-descriptions';
import ProDescriptions from '@ant-design/pro-descriptions';
import ProTable, { ProColumns } from '@ant-design/pro-table';
import { IOrderDetailTable } from '@/pages/types/orderDetail';
import { UserSexEnum } from '@/pages/constants';

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
      title: '备注',
      dataIndex: ['userInfo', 'remark'],
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
    },
    {
      title: 'remark',
      dataIndex: 'remark',
    },
    {
      title: 'detailList',
      dataIndex: 'detailList',
      render: () => {
        return (
          <ProTable<IOrderDetailTable>
            headerTitle="detailList"
            rowKey="id"
            search={false}
            options={false}
            dataSource={currentData.detailList}
            columns={orderDetailColumns}
          />
        );
      },
    },
  ];

  return (
    <Modal
      title="order-detail-view"
      visible={visible}
      width="70%"
      centered={true}
      onCancel={() => {
        onVisibleChange(false);
      }}
      footer={false}
    >
      <ProDescriptions column={2} title="view-order" dataSource={currentData} columns={columns} />
    </Modal>
  );
};
