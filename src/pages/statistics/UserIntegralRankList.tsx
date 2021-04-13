import React, { useEffect, useState } from 'react';
import { Carousel } from 'antd';
import ProTable, { ProColumns } from '@ant-design/pro-table';
import { IUserTable } from '@/pages/types/user';
import { STATUS_CODE, UserSexEnum } from '@/pages/constants';
import { queryUserIntegralRankStatisticsListApi } from '@/services/statistics';
import ViewUser from '@/pages/user/components/Modal/ViewUser';
import './index.less';

export default () => {
  const [userRankListTotal, setUserRankListTotal] = useState<IUserTable[]>([]);
  const [userRankListKiller, setUserRankListKiller] = useState<IUserTable[]>([]);
  const [userRankListDetective, setUserRankListDetective] = useState<IUserTable[]>([]);
  const [userRankListPeople, setUserRankListPeople] = useState<IUserTable[]>([]);
  const [viewUserModalVisible, handleViewUserModalVisible] = useState<boolean>(false);
  const [userData, setUserData] = useState<IUserTable>(Object.create(null));

  const viewUserModalStatusSwitch = (viewUserModalStatus: boolean, rowCurrentData: IUserTable) => {
    handleViewUserModalVisible(viewUserModalStatus);
    setUserData(rowCurrentData);
  };

  const baseColumnsList: ProColumns<IUserTable>[] = [
    {
      title: ' 昵称',
      dataIndex: ['userInfo', 'nickname'],
      render: (value, record: any) => {
        return <a onClick={() => viewUserModalStatusSwitch(true, record.userInfo)}>{record.userInfo.nickname}</a>;
      },
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
  ];
  const totalColumnsList: ProColumns<IUserTable>[] = [
    {
      title: '排行',
      dataIndex: ['userInfo', 'totalRanking'],
    },
    {
      title: '积分',
      dataIndex: ['userInfo', 'totalIntegral'],
    },
    {
      title: '称号',
      dataIndex: ['userInfo', 'totalTitle'],
    },
  ];
  const killerColumnsList: ProColumns<IUserTable>[] = [
    {
      title: '排行',
      dataIndex: ['userInfo', 'killerRanking'],
    },
    {
      title: '积分',
      dataIndex: ['userInfo', 'killerIntegral'],
    },
    {
      title: '称号',
      dataIndex: ['userInfo', 'killerTitle'],
    },
  ];
  const detectiveColumnsList: ProColumns<IUserTable>[] = [
    {
      title: '排行',
      dataIndex: ['userInfo', 'detectiveRanking'],
    },
    {
      title: '积分',
      dataIndex: ['userInfo', 'detectiveIntegral'],
    },
    {
      title: '称号',
      dataIndex: ['userInfo', 'detectiveTitle'],
    },
  ];
  const peopleColumnsList: ProColumns<IUserTable>[] = [
    {
      title: '排行',
      dataIndex: ['userInfo', 'peopleRanking'],
    },
    {
      title: '积分',
      dataIndex: ['userInfo', 'peopleIntegral'],
    },
    {
      title: '称号',
      dataIndex: ['userInfo', 'peopleTitle'],
    },
  ];

  const loadRankData = async () => {
    const params = {};
    const res = await queryUserIntegralRankStatisticsListApi(params);
    if (res.code === STATUS_CODE.SUCCESS) {
      // setPromotionsList(res.data);
      const userRankList = res.data;
      setUserRankListTotal(userRankList[0] as IUserTable[]);
      setUserRankListKiller(userRankList[1] as IUserTable[]);
      setUserRankListDetective(userRankList[2] as IUserTable[]);
      setUserRankListPeople(userRankList[3] as IUserTable[]);
    }
  };

  useEffect(() => {
    loadRankData();
  }, []);

  const totalColumns: ProColumns<IUserTable>[] = [
    ...baseColumnsList,
    ...totalColumnsList,
  ];

  const killerColumns: ProColumns<IUserTable>[] = [
    ...baseColumnsList,
    ...killerColumnsList,
  ];

  const detectiveColumns: ProColumns<IUserTable>[] = [
    ...baseColumnsList,
    ...detectiveColumnsList,
  ];

  const peopleColumns: ProColumns<IUserTable>[] = [
    ...baseColumnsList,
    ...peopleColumnsList,
  ];

  return (
    <>
      <Carousel>
        <div className='carousel-content'>
          <ProTable<IUserTable>
            headerTitle='总榜'
            rowKey='id'
            search={false}
            options={false}
            dataSource={userRankListTotal}
            pagination={false}
            columns={totalColumns}
            size='large'
          />
        </div>
        <div className='carousel-content'>
          <ProTable<IUserTable>
            headerTitle='杀手榜'
            rowKey='id'
            search={false}
            options={false}
            dataSource={userRankListKiller}
            pagination={false}
            columns={killerColumns}
            size='large'
          />
        </div>
        <div className='carousel-content'>
          <ProTable<IUserTable>
            headerTitle='侦探榜'
            rowKey='id'
            search={false}
            options={false}
            dataSource={userRankListDetective}
            pagination={false}
            columns={detectiveColumns}
            size='large'
          />
        </div>
        <div className='carousel-content'>
          <ProTable<IUserTable>
            headerTitle='路人榜'
            rowKey='id'
            search={false}
            options={false}
            dataSource={userRankListPeople}
            pagination={false}
            columns={peopleColumns}
            size='large'
          />
        </div>
      </Carousel>
      <ViewUser
        visible={viewUserModalVisible}
        onVisibleChange={handleViewUserModalVisible}
        currentData={userData}
      />
    </>
  );
}
