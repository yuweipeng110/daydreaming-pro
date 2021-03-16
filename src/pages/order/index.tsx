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

const OrderList: React.FC<ConnectProps & StateProps> = (props) => {
  const { loading, loginUserInfo } = props;
  const actionRef = useRef<ActionType>();
  const [deskId, setDeskId] = useState<number>(0);
  const [deskOrderList, setDeskOrderList] = useState<IDeskTable[]>([]);
  const [createOrderModalVisible, handleCreateOrderModalVisible] = useState<boolean>(false);
  const [editOrderModalVisible, handleEditOrderModalVisible] = useState<boolean>(false);
  const [settlementOrderModalVisible, handleSettlementOrderModalVisible] = useState<boolean>(false);
  const [currentData, setCurrentData] = useState<IDeskTable>(Object.create(null));

  const createOrderModalStatusSwitch = (createOrderModalStatus: boolean, rowDeskId: number) => {
    handleCreateOrderModalVisible(createOrderModalStatus);
    setDeskId(rowDeskId);
  };

  const editOrderModalStatusSwitch = (editOrderModalStatus: boolean, rowCurrentData: any) => {
    handleEditOrderModalVisible(editOrderModalStatus);
    setCurrentData(rowCurrentData);
  };

  const settlementOrderModalStatusSwitch = (
    settlementOrderModalStatus: boolean,
    rowCurrentData: any,
  ) => {
    handleSettlementOrderModalVisible(settlementOrderModalStatus);
    setCurrentData(rowCurrentData);
  };

  const loadOrderList = async () => {
    const params = {
      storeId: loginUserInfo.storeId,
    };
    const res = await queryOrderDeskListApi(params);
    setDeskOrderList(res.data);
  };

  const renderOpenOrderButton = (record: any) => {
    return (
      <Space size="middle">
        <a onClick={() => editOrderModalStatusSwitch(true, record)}>修改</a>
        <a onClick={() => settlementOrderModalStatusSwitch(true, record)}>结算</a>
      </Space>
    );
  };

  const renderTime = (record: IDeskTable) => {
    const currentTimeMoment = moment();
    const orderTimeMoment = moment(record.orderInfo.orderTime);
    return currentTimeMoment.diff(orderTimeMoment, 'hours', true).toFixed(2);
  };

  useEffect(() => {
    loadOrderList();
  }, []);

  return (
    <PageContainer>
      <div className={styles.cardList}>
        <ProList
          headerTitle="订单管理"
          actionRef={actionRef}
          rowKey="id"
          grid={{ column: 4, gutter: 24, lg: 3, md: 2, sm: 1, xs: 1 }}
          dataSource={[...deskOrderList]}
          loading={loading}
          renderItem={(item: IDeskTable) =>
            !_.isEmpty(item.orderInfo) ? (
              <List.Item key={item.id}>
                <ProCard
                  title={item.orderInfo.scriptInfo.title}
                  extra={renderOpenOrderButton(item)}
                  layout="center"
                  className={styles.card}
                >
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
                <Button
                  type="dashed"
                  className={styles.newButton}
                  onClick={() => createOrderModalStatusSwitch(true, item.id)}
                >
                  <PlusOutlined /> {`${item.id}-${item.title}`}
                </Button>
              </List.Item>
            )
          }
        />
      </div>
      <AddOrder
        actionRef={loadOrderList}
        visible={createOrderModalVisible}
        onVisibleChange={handleCreateOrderModalVisible}
        deskId={deskId}
      />
      <EditOrder
        actionRef={loadOrderList}
        visible={editOrderModalVisible}
        onVisibleChange={handleEditOrderModalVisible}
        currentData={currentData}
      />
      <SettlementOrder
        actionRef={loadOrderList}
        visible={settlementOrderModalVisible}
        onVisibleChange={handleSettlementOrderModalVisible}
        currentData={currentData}
      />
    </PageContainer>
  );
};

const mapStateToProps = (state: ConnectState) => ({
  loading: state.loading.global,
  loginUserInfo: state.login.loginUserInfo,
});
type StateProps = ReturnType<typeof mapStateToProps>;

export default connect(mapStateToProps)(OrderList);
