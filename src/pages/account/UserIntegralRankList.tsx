import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { ConnectState } from '@/models/connect';
import ProTable, { ProColumns } from '@ant-design/pro-table';
import { IUserTable } from '@/pages/types/user';
import { queryUserIntegralRankListApi } from '@/services/account';
import { ScriptPlayerRoleEnum, UserSexEnum } from '@/pages/constants';
import { PageContainer } from '@ant-design/pro-layout';

export type TProps = {
  loginUserInfo: IUserTable;
};

const UserIntegralRankList: React.FC<TProps> = (props) => {
  const { loginUserInfo } = props;
  const defaultRoleColumns: ProColumns<IUserTable>[] = [
    {
      title: 'totalRanking',
      dataIndex: 'totalRanking',
      search: false,
    },
    {
      title: 'totalIntegral',
      dataIndex: 'totalIntegral',
      search: false,
    },
    {
      title: 'totalTitle',
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
            title: 'killerRanking',
            dataIndex: 'killerRanking',
            search: false,
          },
          {
            title: 'killerIntegral',
            dataIndex: 'killerIntegral',
            search: false,
          },
          {
            title: 'killerTitle',
            dataIndex: 'killerTitle',
            search: false,
          },
        ];
        break;
      case 3:
        currentRoleColumns = [
          {
            title: 'detectiveRanking',
            dataIndex: 'detectiveRanking',
            search: false,
          },
          {
            title: 'detectiveIntegral',
            dataIndex: 'detectiveIntegral',
            search: false,
          },
          {
            title: 'detectiveTitle',
            dataIndex: 'detectiveTitle',
            search: false,
          },
        ];
        break;
      case 4:
        currentRoleColumns = [
          {
            title: 'peopleRanking',
            dataIndex: 'peopleRanking',
            search: false,
          },
          {
            title: 'peopleIntegral',
            dataIndex: 'peopleIntegral',
            search: false,
          },
          {
            title: 'peopleTitle',
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
      title: 'roleId',
      dataIndex: 'roleId',
      valueEnum: ScriptPlayerRoleEnum,
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
