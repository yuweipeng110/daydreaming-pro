import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { ConnectProps } from '@/models/connect';
import { useRequest } from 'umi';
import { Form, message, Button, Input } from 'antd';
import ProForm, { ModalForm, ProFormSelect, ProFormText, ProFormTextArea } from '@ant-design/pro-form';
import type { ProColumns } from '@ant-design/pro-table';
import { EditableProTable } from '@ant-design/pro-table';
import { STATUS_CODE } from '@/pages/constants';
import { IOrderDetailTable } from '@/pages/types/orderDetail';
import { IUserTable } from '@/pages/types/user';
import { IDeskTable } from '@/pages/types/desk';
import { editOrderApi } from '@/services/order';
import { queryScriptListApi } from '@/services/script';
import { queryUserListApi } from '@/services/user';
import { queryPlayerListApi } from '@/services/player';
import _ from 'lodash';

interface IProps extends ConnectProps {
  actionRef: any;
  visible: boolean;
  onVisibleChange: (visible: boolean) => void;
  currentData: IDeskTable;
}

const defaultData: IOrderDetailTable[] = [{
  'id': '111',
  'orderId': '12',
  'userId': '2',
  'userInfo': {
    'id': '2',
    'role': '2',
    'storeId': '1',
    'nickname': '\u5feb\u4e50\u96be\u627e',
    'sex': 0,
    'phone': '',
    'birthday': '',
    'killerRanking': 0,
    'killerIntegral': 0,
    'killerTitle': '',
    'detectiveRanking': 0,
    'detectiveIntegral': 0,
    'detectiveTitle': '',
    'peopleRanking': 0,
    'peopleIntegral': 0,
    'peopleTitle': '',
    'totalRanking': 0,
    'totalIntegral': 0,
    'totalTitle': '',
    'activeIntegral': 0,
    'remark': '',
    'otime': '2020-09-13 19:50:48',
    'accountBalance': '200.00',
    'voucherBalance': '50.00',
  },
  'unitPrice': '35.00',
  'isPay': '1',
  'discount': '1.00',
  'otime': '2021-02-21 17:46:47',
}, {
  'id': '112',
  'orderId': '12',
  'userId': '1',
  'userInfo': {
    'id': '1',
    'role': '1',
    'storeId': '1',
    'nickname': '\u9a6c\u745e',
    'sex': 0,
    'phone': '',
    'birthday': '',
    'killerRanking': 0,
    'killerIntegral': 0,
    'killerTitle': '',
    'detectiveRanking': 0,
    'detectiveIntegral': 0,
    'detectiveTitle': '',
    'peopleRanking': 0,
    'peopleIntegral': 0,
    'peopleTitle': '',
    'totalRanking': 0,
    'totalIntegral': 0,
    'totalTitle': '',
    'activeIntegral': 0,
    'remark': '',
    'otime': '2020-09-13 19:49:32',
    'accountBalance': '100.00',
    'voucherBalance': '0.00',
  },
  'unitPrice': '35.00',
  'isPay': '1',
  'discount': '1.00',
  'otime': '2021-02-21 17:46:47',
}];

const SettlementOrder: React.FC<IProps> = (props) => {
  const { actionRef, visible, onVisibleChange, currentData } = props;
  const initialValues = { ...currentData.orderInfo };
  const [form] = Form.useForm();
  const [editableKeys, setEditableRowKeys] = useState<React.Key[]>(() =>
    defaultData.map((item) => item.id));
  const [orderDetailList, setOrderDetailList] = useState<IOrderDetailTable[]>([]);

  useEffect(() => {
    if (visible) setOrderDetailList(currentData.orderInfo?.detailList ?? []);
  }, [visible]);

  const onSubmit = async (values: any) => {
    const params = {
      ...values,
      orderId: values.id,
      deskId: values.deskId,
      detailList: orderDetailList,
      // storeId,scriptId,deskId,orderOperatorId,remark,detailList
    };
    console.log('params', params);
    return false;
  };

  const changeOrderDetailRow = () => {
    // @ts-ignore
    setEditableRowKeys(defaultData.map((item) => item.id));

  }

  const columns: ProColumns<IOrderDetailTable>[] = [
    {
      title: '昵称',
      dataIndex: ['userInfo', 'nickname'],
      renderFormItem: (_, { isEditable, record }) => {
        return isEditable && record?.userInfo?.nickname;
      },
    },
    {
      title: '性别',
      dataIndex: ['userInfo', 'sex'],
      valueEnum: {
        0: {
          text: '女',
        },
        1: {
          text: '男',
        },
      },
      renderFormItem: (_, { isEditable, record }) => {
        return isEditable && record?.userInfo?.sex;
      },
    },
    {
      title: '手机号',
      dataIndex: ['userInfo', 'phone'],
      renderFormItem: (_, { isEditable, record }) => {
        return isEditable && record?.userInfo?.phone;
      },
    },
    {
      title: '路人积分',
      dataIndex: 'decs1',
    },
    {
      title: '侦探积分',
      dataIndex: 'decs2',
    },
    {
      title: '杀手积分',
      dataIndex: 'decs3',

    },
    {
      title: '账户余额',
      dataIndex: ['userInfo', 'accountBalance'],
      align: 'right',
      renderFormItem: (_, { isEditable, record }) => {
        return isEditable && record?.userInfo?.accountBalance;
      },
    },
    {
      title: '账户代金券余额',
      dataIndex: ['userInfo', 'voucherBalance'],
      align: 'right',
      renderFormItem: (_, { isEditable, record }) => {
        return isEditable && record?.userInfo?.voucherBalance;
      },
    },
    {
      title: '折扣',
      dataIndex: 'discount',
    },
    {
      title: '支付方式',
      dataIndex: 'paymentMethod',
      valueType: 'select',
      valueEnum: {
        0: {
          text: '微信',
        },
        1: {
          text: '支付宝',
        },
        2: {
          text: '现金',
        },
        5: {
          text: '账户余额',
        },
      },
    },
  ];

  return (
    <ModalForm
      title='创建开台信息'
      visible={visible}
      onVisibleChange={(visibleValue) => {
        form.resetFields();
        onVisibleChange(visibleValue);
      }}
      form={form}
      onFinish={async (values) => {
        const success = await onSubmit(values);
        if (!success) {
          return false;
        }
        onVisibleChange(false);
        if (actionRef.current) {
          actionRef.current.reload();
        }
        return true;
      }}
      initialValues={initialValues}
      width='md'
    >
      <ProForm
        name='detailList'
      >
        <EditableProTable<IOrderDetailTable>
          headerTitle='玩家列表'
          rowKey='id'
          recordCreatorProps={false}
          columns={columns}
          value={orderDetailList}
          onChange={setOrderDetailList}
          editable={{
            type: 'multiple',
            editableKeys,
            onChange: changeOrderDetailRow,
          }}
        />
      </ProForm>
    </ModalForm>
  );
};

export default connect()(SettlementOrder);
