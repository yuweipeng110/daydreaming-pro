import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { ConnectProps } from '@/models/connect';
import { useRequest } from 'umi';
import { Form, message, Button, InputNumber } from 'antd';
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

const SettlementOrder: React.FC<IProps> = (props) => {
  const { actionRef, visible, onVisibleChange, currentData } = props;
  const initialValues = { ...currentData.orderInfo };
  const [form] = Form.useForm();
  const [editableKeys, setEditableRowKeys] = useState<React.Key[]>([]);
  const [orderDetailList, setOrderDetailList] = useState<IOrderDetailTable[]>([]);

  useEffect(() => {
    if (visible) {
      setOrderDetailList(currentData.orderInfo?.detailList ?? []);
    }
  }, [visible]);

  useEffect(() => {
    setEditableRowKeys(orderDetailList.map((item) => Number(item.id)));
  }, [orderDetailList]);

  const onSubmit = async (values: any) => {
    const params = {
      ...values,
      orderId: values.id,
      deskId: values.deskId,
      // detailList: orderDetailList,
      // storeId,scriptId,deskId,orderOperatorId,remark,detailList
    };
    console.log('params', params);
    return false;
  };

  const columns: ProColumns<IOrderDetailTable>[] = [
    {
      title: '昵称',
      dataIndex: ['userInfo', 'nickname'],
      editable: false,
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
      editable: false,
    },
    {
      title: '手机号',
      dataIndex: ['userInfo', 'phone'],
      editable: false,
    },
    {
      title: '路人积分',
      dataIndex: 'decs1',
      renderFormItem: () => {
        return <InputNumber placeholder={`max:2`} max={2} min={0}/>
      },
    },
    {
      title: '侦探积分',
      dataIndex: 'decs2',
      renderFormItem: () => {
        return <InputNumber placeholder={`max:2`} max={2} min={0}/>
      },
    },
    {
      title: '杀手积分',
      dataIndex: 'decs3',
      renderFormItem: () => {
        return <InputNumber placeholder={`max:2`} max={2} min={0}/>
      },
    },
    {
      title: '账户余额',
      dataIndex: ['userInfo', 'accountBalance'],
      align: 'right',
      editable: false,
    },
    {
      title: '账户代金券余额',
      dataIndex: ['userInfo', 'voucherBalance'],
      align: 'right',
      editable: false,
    },
    {
      title: '折扣',
      dataIndex: 'discount',
      renderFormItem: (cur, { isEditable, record, recordKey }) => {
        return <InputNumber />
      },
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
      // onValuesChange={(changeValues) => console.log('changeValues',changeValues)}
    >
      <ProFormText
        name='id'
        hidden
      />
      <ProFormText
        name='deskId'
        hidden
      />
      <ProForm.Item
        name="detailList"
        initialValue={orderDetailList}
        trigger="onValuesChange"
      >
        <EditableProTable<IOrderDetailTable>
          headerTitle='玩家列表'
          rowKey='id'
          recordCreatorProps={false}
          columns={columns}
          value={orderDetailList}
          // value={orderDetailList}
          onChange={setOrderDetailList}
          editable={{
            type: 'multiple',
            editableKeys,
            onChange: setEditableRowKeys,
          }}
        />
      </ProForm.Item>
    </ModalForm>
  );
};

export default connect()(SettlementOrder);
