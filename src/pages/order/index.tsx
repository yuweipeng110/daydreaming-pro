import React, { useEffect, useRef, useState } from 'react';
import { connect } from 'react-redux';
import { ConnectProps, ConnectState } from '@/models/connect';
import { Button, List, Space } from 'antd';
import { PageContainer } from '@ant-design/pro-layout';
import { ActionType } from '@ant-design/pro-table';
import ProList from '@ant-design/pro-list';
import ProCard from '@ant-design/pro-card';
import { PlusOutlined } from '@ant-design/icons';
import { IDeskTable } from '@/pages/types/desk';
import { queryOrderDeskListApi } from '@/services/desk';
import AddOrder from '@/pages/order/components/ModalForm/AddOrder';
import EditOrder from '@/pages/order/components/ModalForm/EditOrder';
import SettlementOrder from '@/pages/order/components/ModalForm/SettlementOrder';
import styles from './index.less';
import _ from 'lodash';
import moment from 'moment';

const OrderList: React.FC<ConnectProps> = (props) => {
  const actionRef = useRef<ActionType>();
  // @ts-ignore
  const { loading } = props;
  const [deskId, setDeskId] = useState<number>(0);
  const [deskOrderList, setDeskOrderList] = useState<IDeskTable[]>([]);
  const [createOrderModalVisible, handleCreateOrderModalVisible] = useState<boolean>(false);
  const [editOrderModalVisible, handleEditOrderModalVisible] = useState<boolean>(false);
  const [settlementOrderModalVisible, handleSettlementOrderModalVisible] = useState<boolean>(false);
  const [currentData, setCurrentData] = useState<IDeskTable>(Object.create(null));

  const createOrderModalStatusSwitch = (createOrderModalStatus: boolean, rowDeskId: string | undefined) => {
    handleCreateOrderModalVisible(createOrderModalStatus);
    setDeskId(Number(rowDeskId));
  };

  const editOrderModalStatusSwitch = (editOrderModalStatus: boolean, rowCurrentData: any) => {
    handleEditOrderModalVisible(editOrderModalStatus);
    setCurrentData(rowCurrentData);
  };

  const settlementOrderModalStatusSwitch = (settlementOrderModalStatus: boolean, rowCurrentData: any) => {
    handleSettlementOrderModalVisible(settlementOrderModalStatus);
    setCurrentData(rowCurrentData);
  };

  const loadOrderList = async () => {
    const res = await queryOrderDeskListApi([]);
    setDeskOrderList(res.data);
  };

  const renderOpenOrderButton = (record: any) => {
    return (
      <Space size='middle'>
        <a onClick={() => editOrderModalStatusSwitch(true, record)}>修改</a>
        <a onClick={() => settlementOrderModalStatusSwitch(true, record)}>结算</a>
      </Space>
    );
  };

  const renderTime = (record: IDeskTable) => {
    const a = moment();
    const b = moment(record.orderInfo.orderTime);
    return a.diff(b, 'hours', true).toFixed(2);
  };

  useEffect(() => {
    loadOrderList();
  }, []);

  return (
    <PageContainer>
      <div className={styles.cardList}>
        <ProList
          headerTitle='订单管理'
          actionRef={actionRef}
          rowKey='id'
          grid={{ column: 4, gutter: 24, lg: 3, md: 2, sm: 1, xs: 1 }}
          dataSource={[...deskOrderList]}
          loading={loading}
          renderItem={(item: IDeskTable) =>
            !_.isEmpty(item.orderInfo) ? (
              <List.Item key={item.id}>
                <ProCard title={item.orderInfo.scriptInfo.title} extra={renderOpenOrderButton(item)} layout='center'
                         className={styles.card}>
                  {`桌号：${item.title}`}
                  <br />
                  {`剧本名称：${item.orderInfo.scriptInfo.title}`}
                  <br />
                  {`开台时间：${item.orderInfo.orderTime}`}
                  <br />
                  {`已过时间：${renderTime(item)}（小时）`}
                  <br />
                  {`游戏人数：${item.orderInfo.detailList?.length}`}
                </ProCard>
              </List.Item>
            ) : (
              <List.Item key={item.id}>
                <Button type='dashed' className={styles.newButton}
                        onClick={() => createOrderModalStatusSwitch(true, item.id)}>
                  <PlusOutlined /> {`${item.id}-${item.title}`}
                </Button>
              </List.Item>
            )
          }
        />
      </div>
      <AddOrder actionRef={actionRef} visible={createOrderModalVisible} onVisibleChange={handleCreateOrderModalVisible}
                deskId={deskId} />
      <EditOrder actionRef={actionRef} visible={editOrderModalVisible} onVisibleChange={handleEditOrderModalVisible}
                 currentData={currentData} />
      <SettlementOrder actionRef={actionRef} visible={settlementOrderModalVisible}
                       onVisibleChange={handleSettlementOrderModalVisible} currentData={currentData} />
    </PageContainer>
  );
};

export default connect(({ loading }: ConnectState) => ({
  loading: loading.global,
}))(OrderList);
