import { Modal } from 'antd';
import ProDescriptions, { ProDescriptionsItemProps } from '@ant-design/pro-descriptions';
import { IUserTable } from '@/pages/types/user';
import { UserRoleEnum, UserSexEnum } from '@/pages/constants';

export type ViewUserProps = {
  visible: boolean;
  onVisibleChange: (visible: boolean) => void;
  currentData: IUserTable;
};

export default (props: ViewUserProps) => {
  const { visible, onVisibleChange, currentData } = props;

  const columns: ProDescriptionsItemProps<IUserTable>[] = [
    {
      title: 'role',
      dataIndex: 'role',
      valueEnum: UserRoleEnum,
    },
    {
      title: 'nickname',
      dataIndex: 'nickname',
    },
    {
      title: 'sex',
      dataIndex: 'sex',
      valueEnum: UserSexEnum,
    },
    {
      title: 'phone',
      dataIndex: 'phone',
    },
    {
      title: 'birthday',
      dataIndex: 'birthday',
      valueType: 'date',
    },
    {
      title: 'otime',
      dataIndex: 'otime',
      valueType: 'dateTime',
    },
    {
      title: 'killerRanking',
      dataIndex: 'killerRanking',
    },
    {
      title: 'killerIntegral',
      dataIndex: 'killerIntegral',
    },
    {
      title: 'killerTitle',
      dataIndex: 'killerTitle',
    },
    {
      title: 'detectiveRanking',
      dataIndex: 'detectiveRanking',
    },
    {
      title: 'detectiveIntegral',
      dataIndex: 'detectiveIntegral',
    },
    {
      title: 'detectiveTitle',
      dataIndex: 'detectiveTitle',
    },
    {
      title: 'peopleRanking',
      dataIndex: 'peopleRanking',
    },
    {
      title: 'peopleIntegral',
      dataIndex: 'peopleIntegral',
    },
    {
      title: 'peopleTitle',
      dataIndex: 'peopleTitle',
    },
    {
      title: 'totalRanking',
      dataIndex: 'totalRanking',
    },
    {
      title: 'totalIntegral',
      dataIndex: 'totalIntegral',
    },
    {
      title: 'totalTitle',
      dataIndex: 'totalTitle',
    },
    {
      title: 'accountBalance',
      dataIndex: 'accountBalance',
      valueType: 'money',
    },
    {
      title: 'voucherBalance',
      dataIndex: 'voucherBalance',
      valueType: 'money',
    },
    {
      title: 'activeIntegral',
      dataIndex: 'activeIntegral',
    },
    {
      title: 'remark',
      dataIndex: 'remark',
      span: 3,
    },
  ];

  return (
    <Modal
      title="user-info-view"
      visible={visible}
      width="70%"
      centered={true}
      onCancel={() => {
        onVisibleChange(false);
      }}
      footer={false}
    >
      <ProDescriptions column={3} title="view-user" dataSource={currentData} columns={columns} />
    </Modal>
  );
};
