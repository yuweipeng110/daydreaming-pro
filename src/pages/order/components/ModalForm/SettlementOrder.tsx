import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { ConnectProps, ConnectState } from '@/models/connect';
import { Button, Col, Form, InputNumber, Row, Statistic, Popconfirm, message } from 'antd';
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
  SettlementMethodEnum,
  ScriptPlayerRoleEnum,
  UserSexEnum,
} from '@/pages/constants';
import { settlementOrderApi } from '@/services/order';
import { TOrderDetailTable } from '@/pages/types/orderDetail';
import { IDeskTable } from '@/pages/types/desk';
import { IUserTable } from '@/pages/types/user';
import _ from 'lodash';

interface IOptions {
  value: number;
  label: string;
}

export type TProps = {
  actionRef: any;
  visible: boolean;
  onVisibleChange: (visible: boolean) => void;
  currentData: IDeskTable;
  loginUserInfo: IUserTable;
} & ConnectProps;

const SettlementOrder: React.FC<TProps> = (props) => {
  const { actionRef, visible, onVisibleChange, currentData, loginUserInfo } = props;
  const [form] = Form.useForm();
  const initialValues = !_.isEmpty(currentData)
    ? {
        ...currentData.orderInfo,
        scriptId: Number(currentData.id),
        hostId: Number(currentData.orderInfo?.hostInfo?.id),
      }
    : {};
  const [scriptOptions, setScriptOptions] = useState<IOptions[]>([]);
  const [hostOptions, setHostOptions] = useState<IOptions[]>([]);
  const [editableKeys, setEditableRowKeys] = useState<React.Key[]>([]);
  const [orderDetailList, setOrderDetailList] = useState<TOrderDetailTable[]>([]);
  const [orderReceivablePrice, setOrderReceivablePrice] = useState<number>(0);
  const [orderRealPrice, setOrderRealPrice] = useState<number>(0);

  const handleOrderDetailListChange = (record: any, recordList: any) => {
    setOrderRealPrice(
      _.sum(
        _.map(recordList, (item) => {
          return Number(((item.unitPrice * item.discountPercentage) / 100).toFixed(2));
        }),
      ),
    );
  };

  useEffect(() => {
    if (visible) {
      if (!_.isEmpty(currentData)) {
        setOrderDetailList(currentData.orderInfo?.detailList ?? []);
        // script select options
        const scriptOptionList = { value: Number(currentData.id), label: currentData.title };
        setScriptOptions([scriptOptionList]);
        // host select options
        const { hostInfo } = currentData.orderInfo!;
        const hostOptionList = {
          value: Number(hostInfo?.id),
          label: `${hostInfo?.phone}-${hostInfo?.nickname}`,
        };
        setHostOptions([hostOptionList]);
      }
    }
  }, [visible]);

  useEffect(() => {
    setEditableRowKeys(orderDetailList.map((item) => Number(item.id)));
    setOrderReceivablePrice(_.sum(_.map(orderDetailList, (item) => Number(item.unitPrice))));
    setOrderRealPrice(_.sum(_.map(orderDetailList, (item) => Number(item.discountPrice))));
  }, [orderDetailList]);

  const onSubmit = async (values: any) => {
    const loadingKey = 'loadingKey';
    message.loading({ content: '正在结算订单...', key: loadingKey, duration: 0 });
    const params = {
      ...values,
      orderId: values.id,
      deskId: values.deskId,
      settlementOperatorId: loginUserInfo.id,
      orderDetailList: values.detailList,
      // storeId,scriptId,deskId,orderOperatorId,remark,detailList
    };
    const res = await settlementOrderApi(params);
    if (Number(res.code) !== STATUS_CODE.SUCCESS) {
      message.error({ content: res.msg, key: loadingKey, duration: 2 });
      return false;
    }
    message.success({ content: '结算成功!', key: loadingKey, duration: 2 });
    return true;
  };

  const onFinish = async (values: any) => {
    const success = await onSubmit(values);
    if (!success) {
      return false;
    }
    onVisibleChange(false);
    actionRef();
    return true;
  };

  const columns: ProColumns<TOrderDetailTable>[] = [
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
      dataIndex: 'gameRole',
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
            formatter={(value) => `${value}%`}
            parser={(value: any) => value.replace('%', '')}
          />
        );
      },
    },
    {
      title: '支付方式',
      dataIndex: 'paymentMethodId',
      valueType: 'select',
      valueEnum: SettlementMethodEnum,
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
      onFinish={onFinish}
      submitter={{
        render: (_props) => {
          return [
            <Button key="cancel" type="default" onClick={() => onVisibleChange(false)}>
              取消
            </Button>,
            <Popconfirm
              key="confirm"
              title="确认操作？"
              onConfirm={() => {
                _props.form?.submit();
              }}
            >
              <Button key="submit" type="primary" htmlType="submit">
                提交
              </Button>
            </Popconfirm>,
          ];
        },
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
          width="md"
          options={scriptOptions}
          disabled
        />
        <ProFormSelect name="hostId" label="主持人" width="md" options={hostOptions} disabled />
      </ProForm.Group>
        <ProFormTextArea name="remark" label="备注" width="xl" />
      <ProForm.Item name="detailList" trigger="onValuesChange">
        <EditableProTable<TOrderDetailTable>
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
          <Statistic title="应收总价" prefix={'￥'} value={orderReceivablePrice} precision={2} />
        </Col>
        <Col span={3}>
          <Statistic title="实收总价" prefix={'￥'} value={orderRealPrice} precision={2} />
        </Col>
      </Row>
    </ModalForm>
  );
};

export default connect((state: ConnectState) => ({
  loginUserInfo: state.login.loginUserInfo,
}))(SettlementOrder);
