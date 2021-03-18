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
      title: '角色',
      dataIndex: 'role',
      valueEnum: UserRoleEnum,
    },
    {
      title: '昵称',
      dataIndex: 'nickname',
    },
    {
      title: '性别',
      dataIndex: 'sex',
      valueEnum: UserSexEnum,
    },
    {
      title: '电话',
      dataIndex: 'phone',
    },
    {
      title: '生日',
      dataIndex: 'birthday',
      valueType: 'date',
    },
    {
      title: '创建时间',
      dataIndex: 'otime',
      valueType: 'dateTime',
    },
    {
      title: '杀手排行',
      dataIndex: 'killerRanking',
    },
    {
      title: '杀手积分',
      dataIndex: 'killerIntegral',
    },
    {
      title: '杀手称号',
      dataIndex: 'killerTitle',
    },
    {
      title: '侦探排行',
      dataIndex: 'detectiveRanking',
    },
    {
      title: '侦探积分',
      dataIndex: 'detectiveIntegral',
    },
    {
      title: '侦探称号',
      dataIndex: 'detectiveTitle',
    },
    {
      title: '路人排行',
      dataIndex: 'peopleRanking',
    },
    {
      title: '路人积分',
      dataIndex: 'peopleIntegral',
    },
    {
      title: '路人称号',
      dataIndex: 'peopleTitle',
    },
    {
      title: '总榜排行',
      dataIndex: 'totalRanking',
    },
    {
      title: '总积分',
      dataIndex: 'totalIntegral',
    },
    {
      title: '总榜称号',
      dataIndex: 'totalTitle',
    },
    {
      title: '账户余额',
      dataIndex: 'accountBalance',
      valueType: 'money',
    },
    {
      title: '代金劵余额',
      dataIndex: 'voucherBalance',
      valueType: 'money',
    },
    {
      title: '可用积分',
      dataIndex: 'activeIntegral',
    },
    {
      title: '备注',
      dataIndex: 'remark',
      span: 3,
    },
  ];

  return (
    <Modal
      title="用户信息"
      visible={visible}
      width="70%"
      centered={true}
      onCancel={() => {
        onVisibleChange(false);
      }}
      footer={false}
    >
      <ProDescriptions column={3} title="用户基本信息" dataSource={currentData} columns={columns} />
    </Modal>
  );
};
