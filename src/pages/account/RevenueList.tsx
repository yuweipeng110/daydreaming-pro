import React, { useContext, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { ConnectProps, ConnectState } from '@/models/connect';
import { useRequest } from 'umi';
import { Empty, Spin } from 'antd';
import { PageContainer } from '@ant-design/pro-layout';
import ProTable, { ProColumns } from '@ant-design/pro-table';
import ProProvider from '@ant-design/pro-provider';
import { ProFormDateRangePicker, ProFormSelect } from '@ant-design/pro-form';
import { queryRevenueListApi } from '@/services/revenue';
import { IRevenueTable } from '@/pages/types/revenue';
import { SettlementMethodEnum, STATUS_CODE } from '@/pages/constants';
import { IUserTable } from '@/pages/types/user';
import ViewUser from '@/pages/user/components/Modal/ViewUser';
import { IOrderTable } from '@/pages/types/order';
import moment from 'moment';
import ViewOrder from '@/pages/order/components/Modal/ViewOrder';
import { queryUserListApi } from '@/services/user';
import _ from 'lodash';

interface IOption {
  value: number;
  label: string;
}

export type TProps = {
  loginUserInfo: IUserTable;
} & ConnectProps;

const RevenueList: React.FC<TProps> = (props) => {
  const { loginUserInfo } = props;
  const values = useContext(ProProvider);
  const [viewUserModalVisible, handleViewUserModalVisible] = useState<boolean>(false);
  const [userData, setUserData] = useState<IUserTable>(Object.create(null));
  const [viewOrderModalVisible, handleViewOrderModalVisible] = useState<boolean>(false);
  const [orderData, setOrderData] = useState<IOrderTable>(Object.create(null));
  const [hostOptions, setHostOptions] = useState<IOption[]>([]);

  const viewUserModalStatusSwitch = (viewUserModalStatus: boolean, rowCurrentData: IUserTable) => {
    handleViewUserModalVisible(viewUserModalStatus);
    setUserData(rowCurrentData);
  };

  const viewOrderModalStatusSwitch = (
    viewOrderModalStatus: boolean,
    rowCurrentData: IOrderTable,
  ) => {
    handleViewOrderModalVisible(viewOrderModalStatus);
    setOrderData(rowCurrentData);
  };

  const loadHostListData = async () => {
    const params = {
      pageSize: 10,
      storeId: loginUserInfo.storeId,
      isHost: true,
    }
    const res = await queryUserListApi(params);
    if (res.code === STATUS_CODE.SUCCESS) {
      const options = res.data.map((item: IUserTable) => {
        return {
          value: item.id,
          label: `${item.phone}-${item.nickname}`,
        };
      });
      setHostOptions(options);
    }
  };

  useEffect(() => {
      loadHostListData();
  }, []);

  const { loading: hostLoading, run: hostRun, cancel: hostCancel } = useRequest(queryUserListApi, {
    debounceInterval: 800,
    manual: true,
    formatResult: (res) => {
      if (res.code === STATUS_CODE.SUCCESS) {
        const options = res.data.map((item: IUserTable) => {
          return {
            value: item.id,
            label: `${item.phone}-${item.nickname}`,
          };
        });
        setHostOptions(options);
      }
    },
  });

  const handleSearchHost = (value: string) => {
    if (_.isEmpty(value)) return;
    setHostOptions([]);
    hostRun({
      pageSize: 10,
      storeId: loginUserInfo.storeId,
      isHost: true,
      nickname: value,
    });
  };

  const columns: ProColumns<IRevenueTable, 'customDataRange'>[] = [
    {
      title: '用户',
      search: false,
      dataIndex: 'user',
      render: (text: any, record: any) => {
        const userText = record.userInfo
          ? `${record.userInfo.phone}-${record.userInfo.nickname}`
          : '';
        return <a onClick={() => viewUserModalStatusSwitch(true, record.userInfo)}>{userText}</a>;
      },
    },
    {
      title: '变动金额',
      valueType: 'money',
      search: false,
      dataIndex: 'changeMoney',
      align: 'right',
    },
    {
      title: '变动时间',
      key: 'dateRange',
      dataIndex: 'changeTime',
      valueType: 'customDataRange',
      align: 'center',
    },
    {
      title: '订单号',
      dataIndex: 'order',
      search: false,
      render: (text: any, record: any) => {
        const orderText = record.orderInfo ? record.orderInfo.orderNo : '';
        return (
          <a onClick={() => viewOrderModalStatusSwitch(true, record.orderInfo)}>{orderText}</a>
        );
      },
    },
    {
      title: '结算方式',
      dataIndex: 'paymentMethodId',
      valueEnum: SettlementMethodEnum,
      search: false,
    },
    {
      title: '备注',
      search: false,
      dataIndex: 'remarkIncrease',
    },
    {
      title: '主持人',
      dataIndex: 'hostId',
      hideInTable: true,
      hideInForm: true,
      renderFormItem: () => {
        return (
          <ProFormSelect
            label={false}
            placeholder='请输入主持人'
            showSearch
            options={hostOptions}
            fieldProps={{
              showArrow: true,
              filterOption: false,
              onSearch: (value) => handleSearchHost(value),
              onBlur: hostCancel,
              loading: hostLoading,
              notFoundContent: hostLoading ? <Spin size="small"/> : <Empty/>,
            }}
          />
        )
      },
    },
  ];

  return (
    <PageContainer>
      <ProProvider.Provider
        value={{
          ...values,
          valueTypeMap: {
            customDataRange: {
              render: (text) => <a>{text}</a>,
              renderFormItem: (_text, _props) => {
                return (
                  <ProFormDateRangePicker
                    {..._props?.fieldProps}
                    name={['changeTime', 'dateRange']}
                    initialValue={[
                      moment().startOf('month').format('YYYY-MM-DD'),
                      moment().endOf('month').format('YYYY-MM-DD'),
                    ]}
                  />
                );
              },
            },
          },
        }}
      >
        <ProTable<IRevenueTable, Record<string, any>, 'customDataRange'>
          headerTitle='收入流水记录'
          rowKey='id'
          options={false}
          request={(params) => queryRevenueListApi({ ...params, storeId: loginUserInfo.storeId })}
          pagination={{
            pageSize: 10,
          }}
          columns={columns}
        />
      </ProProvider.Provider>
      <ViewUser
        visible={viewUserModalVisible}
        onVisibleChange={handleViewUserModalVisible}
        currentData={userData}
      />
      <ViewOrder
        visible={viewOrderModalVisible}
        onVisibleChange={handleViewOrderModalVisible}
        currentData={orderData}
      />
    </PageContainer>
  );
};

export default connect((state: ConnectState) => ({
  loginUserInfo: state.login.loginUserInfo,
}))(RevenueList);
