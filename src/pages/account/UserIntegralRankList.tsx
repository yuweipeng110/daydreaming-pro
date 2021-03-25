import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { ConnectState } from '@/models/connect';
import ProTable, { ProColumns } from '@ant-design/pro-table';
import { IUserTable } from '@/pages/types/user';
import { queryUserIntegralRankListApi } from '@/services/account';
import { StoreRoleEnum, UserSexEnum } from '@/pages/constants';
import { PageContainer } from '@ant-design/pro-layout';

export type TProps = {
  loginUserInfo: IUserTable;
};

const UserIntegralRankList: React.FC<TProps> = (props) => {
  const { loginUserInfo } = props;
  const defaultRoleColumns: ProColumns<IUserTable>[] = [
    {
      title: '排行',
      dataIndex: 'totalRanking',
      search: false,
    },
    {
      title: '积分',
      dataIndex: 'totalIntegral',
      search: false,
    },
    {
      title: '称号',
      dataIndex: 'totalTitle',
      search: false,
    },
  ];
  const [scriptPlayerRoleId, setScriptPlayerRoleId] = useState<number>(1);
  const [roleColumns, setRoleColumns] = useState<ProColumns<IUserTable>[]>(defaultRoleColumns);
  const [rankingColumns, integralColumns, titleColumns] = roleColumns;

  const setCurrentRoleColumns = () => {
    let currentRoleColumns: ProColumns<IUserTable>[] = [];
    switch (scriptPlayerRoleId) {
      case 2:
        currentRoleColumns = [
          {
            title: '排行',
            dataIndex: 'killerRanking',
            search: false,
          },
          {
            title: '积分',
            dataIndex: 'killerIntegral',
            search: false,
          },
          {
            title: '称号',
            dataIndex: 'killerTitle',
            search: false,
          },
        ];
        break;
      case 3:
        currentRoleColumns = [
          {
            title: '排行',
            dataIndex: 'detectiveRanking',
            search: false,
          },
          {
            title: '积分',
            dataIndex: 'detectiveIntegral',
            search: false,
          },
          {
            title: '称号',
            dataIndex: 'detectiveTitle',
            search: false,
          },
        ];
        break;
      case 4:
        currentRoleColumns = [
          {
            title: '排行',
            dataIndex: 'peopleRanking',
            search: false,
          },
          {
            title: '积分',
            dataIndex: 'peopleIntegral',
            search: false,
          },
          {
            title: '称号',
            dataIndex: 'peopleTitle',
            search: false,
          },
        ];
        break;
      default:
        currentRoleColumns = defaultRoleColumns;
        break;
    }
    setRoleColumns(currentRoleColumns);
  };

  useEffect(() => {
    setCurrentRoleColumns();
  }, [scriptPlayerRoleId]);

  const handleRequest = (params: any) => {
    setScriptPlayerRoleId(Number(params.roleId));
    return queryUserIntegralRankListApi({ ...params, storeId: loginUserInfo.storeId });
  };

  const columns: ProColumns<IUserTable>[] = [
    {
      title: ' 昵称',
      dataIndex: 'nickname',
    },
    {
      title: '性别',
      dataIndex: 'sex',
      valueEnum: UserSexEnum,
      search: false,
    },
    {
      title: ' 手机号',
      dataIndex: 'phone',
      search: false,
    },
    {
      title: '游戏角色',
      dataIndex: 'roleId',
      valueEnum: StoreRoleEnum,
      valueType: 'radio',
      initialValue: '1',
      hideInTable: true,
    },
    rankingColumns,
    integralColumns,
    titleColumns,
  ];

  return (
    <PageContainer>
      <ProTable<IUserTable>
        headerTitle="用户积分排名"
        rowKey="id"
        options={false}
        search={{
          labelWidth: 'auto',
        }}
        request={handleRequest}
        pagination={{
          pageSize: 10,
        }}
        columns={columns}
      />
    </PageContainer>
  );
};

export default connect((state: ConnectState) => ({
  loginUserInfo: state.login.loginUserInfo,
}))(UserIntegralRankList);
