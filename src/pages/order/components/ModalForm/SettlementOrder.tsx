import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { ConnectProps } from '@/models/connect';
import { Col, Form, InputNumber, Row, Statistic } from 'antd';
import ProForm, {
  ModalForm,
  ProFormSelect,
  ProFormText,
  ProFormTextArea,
} from '@ant-design/pro-form';
import type { ProColumns } from '@ant-design/pro-table';
import { EditableProTable } from '@ant-design/pro-table';
import {
  STATUS_CODE,
  PaymentMethodEnum,
  ScriptPlayerRoleEnum,
  UserSexEnum,
} from '@/pages/constants';
import { IOrderDetailTable } from '@/pages/types/orderDetail';
import { IDeskTable } from '@/pages/types/desk';
import { queryScriptListApi } from '@/services/script';
import { queryUserListApi } from '@/services/user';
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
  const [orderReceivablePrice, setOrderReceivablePrice] = useState<number>(0);
  const [orderRealPrice, setOrderRealPrice] = useState<number>(0);

  const handleOrderDetailListChange = (record: any, recordList: any) => {
    setOrderRealPrice(
      _.sum(_.map(recordList, (item) => Number((item.unitPrice * item.discountPercentage) / 100))),
    );
  };

  useEffect(() => {
    if (visible) {
      setOrderDetailList(currentData.orderInfo?.detailList ?? []);
    }
  }, [visible]);

  useEffect(() => {
    setEditableRowKeys(orderDetailList.map((item) => Number(item.id)));
    setOrderReceivablePrice(_.sum(_.map(orderDetailList, (item) => Number(item.unitPrice))));
    setOrderRealPrice(_.sum(_.map(orderDetailList, (item) => Number(item.discountPrice))));
  }, [orderDetailList]);

  /**
   * /app/user/get-user-list?storeId=1&pageRecords=1000
   */
  const loadScriptListData = async () => {
    const params = { pageRecords: 1000 };
    const res = await queryScriptListApi(params);
    if (res.code === STATUS_CODE.SUCCESS) {
      return res.data.map((item) => {
        return {
          label: item.title,
          value: item.id,
        };
      });
    }
    return [];
  };

  /**
   * /app/user/get-script-list?storeId=1&pageRecords=1000
   */
  const loadHostListData = async () => {
    const res = await queryUserListApi({});
    if (res.code === STATUS_CODE.SUCCESS) {
      return res.data.map((item) => {
        return {
          label: `${item.nickname}-${item.phone}`,
          value: item.id,
        };
      });
    }
    return [];
  };

  const onSubmit = async (values: any) => {
    const params = {
      ...values,
      orderId: values.id,
      deskId: values.deskId,
      // detailList: orderDetailList,
      // storeId,scriptId,deskId,orderOperatorId,remark,detailList
    };

    console.log('xxxx');
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
      valueEnum: UserSexEnum,
      editable: false,
    },
    {
      title: '手机号',
      dataIndex: ['userInfo', 'phone'],
      editable: false,
    },
    {
      title: '身份选择',
      dataIndex: 'roleId',
      align: 'center',
      valueEnum: ScriptPlayerRoleEnum,
    },
    {
      title: '积分',
      dataIndex: 'integral',
      renderFormItem: () => {
        return <InputNumber min={0} max={3} />;
      },
    },
    {
      title: '账户余额',
      dataIndex: ['userInfo', 'accountBalance'],
      valueType: 'money',
      align: 'right',
      editable: false,
    },
    {
      title: '账户代金券余额',
      dataIndex: ['userInfo', 'voucherBalance'],
      valueType: 'money',
      align: 'right',
      editable: false,
    },
    {
      title: '折扣',
      dataIndex: 'discountPercentage',
      renderFormItem: () => {
        return (
          <InputNumber
            min={0}
            max={100}
            formatter={(value) => `${value}%`}
            parser={(value: any) => value.replace('%', '')}
          />
        );
      },
    },
    {
      title: '支付方式',
      dataIndex: 'paymentMethod',
      valueType: 'select',
      valueEnum: PaymentMethodEnum,
    },
    {
      title: '付款金额',
      key: 'discountPriceItem',
      align: 'right',
      render: (text: any, record: any) => {
        const discountPrice = ((record.unitPrice * record.discountPercentage) / 100).toFixed(2);
        return `¥${discountPrice}`;
      },
    },
  ];

  return (
    <ModalForm
      title={`结算订单（${currentData.title}）`}
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
      width="70%"
    >
      <ProFormText name="id" hidden />
      <ProFormText name="deskId" hidden />
      <ProForm.Group>
        <ProFormSelect
          name="scriptId"
          label="选择剧本"
          request={() => loadScriptListData()}
          width="md"
          disabled
        />
        <ProFormSelect
          name="hostId"
          label="主持人"
          request={() => loadHostListData()}
          width="md"
          disabled
        />
      </ProForm.Group>
      <ProForm.Group>
        <ProFormTextArea name="remark" label="备注" width="md" />
      </ProForm.Group>
      <ProForm.Item
        name="detailList"
        // initialValue={orderDetailList}
        trigger="onValuesChange"
      >
        <EditableProTable<IOrderDetailTable>
          headerTitle="玩家列表"
          rowKey="id"
          recordCreatorProps={false}
          columns={columns}
          value={orderDetailList}
          onChange={setOrderDetailList}
          editable={{
            type: 'multiple',
            editableKeys,
            onChange: setEditableRowKeys,
            onValuesChange: (record, recordList) => handleOrderDetailListChange(record, recordList),
          }}
        />
      </ProForm.Item>
      <Row>
        <Col span={18}></Col>
        <Col span={3}>
          <Statistic title="应收总价" value={`￥${orderReceivablePrice}`} precision={2} />
        </Col>
        <Col span={3}>
          <Statistic title="实收总价" value={`￥${orderRealPrice}`} precision={2} />
        </Col>
      </Row>
    </ModalForm>
  );
};

export default connect()(SettlementOrder);
