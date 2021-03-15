import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { ConnectProps, ConnectState } from '@/models/connect';
import { Form, message } from 'antd';
import ProForm, { ModalForm, ProFormTextArea } from '@ant-design/pro-form';
import { STATUS_CODE } from '@/pages/constants';
import { TOrderDetailTable } from '@/pages/types/orderDetail';
import { addOrderApi } from '@/services/order';
import ScriptSelect from '@/pages/order/components/ModalForm/ProFormSelect/ScriptSelect';
import HostSelect from '@/pages/order/components/ModalForm/ProFormSelect/HostSelect';
import UserSelectList from '@/pages/order/components/ModalForm/ProFormSelect/UserSelectList';

interface IProps extends ConnectProps, StateProps {
  actionRef: any;
  visible: boolean;
  onVisibleChange: (visible: boolean) => void;
  deskId: number;
}

const AddOrder: React.FC<IProps> = (props) => {
  const { actionRef, visible, onVisibleChange, deskId, loginUserInfo } = props;
  const [form] = Form.useForm();
  const [orderDetailList, setOrderDetailList] = useState<TOrderDetailTable[]>([]);

  useEffect(() => {
    if (visible) {
      setOrderDetailList([]);
    }
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

    const hide = message.loading('正在开台');
    const params = {
      ...values,
      storeId: loginUserInfo.storeId,
      deskId,
      orderOperatorId: loginUserInfo.id,
      detailList: orderDetailList,
      // storeId,scriptId,deskId,hostId,orderOperatorId,remark,detailList
    };
    const res = await addOrderApi(params);
    if (res.code === STATUS_CODE.SUCCESS) {
      onVisibleChange(false);
      hide();
      message.success('开台成功');
      return true;
    }
    hide();
    message.error(res.msg);
    return false;
  };

  return (
    <ModalForm
      title="创建开台信息"
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
    >
      <ProForm.Group>
        <ScriptSelect />
        <HostSelect />
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

const mapStateToProps = (state: ConnectState) => ({
  loginUserInfo: state.login.loginUserInfo,
});
type StateProps = ReturnType<typeof mapStateToProps>;

export default connect(mapStateToProps)(AddOrder);
