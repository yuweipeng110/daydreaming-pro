import React, { useEffect, useRef, useState } from 'react';
import { Button, List, Space } from 'antd';
import { ActionType } from "@ant-design/pro-table";
import ProList from '@ant-design/pro-list';
import { PageContainer } from '@ant-design/pro-layout';
import ProCard from '@ant-design/pro-card';
import { PlusOutlined } from "@ant-design/icons";
import { IOrderTable } from '@/pages/types/order';
import { IDeskTable } from '@/pages/types/desk';
import { queryOrderDeskListApi } from '@/services/desk';
import AddOrder from '@/pages/order/components/ModalForm/AddOrder';
// import EditOrder from '@/pages/order/components/ModalForm/EditOrder';
import styles from './index.less';
import { connect } from 'react-redux'
import { ConnectProps, ConnectState } from "@/models/connect";


const OrderList: React.FC<ConnectProps> = (props) => {
  const actionRef = useRef<ActionType>();
  const { loading } = props;
  const [deskOrderList, setDeskOrderList] = useState<IDeskTable[]>([]);
  const [createOrderModalVisible, handleCreateOrderModalVisible] = useState<boolean>(false);
  const [editOrderModalVisible, handleEditOrderModalVisible] = useState<boolean>(false);
  const [settlementOrderModalVisible, handleSettlementOrderModalVisible] = useState<boolean>(false);
  const [currentData, setCurrentData] = useState<IOrderTable>(Object.create(null));

  const createOrderModalStatusSwitch = (createOrderModalStatus: boolean) => {
    handleCreateOrderModalVisible(createOrderModalStatus);
  };

  const editOrderModalStatusSwitch = (editOrderModalStatus: boolean, rowCurrentData: any) => {
    handleEditOrderModalVisible(editOrderModalStatus);
    setCurrentData(rowCurrentData);
  };

  const settlementOrderModalStatusSwitch = (settlementOrderModalStatus: boolean, rowCurrentData: any) => {
    handleSettlementOrderModalVisible(settlementOrderModalStatus);
    setCurrentData(rowCurrentData);
  }

  const loadOrderList = async () => {
    const res = await queryOrderDeskListApi({});
    setDeskOrderList(res.data);
  }

  const renderOpenOrderButton = (record: any) => {
    return (
      <Space size="middle">
        <a onClick={() => editOrderModalStatusSwitch(true, record)}>修改</a>
        <a onClick={() => settlementOrderModalStatusSwitch(true, record)}>结算</a>
      </Space>
    )
  }

  useEffect( () => {
     loadOrderList();
  },[]);

  return (
    <PageContainer>
      <div className={styles.cardList}>
        <ProList
          headerTitle='订单管理'
          actionRef={actionRef}
          rowKey="id"
          grid={{ column: 4, gutter: 24, lg: 3, md: 2, sm: 1, xs: 1 }}
          dataSource={[...deskOrderList]}
          loading={loading}
          renderItem={(item: IDeskTable) =>
            !_.isEmpty(item.orderInfo) ? (
                <List.Item key={item.id}>
                  <ProCard title={item.orderInfo.scriptInfo.title} extra={renderOpenOrderButton(item)} layout="center" className={styles.card} >
                    { `桌号：${item.title}` }
                    <br />
                    { `剧本名称：${item.orderInfo.scriptInfo.title}` }
                    <br />
                    { `开始时间：${item.orderInfo.orderTime}` }
                  </ProCard>
                </List.Item>
            ) : (
              <List.Item key={item.id}>
                <Button type="dashed" className={styles.newButton} onClick={() => createOrderModalStatusSwitch(true)}>
                  <PlusOutlined /> { `${item.id}-${item.title}` }
                </Button>
              </List.Item>
            )
          }
        />
      </div>
      <AddOrder actionRef={actionRef} visible={createOrderModalVisible} onVisibleChange={handleCreateOrderModalVisible} />
      {/*<EditOrder actionRef={actionRef} visible={editOrderModalVisible} onVisibleChange={handleEditOrderModalVisible} currentData={currentData} />*/}
    </PageContainer>
  );
};

// export default OrderList;

export default connect(({ loading }: ConnectState) => ({
  loading: loading.global,
}))(OrderList);
