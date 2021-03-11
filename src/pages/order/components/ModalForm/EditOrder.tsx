import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { ConnectProps } from '@/models/connect';
import { Form, message } from 'antd';
import ProForm, { ModalForm, ProFormText, ProFormTextArea } from '@ant-design/pro-form';
import { STATUS_CODE } from '@/pages/constants';
import { TOrderDetailTable } from '@/pages/types/orderDetail';
import { IDeskTable } from '@/pages/types/desk';
import { editOrderApi } from '@/services/order';
import ScriptSelect from '@/pages/order/components/ModalForm/ProFormSelect/ScriptSelect';
import HostSelect from '@/pages/order/components/ModalForm/ProFormSelect/HostSelect';
import UserSelectList from '@/pages/order/components/ModalForm/ProFormSelect/UserSelectList';
import _ from 'lodash';

interface IProps extends ConnectProps {
  actionRef: any;
  visible: boolean;
  onVisibleChange: (visible: boolean) => void;
  currentData: IDeskTable;
}

const EditOrder: React.FC<IProps> = (props) => {
  const { actionRef, visible, onVisibleChange, currentData } = props;
  const initialValues = !_.isEmpty(currentData)
    ? {
        ...currentData.orderInfo,
        scriptId: Number(currentData.id),
        hostId: Number(currentData.orderInfo.hostInfo.id),
      }
    : {};
  const [form] = Form.useForm();
  const [orderDetailList, setOrderDetailList] = useState<TOrderDetailTable[]>([]);

  useEffect(() => {
    if (visible) setOrderDetailList(currentData.orderInfo?.detailList ?? []);
  }, [visible]);

  const onSubmit = async (values: any) => {
    if (orderDetailList.length === 0) {
      const orderDetailListError = {
        name: 'userId',
        errors: ['至少选择一名玩家'],
      };
      const errorList = [orderDetailListError];
      form.setFields(errorList);
      return false;
    }

    const hide = message.loading('正在更新');
    const params = {
      ...values,
      orderId: values.id,
      deskId: values.deskId,
      detailList: orderDetailList,
      // storeId,scriptId,deskId,orderOperatorId,remark,detailList
    };
    const res = await editOrderApi(params);
    if (res.code === STATUS_CODE.SUCCESS) {
      onVisibleChange(false);
      hide();
      message.success('更新成功');
      return true;
    }
    hide();
    message.error(res.msg);
    return false;
  };

  return (
    <ModalForm
      title={`修改订单（${currentData.title}）`}
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
        actionRef();
        // if (actionRef.current) {
        //   actionRef.current.reload();
        // }
        return true;
      }}
      initialValues={initialValues}
    >
      <ProFormText name="id" hidden />
      <ProFormText name="deskId" hidden />
      <ProForm.Group>
        <ScriptSelect currentData={currentData} />
        <HostSelect currentData={currentData} />
      </ProForm.Group>
      <ProForm.Group>
        <ProFormTextArea name="remark" label="备注" width="md" />
      </ProForm.Group>
      <UserSelectList
        orderDetailList={orderDetailList}
        setOrderDetailList={setOrderDetailList.bind(orderDetailList)}
      />
    </ModalForm>
  );
};

export default connect()(EditOrder);
